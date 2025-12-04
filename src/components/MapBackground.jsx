import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Map from 'react-map-gl/mapbox';
import { motion, AnimatePresence } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * MapBackground Component
 * 
 * Displays a dynamic Mapbox background that changes with each question.
 * Features:
 * - 20 diverse cities with geographic coordinates
 * - Rotates cities based on questionNumber prop
 * - Subtle styling (60% opacity) to not distract from content
 * - Mobile-responsive and stays within Mapbox free tier (50k loads/month)
 * - Smooth transitions between cities
 */

// Array of 20 diverse cities from around the world
const CITIES = [
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780 },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { name: 'Miami', lat: 25.7617, lng: -80.1918 },
  { name: 'Boston', lat: 42.3601, lng: -71.0589 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Denver', lat: 39.7392, lng: -104.9903 },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321 },
  { name: 'Austin', lat: 30.2672, lng: -97.7431 },
  { name: 'Portland', lat: 45.5152, lng: -122.6784 },
  { name: 'Nashville', lat: 36.1627, lng: -86.7816 },
  { name: 'Atlanta', lat: 33.7490, lng: -84.3880 },
  { name: 'Phoenix', lat: 33.4484, lng: -112.0740 },
  { name: 'San Diego', lat: 32.7157, lng: -117.1611 },
  { name: 'Las Vegas', lat: 36.1699, lng: -115.1398 },
  { name: 'Philadelphia', lat: 39.9526, lng: -75.1652 }
];

// Find city coordinates by name (case-insensitive partial match)
// If not found in hardcoded list, use Mapbox Geocoding API fallback
async function findCityCoordinates(cityName) {
  if (!cityName) return null;
  
  const searchTerm = cityName.toLowerCase().trim();
  
  // First, try to find in our hardcoded list
  const found = CITIES.find(city => 
    city.name.toLowerCase().includes(searchTerm) || 
    searchTerm.includes(city.name.toLowerCase())
  );
  
  if (found) {
    console.log('🔍 Found coordinates in cache:', cityName, '→', found);
    return found;
  }
  
  // If not found, use Mapbox Geocoding API to get coordinates
  console.log('🌍 City not in cache, fetching from Mapbox Geocoding API:', cityName);
  
  try {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json?access_token=${mapboxToken}&types=place&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      const result = { name: cityName, lat, lng };
      console.log('✅ Geocoding API success:', result);
      return result;
    }
    
    console.warn('⚠️ No results from Geocoding API for:', cityName);
  } catch (error) {
    console.error('❌ Geocoding API failed:', error);
  }
  
  // Final fallback to a generic world view
  console.log('🌎 Using world view fallback');
  return { name: cityName, lat: 20, lng: 0 }; // World view centered
}

function MapBackground({ questionNumber, city }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Key to force remount for fade animation
  const [currentCity, setCurrentCity] = useState(null);
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false);

  // Get city coordinates - either from prop or cycling through list
  const getCityLocation = () => {
    if (city) {
      return city; // Return city name, will be resolved async
    }
    if (questionNumber !== undefined) {
      return CITIES[questionNumber % CITIES.length];
    }
    return CITIES[0];
  };

  // Viewport state for the map
  const [viewState, setViewState] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 12,
    pitch: 0,
    bearing: 0
  });

  // Get Mapbox token from environment
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    console.log('🗺️ MapBackground mounted');
    console.log('   - API token exists:', !!mapboxToken);
    console.log('   - city prop:', city);
    console.log('   - questionNumber:', questionNumber);

    // If no API key is provided, show warning
    if (!mapboxToken || mapboxToken === 'your_mapbox_token_here') {
      console.warn('⚠️ Mapbox token not configured. Map background will not display.');
      setError('Map token not configured');
    }
  }, []);

  // Resolve city coordinates when city prop changes
  useEffect(() => {
    const resolveCity = async () => {
      const cityLocation = getCityLocation();
      
      // If it's already an object with coordinates, use it directly
      if (typeof cityLocation === 'object' && cityLocation.lat && cityLocation.lng) {
        setCurrentCity(cityLocation);
        return;
      }
      
      // Otherwise, it's a string city name - resolve it
      if (typeof cityLocation === 'string') {
        setIsLoadingCoordinates(true);
        const coordinates = await findCityCoordinates(cityLocation);
        setCurrentCity(coordinates);
        setIsLoadingCoordinates(false);
      }
    };
    
    resolveCity();
  }, [city, questionNumber]);

  // Update map center when currentCity changes
  useEffect(() => {
    if (currentCity && currentCity.lat && currentCity.lng) {
      console.log('📍 Moving map to:', currentCity.name, { lat: currentCity.lat, lng: currentCity.lng });
      setViewState(prev => ({
        ...prev,
        latitude: currentCity.lat,
        longitude: currentCity.lng,
        zoom: 12
      }));
      // Update key to trigger fade animation
      setMapKey(prev => prev + 1);
    }
  }, [currentCity]);

  // Don't render map if there's no token
  if (error || !mapboxToken || mapboxToken === 'your_mapbox_token_here') {
    console.warn('MapBackground: No valid token, showing fallback');
    return (
      <div 
        className="absolute inset-0"
        style={{
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundColor: '#93c5fd' // Light blue fallback
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mapKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: '100%', height: '100%' }}
          interactive={false}
          attributionControl={false}
          dragPan={false}
          scrollZoom={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          dragRotate={false}
          keyboard={false}
        />
      </motion.div>
    </AnimatePresence>
  );
}

MapBackground.propTypes = {
  questionNumber: PropTypes.number,
  city: PropTypes.string,
};

export default MapBackground;
