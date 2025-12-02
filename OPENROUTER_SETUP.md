# OpenRouter API Setup Guide

## Quick Setup (Just add your API key!)

Everything is configured for OpenRouter AI. You only need to add your API key:

1. **Get your OpenRouter API Key:**
   - Go to https://openrouter.ai/keys
   - Sign in with your account
   - Create a new API key (or use an existing one)
   - Copy the key (starts with `sk-or-v1-...`)

2. **Add it to your environment:**
   - Your `.env.local` should already have the Mapbox token
   - Add the OpenRouter key:
     ```env
     OPENROUTER_API_KEY=sk-or-v1-your_actual_key_here
     ```

3. **Test it:**
   ```bash
   npm run dev
   ```
   - Complete the 20 questions
   - The AI should generate a city recommendation

That's it! The serverless function will use the free `openai/gpt-oss-20b:free` model.

## What Changed?

- **From:** Google Gemini (gemini-2.0-flash) - 1500 requests/day limit
- **To:** OpenRouter (openai/gpt-oss-20b:free) - truly free, no rate limits
- **Why:** Zero-cost solution, better for MVP, simpler API

## Technical Details

### Model Used
- **Model ID:** `meta-llama/llama-3.2-3b-instruct:free`
- **Provider:** OpenRouter
- **Cost:** $0.00 (completely free)
- **Rate Limits:** None on free tier
- **Context:** 8,192 tokens
- **Quality:** Suitable for city matching based on preferences

### API Endpoint
- **URL:** `https://openrouter.ai/api/v1/chat/completions`
- **Format:** OpenAI-compatible chat completions API
- **Authentication:** Bearer token in Authorization header

### Files Modified
- `api/gemini.js` - Rewritten to use OpenRouter REST API
- `api/package.json` - Removed Google Gemini dependency (now zero dependencies)
- `.env.local.example` - Updated with OPENROUTER_API_KEY
- Documentation updated (README, api/README, copilot-instructions)

### Request Format
```javascript
{
  model: 'openai/gpt-oss-20b:free',
  messages: [
    {
      role: 'user',
      content: '...' // Structured prompt with user preferences
    }
  ],
  temperature: 0.7,
  max_tokens: 500
}
```

### Response Format
The AI returns JSON (same format as before):
```json
{
  "city": "Barcelona",
  "country": "Spain",
  "explanation": "Barcelona matches your preferences for..."
}
```

### Error Handling
- Invalid API key → 500 error with user-friendly message
- Network failures → Retry suggested
- Invalid response format → Fallback error handling
- Development mode shows detailed error messages

## Deployment to Vercel

When deploying to Vercel, add the environment variable:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** Your OpenRouter API key (sk-or-v1-...)
   - **Scope:** All environments (Production, Preview, Development)

## Troubleshooting

### AI not responding?
- Check that `OPENROUTER_API_KEY` is set in `.env.local`
- Verify your key is valid at https://openrouter.ai/keys
- Check browser console and terminal for errors
- Test the API endpoint directly: `POST /api/gemini` with sample answers

### Getting 401 Unauthorized?
- Your API key may be invalid or expired
- Generate a new key at https://openrouter.ai/keys
- Make sure the key starts with `sk-or-v1-`

### Response format errors?
- The free model occasionally returns non-JSON responses
- The function has robust parsing to handle markdown code blocks
- Check terminal logs for the raw AI response

### Rate limits?
- ✅ The free model has no rate limits!
- You can make unlimited requests
- Perfect for development and MVP

## API Key Security

**Important:** OpenRouter API keys should be kept secret!
- ✅ Never commit `.env.local` to Git (already in `.gitignore`)
- ✅ Use Vercel environment variables for deployment
- ✅ Serverless function keeps key server-side (not exposed to browser)
- ✅ No client-side API calls (all proxied through `/api/gemini`)

## Testing Locally

Test the API endpoint directly:
```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      {"question": "Climate preference", "answer": "Warm", "category": "Climate"},
      {"question": "Lifestyle pace", "answer": "Fast", "category": "Lifestyle"}
    ]
  }'
```

Expected response:
```json
{
  "city": "Miami",
  "country": "USA",
  "explanation": "Miami offers warm weather and a fast-paced lifestyle..."
}
```

## Benefits of OpenRouter

1. **Truly Free:** No credit card required, no hidden costs
2. **No Rate Limits:** Unlimited requests on free tier
3. **OpenAI Compatible:** Easy migration path to paid models later
4. **Multiple Models:** Can switch models without changing code
5. **Simple API:** Standard REST API, no SDK required
6. **Good Quality:** GPT-OSS-20B is sufficient for city matching

## Future Upgrades

If you need better quality later, you can upgrade to:
- `openai/gpt-3.5-turbo` - $0.0005/1k tokens
- `openai/gpt-4-turbo` - $0.01/1k tokens
- `anthropic/claude-3-haiku` - $0.00025/1k tokens

Just change the model ID in `api/gemini.js` and add credits to your OpenRouter account.
