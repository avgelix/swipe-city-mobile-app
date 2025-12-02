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
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 }
];

// Find city coordinates by name (case-insensitive partial match)
function findCityCoordinates(cityName) {
  if (!cityName) return null;
  const searchTerm = cityName.toLowerCase().trim();
  const found = CITIES.find(city => 
    city.name.toLowerCase().includes(searchTerm) || 
    searchTerm.includes(city.name.toLowerCase())
  );
  console.log('🔍 Finding coordinates for:', cityName, '→', found || 'not found, using default');
  return found || { name: cityName, lat: 40.7128, lng: -74.0060 }; // Default to NYC
}

function MapBackground({ questionNumber, city }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Key to force remount for fade animation

  // Get city coordinates - either from prop or cycling through list
  const getCityLocation = () => {
    if (city) {
      return findCityCoordinates(city);
    }
    if (questionNumber !== undefined) {
      return CITIES[questionNumber % CITIES.length];
    }
    return CITIES[0];
  };

  const currentCity = getCityLocation();

  // Viewport state for the map
  const [viewState, setViewState] = useState({
    latitude: currentCity.lat,
    longitude: currentCity.lng,
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

  // Update map center when city changes
  useEffect(() => {
    if (currentCity) {
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
  }, [currentCity.name]); // Only update when city name changes

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
        transition={{ duration: 0.8, ease: "easeInOut" }}
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
