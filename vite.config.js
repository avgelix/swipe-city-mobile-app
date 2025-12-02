import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  plugins: [
    react(),
    // Custom plugin to handle /api/gemini locally
    {
      name: 'local-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/gemini' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
              try {
                const { answers } = JSON.parse(body);
                const apiKey = env.OPENROUTER_API_KEY;
                
                if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
                  console.error('❌ OPENROUTER_API_KEY not configured or still has placeholder value');
                  console.error('   Current value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'OpenRouter API key not configured. Please add OPENROUTER_API_KEY to .env.local' }));
                  return;
                }
                
                console.log('✅ API key found');
                console.log('🚀 Processing', answers?.length || 0, 'answers...');
                
                const prompt = buildPrompt(answers);
                
                // Call OpenRouter API
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'Swipe City - Local Dev'
                  },
                  body: JSON.stringify({
                    model: 'google/gemini-flash-1.5:free',
                    messages: [
                      {
                        role: 'user',
                        content: prompt
                      }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                  })
                });

                if (!response.ok) {
                  const errorData = await response.json().catch(() => ({}));
                  console.error('OpenRouter API Error:', response.status, errorData);
                  throw new Error(`OpenRouter API returned ${response.status}`);
                }

                const data = await response.json();
                const text = data.choices?.[0]?.message?.content;

                if (!text) {
                  console.error('❌ No response from AI model');
                  console.error('Full response:', JSON.stringify(data, null, 2));
                  throw new Error('No response from AI model. The API may be rate-limited. Please try again.');
                }
                
                console.log('✅ City recommendation generated successfully');
                
                const cityMatch = parseAIResponse(text);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(cityMatch));
              } catch (error) {
                console.error('💥 Error:', error.message);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    // No proxy needed - using local handler
  },
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'analytics': ['@vercel/analytics'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
  },
}})

// Helper functions
function buildPrompt(answers) {
  const answersByCategory = {};
  answers.forEach(answer => {
    if (!answersByCategory[answer.category]) {
      answersByCategory[answer.category] = [];
    }
    answersByCategory[answer.category].push({
      question: answer.question,
      answer: answer.answer
    });
  });

  let prompt = `You are a relocation expert helping someone find their perfect city to live in. Based on their preferences below, recommend ONE specific city and country that best matches their lifestyle.

USER PREFERENCES:
`;

  Object.keys(answersByCategory).forEach(category => {
    prompt += `\n${category}:\n`;
    answersByCategory[category].forEach(item => {
      prompt += `  - ${item.question}\n    Answer: ${item.answer}\n`;
    });
  });

  prompt += `
INSTRUCTIONS:
1. Analyze all preferences holistically
2. Recommend ONE specific city and country
3. Provide a personalized explanation (2-3 sentences) of why this city matches their preferences
4. Consider climate, lifestyle, culture, cost of living, and all other factors they mentioned
5. Be specific and practical in your recommendation

Respond ONLY with valid JSON in this exact format:
{
  "city": "City Name",
  "country": "Country Name",
  "explanation": "Your personalized 2-3 sentence explanation here"
}`;

  return prompt;
}

function parseAIResponse(text) {
  let jsonText = text.trim();
  
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '');
  }
  
  const parsed = JSON.parse(jsonText);
  
  if (!parsed.city || !parsed.country || !parsed.explanation) {
    throw new Error('Missing required fields in response');
  }
  
  return {
    city: parsed.city,
    country: parsed.country,
    explanation: parsed.explanation
  };
}
