import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

/**
 * LoadingScreen Component
 * 
 * Displays an animated loading screen between game phases
 * Shows a spinning compass with fast-changing map background
 * Automatically transitions to results after 2 seconds
 */
function LoadingScreen({ onComplete }) {
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    // Automatically transition after 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Change map city every second (fast globe rotation effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex(prev => (prev + 1) % 30); // Cycle through cities
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fast-changing map background */}
      <MapBackground questionNumber={cityIndex} />
      
      {/* Blue overlay for consistency */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Spinning Compass */}
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-24 h-24"
              >
                <img 
                  src={compassIcon} 
                  alt="Loading" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            
            {/* Loading Text */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Finding Your Perfect Match...
            </h2>
            <p className="text-gray-600">
              Our AI is analyzing your preferences to find the ideal city for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default LoadingScreen;
