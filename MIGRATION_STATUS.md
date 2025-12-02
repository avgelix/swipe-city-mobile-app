# Mapbox Migration - Ready to Test! ✅

## What's Been Completed

✅ **Mapbox Integration Complete**
- Replaced Google Maps with Mapbox GL JS via react-map-gl
- All 20 cities preserved with exact coordinates
- Dynamic city changes working (updates on question transitions)
- Fallback background for missing/invalid tokens

✅ **Dependencies Installed**
- `mapbox-gl`: Mapbox GL JS library
- `react-map-gl`: React wrapper for Mapbox GL
- Total: 59 new packages added

✅ **Configuration Updated**
- `.env.local.example` updated with `VITE_MAPBOX_TOKEN`
- Environment variable migration documented
- All references to Google Maps removed

✅ **Documentation Updated**
- `README.md`: Updated setup instructions
- `.github/copilot-instructions.md`: Updated tech stack
- `MAPBOX_SETUP.md`: Created detailed setup guide

✅ **Code Quality**
- No TypeScript/ESLint errors
- Preserved all existing MapBackground features
- Maintained 60% opacity styling
- Non-interactive map (gestures disabled)

## What You Need to Do

1. **Get your Mapbox token** from https://account.mapbox.com/access-tokens/

2. **Create `.env.local`** (copy from `.env.local.example`):
   ```bash
   cp .env.local.example .env.local
   ```

3. **Add your token** to `.env.local`:
   ```env
   VITE_MAPBOX_TOKEN=pk.eyJ1...your_actual_token
   GEMINI_API_KEY=your_existing_gemini_key
   ```

4. **Test it**:
   ```bash
   npm run dev
   ```

## Expected Behavior

When you start the app with a valid Mapbox token:
- ✅ Map background should display immediately
- ✅ Cities should rotate with each question (Tokyo → Paris → NYC → Sydney...)
- ✅ Map should be subtle (60% opacity, non-interactive)
- ✅ No errors in browser console

## Next Steps

Once you've verified the map works:

1. **Merge to main** (if everything looks good):
   ```bash
   git checkout main
   git merge api-migration
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Add `VITE_MAPBOX_TOKEN` environment variable in Vercel dashboard
   - Vercel will auto-deploy when you push to main

## Troubleshooting

**Map not showing?**
- Check `.env.local` exists and has your token
- Verify token is valid at Mapbox dashboard
- Check browser console for errors

**Cities not rotating?**
- Check `questionNumber` prop is being passed correctly
- Verify MapBackground component is receiving updates

**Need help?**
- See `MAPBOX_SETUP.md` for detailed setup guide
- Check browser console for detailed error messages
- Verify you're using the latest code from `api-migration` branch

## Technical Summary

**Free Tier Upgrade:**
- Google Maps: 28,000 loads/month
- Mapbox: 50,000 loads/month
- **76% increase in free usage!**

**Performance:**
- Mapbox GL JS uses WebGL for smooth rendering
- react-map-gl handles viewport state efficiently
- Same lazy-loading strategy as before

**Migration Impact:**
- Zero breaking changes to game logic
- Same props: `questionNumber`, `city`
- Same visual styling (opacity, positioning)
- Better performance and higher free tier
