import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * BinaryCard Component
 * 
 * A swipeable card for binary (yes/no) questions using Framer Motion
 * Design: Minimal white aesthetic with stacked cards and arrow hints
 * Features:
 * - Drag left/right for binary questions
 * - Rotation transform based on x position
 * - Opacity transform during drag
 * - Exit animations in swipe direction
 * - 100px swipe threshold
 * - Asul font (matches reference design)
 */
function BinaryCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { text, options } = question;
  const [exitX, setExitX] = useState(0);
  
  // Motion values for tracking drag position
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Transform for overlay text opacity
  const overlayOpacity = useTransform(x, 
    [-200, -100, 0, 100, 200], 
    [1, 1, 0, 1, 1]
  );

  // Track the current direction text using state
  const [currentDirectionText, setCurrentDirectionText] = useState('');

  // Update direction text as user drags
  const updateDirectionText = () => {
    const xVal = x.get();
    if (Math.abs(xVal) < 50) {
      setCurrentDirectionText('');
    } else {
      setCurrentDirectionText(xVal > 0 ? options.right : options.left);
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    
    // Binary questions: Left = No, Right = Yes
    if (Math.abs(info.offset.x) > threshold) {
      const answer = info.offset.x > 0 ? options.right : options.left;
      setExitX(info.offset.x > 0 ? 1000 : -1000);
      
      setTimeout(() => {
        onAnswer(answer);
        setExitX(0);
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Negative space for progress indicator */}
      <div className="mb-3 h-6"></div>

      {/* Card Container with Stacked Effect and Arrow Hints */}
      <div className="relative">
        {/* Stack card 1 (furthest back) */}
        <div className="absolute inset-0 bg-white rounded-3xl shadow-md transform translate-y-3 scale-[0.94] opacity-30"></div>
        
        {/* Stack card 2 (middle) */}
        <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transform translate-y-1.5 scale-[0.97] opacity-50"></div>

        {/* Left Arrow Hint - Smaller, closer to card */}
        <motion.div 
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-400"
          animate={{ x: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.div>

        {/* Right Arrow Hint - Smaller, closer to card */}
        <motion.div 
          className="absolute -right-8 top-1/2 -translate-y-1/2 text-gray-400"
          animate={{ x: [1, -1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.div>

        {/* Active Swipeable Question Card */}
        <motion.div
          className="relative bg-white rounded-3xl p-6 md:p-8 min-h-[420px] md:min-h-[450px] flex flex-col justify-center items-center cursor-grab active:cursor-grabbing shadow-2xl"
          style={{
            x,
            rotate,
            opacity,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={updateDirectionText}
          onDragEnd={handleDragEnd}
          animate={exitX !== 0 ? { x: exitX } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Swipe Direction Overlay - Appears when dragging */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-zillow-blue rounded-3xl pointer-events-none"
            style={{ opacity: overlayOpacity }}
          >
            <p className="text-white text-lg md:text-xl font-bold text-center px-8 leading-tight">
              {currentDirectionText}
            </p>
          </motion.div>

          {/* Question Text - Centered, using Asul font */}
          <div className="text-center space-y-6 z-10 w-full">
            <h2 className="text-xl md:text-2xl font-normal text-gray-900 leading-snug px-4">
              {text}
            </h2>
            
            {/* Snow Scene Illustration - matching reference */}
            <div className="w-full max-w-[280px] h-[240px] mx-auto relative">
              <svg viewBox="0 0 280 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Blue rounded rectangle background */}
                <rect x="0" y="0" width="280" height="240" rx="20" fill="#5B9AAD"/>
                {/* Falling snowflakes */}
                <circle cx="70" cy="30" r="3" fill="white" opacity="0.9"/>
                <circle cx="140" cy="50" r="3" fill="white" opacity="0.9"/>
                <circle cx="210" cy="35" r="3" fill="white" opacity="0.9"/>
                <circle cx="45" cy="80" r="3" fill="white" opacity="0.9"/>
                <circle cx="180" cy="100" r="3" fill="white" opacity="0.9"/>
                <circle cx="230" cy="120" r="3" fill="white" opacity="0.9"/>
                <circle cx="100" cy="140" r="3" fill="white" opacity="0.9"/>
                <circle cx="60" cy="170" r="3" fill="white" opacity="0.9"/>
                <circle cx="150" cy="180" r="3" fill="white" opacity="0.9"/>
                <circle cx="200" cy="160" r="3" fill="white" opacity="0.9"/>
                <circle cx="120" cy="210" r="3" fill="white" opacity="0.9"/>
                <circle cx="240" cy="190" r="3" fill="white" opacity="0.9"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

BinaryCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['binary']).isRequired,
    options: PropTypes.shape({
      left: PropTypes.string.isRequired,
      right: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default BinaryCard;
