import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import QuestionIllustration from './QuestionIllustration';

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

  // Arrow visibility - fade out when card moves from center
  const arrowOpacity = useTransform(x, [-50, 0, 50], [0, 1, 0]);

  // Transform for overlay text opacity
  const overlayOpacity = useTransform(x, 
    [-100, -50, 0, 50, 100], 
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
      {/* Card Container with Stacked Effect and Arrow Hints */}
      <div className="relative rounded-b-2xl">
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

        {/* Left Arrow Hint - behind card at edge */}
        <motion.div className="absolute -left-6 top-1/2 -translate-y-1/2 z-0" style={{ opacity: arrowOpacity }}>
          <svg width="32" height="32" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" fill="#9CA3AF"/>
          </svg>
        </motion.div>

        {/* Right Arrow Hint - behind card at edge */}
        <motion.div className="absolute -right-6 top-1/2 -translate-y-1/2 z-0" style={{ opacity: arrowOpacity }}>
          <svg width="32" height="32" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="#9CA3AF"/>
          </svg>
        </motion.div>

        {/* Active Swipeable Question Card */}
        <motion.div
          className="relative bg-white rounded-2xl p-6 pb-0 w-full aspect-[2/3] flex flex-col justify-start items-center cursor-grab active:cursor-grabbing shadow-2xl overflow-hidden"
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
          <div className="text-center w-full pt-6 pb-2 z-10">
            <h2 className="text-lg font-normal text-black leading-snug px-3" style={{ fontFamily: 'Asul, sans-serif' }}>
              {text}
            </h2>
          </div>
          
          {/* Contextual Illustration */}
          <QuestionIllustration questionId={question.id} />

          {/* Swipe Direction Overlay - Soft light blue wash over entire card */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center rounded-2xl pointer-events-none z-20"
            style={{ 
              opacity: overlayOpacity,
              backgroundColor: '#6BA5D8' // Light sky blue - fully opaque
            }}
          >
            <p 
              className="text-white text-xl font-normal text-center px-12 leading-snug relative z-30" 
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
