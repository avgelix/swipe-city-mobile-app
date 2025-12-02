import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import QuestionIllustration from './QuestionIllustration';
import arrowIcon from '../assets/arrow.svg';

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
    <div className="w-full max-w-xs mx-auto">
      {/* Card Container with Stacked Effect and Arrow Hints */}
      <div className="relative rounded-b-2xl">
        {/* Top card stack - properly scaled and attached */}
        <div 
          className="absolute left-0 right-0 rounded-2xl"
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
          className="absolute left-0 right-0 rounded-2xl"
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
          className="absolute left-0 right-0 rounded-2xl"
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
          <img src={arrowIcon} alt="" className="w-8 h-8" style={{ transform: 'scaleX(-1)' }} />
        </motion.div>

        {/* Right Arrow Hint - behind card at edge */}
        <motion.div className="absolute -right-6 top-1/2 -translate-y-1/2 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-8 h-8" />
        </motion.div>

        {/* Active Swipeable Question Card */}
        <motion.div
          className="relative bg-white rounded-2xl p-6 w-full aspect-[2/3] flex flex-col justify-start items-center cursor-grab active:cursor-grabbing shadow-2xl overflow-hidden"
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
