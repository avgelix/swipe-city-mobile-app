/**
 * Vercel Serverless Function: OpenRouter API Proxy
 * 
 * This function keeps the OPENROUTER_API_KEY secure by handling AI requests server-side.
 * It accepts user answers, builds a prompt, and returns a city recommendation.
 * 
 * Updated: 2025-12-02
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Validate API key exists
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'API configuration error. Please contact support.' 
      });
    }

    // Validate request body
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request. Please provide an array of answers.' 
      });
    }

    // Build the prompt from user answers
    const prompt = buildPrompt(answers);

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://swipe-city.vercel.app',
        'X-Title': 'Swipe City'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
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

    // Parse the JSON response from OpenRouter
    const cityMatch = parseAIResponse(text);

    // Return the city match
    return res.status(200).json(cityMatch);

  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    // Return user-friendly error message
    const isDevelopment = process.env.NODE_ENV === 'development';
    return res.status(500).json({ 
      error: 'Failed to generate city recommendation. Please try again.',
      details: isDevelopment ? error.message : undefined
    });
  }
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
