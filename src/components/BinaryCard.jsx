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
        <div className="absolute inset-0 bg-white rounded-3xl shadow-md transform translate-y-3 scale-[0.94] opacity-30"></div>
        
        {/* Stack card 2 (middle) */}
        <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transform translate-y-1.5 scale-[0.97] opacity-50"></div>

        {/* Left Arrow Hint - matching reference */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </div>

        {/* Right Arrow Hint - matching reference */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>

        {/* Active Swipeable Question Card */}
        <motion.div
          className="relative bg-white rounded-[32px] p-4 w-full aspect-[2/3] flex flex-col justify-start items-center cursor-grab active:cursor-grabbing shadow-2xl"
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
            className="absolute inset-0 flex items-center justify-center bg-zillow-blue rounded-[32px] pointer-events-none"
            style={{ opacity: overlayOpacity }}
          >
            <p className="text-white text-xl font-bold text-center px-8 leading-tight">
              {currentDirectionText}
            </p>
          </motion.div>

          {/* Question Text - Centered, using Asul font */}
          <div className="text-center w-full pt-4 pb-2 z-10">
            <h2 className="text-xl font-normal text-black leading-tight px-4" style={{ fontFamily: 'Asul, sans-serif' }}>
              {text}
            </h2>
          </div>
          
          {/* Blue Dome/Arch Illustration - matching reference exactly */}
          <div className="w-full flex-1 flex items-end justify-center pb-0 z-10">
            <svg viewBox="0 0 340 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
              {/* Blue dome/arch shape with rounded top */}
              <path 
                d="M 30 320 L 30 160 Q 30 40, 170 40 Q 310 40, 310 160 L 310 320 Z" 
                fill="#5B9AAD"
              />
              {/* Falling snowflakes positioned naturally */}
              <circle cx="170" cy="75" r="4" fill="white" opacity="0.9"/>
              <circle cx="210" cy="95" r="4" fill="white" opacity="0.9"/>
              <circle cx="130" cy="105" r="4" fill="white" opacity="0.9"/>
              <circle cx="250" cy="125" r="4" fill="white" opacity="0.9"/>
              <circle cx="90" cy="140" r="4" fill="white" opacity="0.9"/>
              <circle cx="180" cy="155" r="4" fill="white" opacity="0.9"/>
              <circle cx="145" cy="175" r="4" fill="white" opacity="0.9"/>
              <circle cx="220" cy="185" r="4" fill="white" opacity="0.9"/>
              <circle cx="110" cy="200" r="4" fill="white" opacity="0.9"/>
              <circle cx="270" cy="210" r="4" fill="white" opacity="0.9"/>
              <circle cx="160" cy="230" r="4" fill="white" opacity="0.9"/>
              <circle cx="200" cy="250" r="4" fill="white" opacity="0.9"/>
              <circle cx="240" cy="270" r="4" fill="white" opacity="0.9"/>
              <circle cx="130" cy="280" r="4" fill="white" opacity="0.9"/>
            </svg>
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
