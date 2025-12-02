import { motion } from 'framer-motion';
import MapBackground from './MapBackground';

function IntroPage({ onStart }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Map background */}
      <MapBackground questionNumber={0} />
      
      {/* Gradient overlay for modern look */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 116, 228, 0.3) 0%, rgba(128, 156, 191, 0.4) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {/* Game title with modern typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1
            className="text-7xl md:text-8xl font-bold text-white mb-6"
            style={{
              fontFamily: 'Asul, sans-serif',
              textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-2px',
              lineHeight: '1.1'
            }}
          >
            Swipe City
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'Asul, sans-serif',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              fontWeight: 300
            }}
          >
            Find your perfect city in 20 swipes
          </motion.p>
        </motion.div>

        {/* Start button - modern glass morphism style */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="relative overflow-hidden group"
          style={{
            fontFamily: 'Asul, sans-serif'
          }}
        >
          <div 
            className="absolute inset-0 bg-white opacity-10 backdrop-blur-md"
            style={{
              borderRadius: '16px'
            }}
          />
          <div
            className="relative px-20 py-6 text-white font-semibold text-2xl transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 116, 228, 0.9) 0%, rgba(0, 91, 181, 0.9) 100%)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(255, 255, 255, 0.1) inset',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              letterSpacing: '1px'
            }}
          >
            START
          </div>
        </motion.button>
      </div>
    </div>
  );
}

export default IntroPage;
