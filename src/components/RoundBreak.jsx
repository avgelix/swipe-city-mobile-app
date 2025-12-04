import { motion } from 'framer-motion';
import { useEffect } from 'react';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

function RoundBreak({ roundNumber, onContinue, questionNumber }) {
  // Auto-continue after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Map background with 60% opacity overlay */}
      <MapBackground questionNumber={questionNumber} />
      
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[rgba(178,188,237,0.4)] pointer-events-none" />
      
      {/* Round badge and title - positioned at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-12 left-0 right-0 z-10 flex flex-col items-center w-full"
      >
        {/* Round badge */}
        <div className="relative">
          <div 
            className="px-8 py-2"
            style={{
              background: '#4a5a6f',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '12px 12px 0 0'
            }}
          >
            <p 
              className="text-white text-center"
              style={{
                fontFamily: 'Asul, sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                letterSpacing: '2px'
              }}
            >
              Round {roundNumber}
            </p>
          </div>
        </div>

        {/* White bar with border and text - full width spanning entire page */}
        <div 
          className="bg-white px-12 py-4 w-full"
          style={{
            border: '3px solid #4a5a6f',
            borderLeft: 'none',
            borderRight: 'none'
          }}
        >
          <p 
            className="text-center uppercase"
            style={{
              fontFamily: 'Asul, sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              letterSpacing: '4px',
              color: '#4a5a6f'
            }}
          >
            GET READY TO SWIPE
          </p>
        </div>
      </motion.div>

      {/* Compass - centered on screen */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
          style={{ width: '280px', height: '280px' }}
        >
          {/* Outer glow circle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(160, 195, 239, 0.3) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
          
          {/* Compass image */}
          <img 
            src={compassIcon} 
            alt="Compass" 
            className="relative w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(160, 195, 239, 0.6))'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default RoundBreak;
