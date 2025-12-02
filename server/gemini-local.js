/**
 * Local Development API Handler for OpenRouter
 * This file is used only in local development to test the OpenRouter API
 */

import 'dotenv/config';

export async function handleGeminiRequest(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
    return;
  }

  let body = '';
  
  // Collect request body
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      // Validate API key exists
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        console.error('❌ OPENROUTER_API_KEY is not configured in .env.local');
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          error: 'API configuration error. OPENROUTER_API_KEY not found.' 
        }));
        return;
      }

      // Parse request body
      const { answers } = JSON.parse(body);
      if (!answers || !Array.isArray(answers) || answers.length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 
          error: 'Invalid request. Please provide an array of answers.' 
        }));
        return;
      }

      console.log('🚀 Processing', answers.length, 'answers...');

      // Build the prompt from user answers
      const prompt = buildPrompt(answers);

      console.log('💬 Sending prompt to OpenRouter...');

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
          model: 'openai/gpt-oss-20b:free',
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
      const text = data.choices[0]?.message?.content;

      if (!text) {
        throw new Error('No response from AI model');
      }

      console.log('📝 OpenRouter response:', text);

      // Parse the JSON response
      const cityMatch = parseAIResponse(text);

      console.log('✅ City match:', cityMatch);

      // Return the city match
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cityMatch));

    } catch (error) {
      console.error('💥 OpenRouter API Error:', error);
      
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: 'Failed to generate city recommendation. Please try again.',
        details: error.message
      }));
    }
  });
}

/**
 * Build a structured prompt for OpenRouter based on user answers
 */
function buildPrompt(answers) {
  // Group answers by category for better context
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

  // Build structured prompt
  let prompt = `You are a relocation expert helping someone find their perfect city to live in. Based on their preferences below, recommend ONE specific city and country that best matches their lifestyle.

USER PREFERENCES:
`;

  // Add each category with its answers
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

/**
 * Parse AI response and extract JSON
 */
function parseAIResponse(text) {
  try {
    // AI models sometimes wrap JSON in markdown code blocks
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }
    
    // Parse JSON
    const parsed = JSON.parse(jsonText);
    
    // Validate required fields
    if (!parsed.city || !parsed.country || !parsed.explanation) {
      throw new Error('Missing required fields in response');
    }
    
    return {
      city: parsed.city,
      country: parsed.country,
      explanation: parsed.explanation
    };
    
  } catch (parseError) {
    console.error('Failed to parse AI response:', text, parseError);
    throw new Error('Invalid AI response format');
  }
}
