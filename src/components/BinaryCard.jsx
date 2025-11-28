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
    <div className="w-full max-w-xs mx-auto px-4">
      {/* Negative space for progress indicator */}
      <div className="mb-3 h-6"></div>

      {/* Card Container with Stacked Effect and Arrow Hints */}
      <div className="relative">
        {/* Stack card 1 (furthest back) */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-md transform translate-y-3 scale-[0.94] opacity-30"></div>
        
        {/* Stack card 2 (middle) */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform translate-y-1.5 scale-[0.97] opacity-50"></div>

        {/* Left Arrow Hint - behind card at edge */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-0">
          <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0C6 0 0 4 0 6C0 8 6 12 6 12V8H32V4H6V0Z" fill="#636363"/>
          </svg>
        </div>

        {/* Right Arrow Hint - behind card at edge */}
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-0">
          <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 12C26 12 32 8 32 6C32 4 26 0 26 0V4H0V8H26V12Z" fill="#636363"/>
          </svg>
        </div>

        {/* Active Swipeable Question Card */}
        <motion.div
          className="relative bg-white rounded-2xl p-4 pb-0 w-full aspect-[2/3] flex flex-col justify-start items-center cursor-grab active:cursor-grabbing shadow-2xl overflow-hidden"
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
          {/* Question Text - Centered, using Asul font */}
          <div className="text-center w-full pt-4 pb-2 z-10">
            <h2 className="text-xl font-normal text-black leading-tight px-4" style={{ fontFamily: 'Asul, sans-serif' }}>
              {text}
            </h2>
          </div>
          
          {/* Blue Arch Illustration - thinner, touches bottom edge */}
          <div className="w-full flex-1 flex items-end justify-center z-10">
            <svg viewBox="0 0 200 320" className="w-3/4 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Blue arch shape with rounded top - thinner and touches bottom */}
              <path 
                d="M 0 320 L 0 120 Q 0 0, 100 0 Q 200 0, 200 120 L 200 320 Z" 
                fill="#5B9AAD"
              />
              {/* Falling snowflakes */}
              <circle cx="140" cy="25" r="3.5" fill="white" opacity="0.9"/>
              <circle cx="95" cy="50" r="3" fill="white" opacity="0.9"/>
              <circle cx="160" cy="70" r="3" fill="white" opacity="0.9"/>
              <circle cx="120" cy="95" r="3.5" fill="white" opacity="0.9"/>
              <circle cx="70" cy="120" r="3" fill="white" opacity="0.9"/>
              <circle cx="170" cy="135" r="3" fill="white" opacity="0.9"/>
              <circle cx="105" cy="160" r="3.5" fill="white" opacity="0.9"/>
              <circle cx="150" cy="185" r="3" fill="white" opacity="0.9"/>
              <circle cx="85" cy="210" r="3" fill="white" opacity="0.9"/>
              <circle cx="130" cy="235" r="3.5" fill="white" opacity="0.9"/>
              <circle cx="175" cy="260" r="3" fill="white" opacity="0.9"/>
              <circle cx="100" cy="285" r="3" fill="white" opacity="0.9"/>
            </svg>
          </div>

          {/* Swipe Direction Overlay - Soft light blue wash over entire card */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center rounded-2xl pointer-events-none z-20"
            style={{ 
              opacity: overlayOpacity,
              backgroundColor: '#6BA5D8' // Light sky blue - fully opaque
            }}
          >
            <p 
              className="text-white text-xl font-normal text-center px-4 leading-snug relative z-30" 
              style={{ fontFamily: 'Asul, sans-serif' }}
            >
              {currentDirectionText}
            </p>
          </motion.div>
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
