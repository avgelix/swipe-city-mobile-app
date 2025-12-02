import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

function IntroPage({ onStart }) {
  const [cityIndex, setCityIndex] = useState(0);

  // Cycle through cities every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % 20);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Map background - cycles through cities */}
      <MapBackground questionNumber={cityIndex} />
      
      {/* Darker gradient overlay for better text contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 30, 60, 0.75) 0%, rgba(40, 60, 90, 0.75) 50%, rgba(0, 116, 228, 0.6) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {/* Animated compass with pulsing glow */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative"
        >
          {/* Pulsing glow effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 116, 228, 0.6) 0%, transparent 70%)',
              filter: 'blur(25px)',
              transform: 'scale(1.5)'
            }}
          />
          
          <motion.img 
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            src={compassIcon} 
            alt="Compass" 
            className="w-24 h-24 object-contain relative z-10"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(0, 116, 228, 1))'
            }}
          />
        </motion.div>

        {/* Game title - smaller, bolder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mb-6"
        >
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: 'Asul, sans-serif',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #A0C3EF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))',
              letterSpacing: '-1px'
            }}
          >
            Swipe City
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white max-w-md mx-auto leading-relaxed"
            style={{
              fontFamily: 'Asul, sans-serif',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5)',
              fontWeight: 400
            }}
          >
            Answer 20 questions. Discover your perfect city. Start your adventure.
          </motion.p>
        </motion.div>

        {/* Tap to Start button with premium styling */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 12px 40px rgba(0, 116, 228, 0.5), 0 0 60px rgba(0, 116, 228, 0.3)'
          }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="mt-8 px-16 py-5 text-white font-bold text-xl tracking-wide"
          style={{
            fontFamily: 'Asul, sans-serif',
            borderRadius: '50px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.2)',
            background: 'linear-gradient(90deg, #0074E4, #00A8FF, #0074E4)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite'
          }}
        >
          TAP TO START
        </motion.button>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default IntroPage;
