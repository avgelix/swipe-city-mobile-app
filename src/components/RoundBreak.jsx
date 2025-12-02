import { motion } from 'framer-motion';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

function RoundBreak({ roundNumber, onContinue, questionNumber }) {
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
        className="relative z-10 flex flex-col items-center"
      >
        {/* Round badge */}
        <div className="relative mb-6">
          <div 
            className="px-6 py-2 rounded-md shadow-lg"
            style={{
              background: 'linear-gradient(90deg, rgba(160, 195, 239, 1) 0%, rgba(160, 195, 239, 1) 100%)',
              border: 'none'
            }}
          >
            <p 
              className="text-white text-center font-medium"
              style={{
                fontFamily: 'Asul, sans-serif',
                fontSize: '22px',
                fontWeight: 400
              }}
            >
              Round {roundNumber}
            </p>
          </div>
        </div>

        {/* White header bar with text */}
        <div 
          className="bg-white px-8 py-4 mb-12 shadow-md"
          style={{
            border: '4px solid #809cbf',
            borderRadius: '0'
          }}
        >
          <p 
            className="text-black text-center font-medium tracking-wide"
            style={{
              fontFamily: 'Asul, sans-serif',
              fontSize: '26px',
              fontWeight: 400,
              letterSpacing: '0.5px'
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

        {/* Continue button (appears after animation) */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={onContinue}
          className="mt-12 px-8 py-3 bg-zillow-blue text-white rounded-lg font-medium shadow-lg hover:bg-blue-600 transition-colors"
          style={{
            fontFamily: 'Asul, sans-serif',
            fontSize: '18px'
          }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}

export default RoundBreak;
