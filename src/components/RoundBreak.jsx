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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Map background with 60% opacity overlay */}
      <MapBackground questionNumber={questionNumber} />
      
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[rgba(178,188,237,0.4)] pointer-events-none" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        {/* Round badge */}
        <div className="relative mb-0">
          <div 
            className="px-8 py-2 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, rgba(128, 156, 191, 1) 0%, rgba(128, 156, 191, 1) 100%)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <p 
              className="text-white text-center"
              style={{
                fontFamily: 'Asul, sans-serif',
                fontSize: '24px',
                fontWeight: 400,
                letterSpacing: '0.5px'
              }}
            >
              Round {roundNumber}
            </p>
          </div>
        </div>

        {/* White header bar with text */}
        <div 
          className="bg-white px-12 py-3 w-full"
          style={{
            borderTop: '4px solid #809cbf',
            borderBottom: '4px solid #809cbf'
          }}
        >
          <p 
            className="text-black text-center"
            style={{
              fontFamily: 'Asul, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '2px'
            }}
          >
            GET READY TO SWIPE
          </p>
        </div>

        {/* Compass with glow effect */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative mt-16"
          style={{ width: '200px', height: '200px' }}
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
      </motion.div>
    </div>
  );
}

export default RoundBreak;
