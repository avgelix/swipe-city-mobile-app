import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

function IntroPage({ onStart }) {
  const [cityIndex, setCityIndex] = useState(0);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0], [0, 1]);

  // Cycle through cities every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % 20);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (event, info) => {
    // If swiped up significantly, start the game
    if (info.offset.y < -100) {
      onStart();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Map background - cycles through cities */}
      <MapBackground questionNumber={cityIndex} />
      
      {/* Darker gradient overlay for better text contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 30, 60, 0.65) 0%, rgba(40, 60, 90, 0.65) 50%, rgba(0, 116, 228, 0.5) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end px-6 pt-24 pb-20">
        {/* Swipeable Card */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -300, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ y, opacity }}
          className="relative w-full max-w-xs cursor-grab active:cursor-grabbing"
        >
          {/* Main Card */}
          <div 
            className="relative rounded-2xl shadow-2xl p-6 aspect-[2/3] flex flex-col justify-start items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Title */}
            <h1
              className="text-5xl text-black text-center mb-12 mt-6"
              style={{
                fontFamily: 'Asul, sans-serif',
                letterSpacing: '-1px'
              }}
            >
              Swipe City
            </h1>

            {/* Question Text */}
            <p
              className="text-lg text-black text-center mb-6 leading-relaxed px-3"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Do you ever wonder<br />where in the world you<br />should move?
            </p>

            {/* Compass */}
            <div className="flex justify-center flex-1 items-center pb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="relative"
              >
                {/* Compass ring/border */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(160, 195, 239, 0.3) 0%, rgba(128, 156, 191, 0.2) 100%)',
                    transform: 'scale(1.3)',
                    filter: 'blur(20px)'
                  }}
                />
                <img 
                  src={compassIcon} 
                  alt="Compass" 
                  className="w-56 h-56 object-contain relative z-10"
                />
              </motion.div>
            </div>
          </div>

          {/* Top card stack - properly scaled and attached */}
          <div 
            className="absolute left-0 right-0 rounded-t-2xl"
            style={{
              height: '100%',
              top: '-12px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              transform: 'scaleX(0.94)',
              transformOrigin: 'center top',
              zIndex: -1,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
            }}
          />
          <div 
            className="absolute left-0 right-0 rounded-t-2xl"
            style={{
              height: '100%',
              top: '-24px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              transform: 'scaleX(0.88)',
              transformOrigin: 'center top',
              zIndex: -2,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
            }}
          />
          <div 
            className="absolute left-0 right-0 rounded-t-2xl"
            style={{
              height: '100%',
              top: '-36px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scaleX(0.82)',
              transformOrigin: 'center top',
              zIndex: -3,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
            }}
          />
        </motion.div>

        {/* Swipe instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-white text-center mt-12 italic"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 300,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
          }}
        >
          Swipe up to find out
        </motion.p>
      </div>
    </div>
  );
}

export default IntroPage;
