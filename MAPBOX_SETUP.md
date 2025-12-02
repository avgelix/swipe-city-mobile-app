# Mapbox Setup Guide

## Quick Setup (You only need to add your token!)

Everything is already configured for Mapbox. You just need to:

1. **Get your Mapbox Access Token:**
   - Go to https://account.mapbox.com/access-tokens/
   - Create a new token (or use your default public token)
   - Copy the token

2. **Add it to your environment:**
   - Copy `.env.local.example` to `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Open `.env.local` and replace `your_mapbox_token_here` with your actual token:
     ```
     VITE_MAPBOX_TOKEN=pk.eyJ1...your_actual_token_here
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

That's it! The map background should now display with cities rotating through as you swipe cards.

## What Changed?

- **From:** Google Maps JavaScript API (28k free loads/month)
- **To:** Mapbox GL JS (50k free loads/month)
- **Why:** Better free tier, modern aesthetic, commercial CDN reliability

## Technical Details

### Dependencies Added
- `mapbox-gl` - Mapbox GL JS library
- `react-map-gl` - React wrapper for Mapbox GL JS

### Files Modified
- `src/components/MapBackground.jsx` - Completely rewritten to use Mapbox
- `.env.local.example` - Updated with `VITE_MAPBOX_TOKEN`
- `README.md` - Updated setup instructions
- `.github/copilot-instructions.md` - Updated tech stack documentation

### Features Preserved
- 20 diverse cities with coordinates
- City cycling based on `questionNumber` prop
- Direct city lookup via `city` prop
- Subtle 60% opacity styling
- Non-interactive map (disabled all gestures)
- Fallback background when token not configured
- Mobile-responsive design

### Mapbox Configuration
- **Map Style:** `streets-v12` (clean, modern look)
- **Zoom Level:** 12 (city overview)
- **Interactive:** Disabled (background only)
- **Attribution:** Hidden (cleaner UI)

## Deployment to Vercel

When deploying to Vercel, add the environment variable:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name:** `VITE_MAPBOX_TOKEN`
   - **Value:** Your Mapbox access token
   - **Scope:** All environments (Production, Preview, Development)

## Troubleshooting

### Map not displaying?
- Check that `VITE_MAPBOX_TOKEN` is set in `.env.local`
- Verify your token is valid at https://account.mapbox.com/access-tokens/
- Check browser console for errors

### Cities not rotating?
- MapBackground updates on `questionNumber` prop changes
- Check that `questionNumber` is incrementing correctly

### Token showing in browser?
- ✅ This is normal and safe! Mapbox tokens are designed to be public.
- Restrict your token by URL/domain in the Mapbox dashboard for extra security.
