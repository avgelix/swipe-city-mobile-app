import { motion } from 'framer-motion';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

function IntroPage({ onStart }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Map background */}
      <MapBackground questionNumber={0} />
      
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[rgba(178,188,237,0.4)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Animated compass logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src={compassIcon} 
            alt="Compass" 
            className="w-32 h-32 object-contain"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(160, 195, 239, 0.8))'
            }}
          />
        </motion.div>

        {/* Game title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white mb-4 text-center"
          style={{
            fontFamily: 'Asul, sans-serif',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.5)'
          }}
        >
          Swipe City
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-white text-center mb-12 max-w-lg leading-relaxed"
          style={{
            fontFamily: 'Asul, sans-serif',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          Discover your perfect city through 20 quick questions. Swipe your way to a new home!
        </motion.p>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-12 py-4 bg-white text-zillow-blue rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
          style={{
            fontFamily: 'Asul, sans-serif',
            border: '3px solid #809cbf'
          }}
        >
          TAP TO START
        </motion.button>

        {/* Decorative hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-white text-sm mt-8 opacity-75"
          style={{
            fontFamily: 'Asul, sans-serif',
            textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)'
          }}
        >
          Swipe left or right • 4 rounds • 20 questions
        </motion.p>
      </div>
    </div>
  );
}

export default IntroPage;
