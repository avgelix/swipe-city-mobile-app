import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { getSwipeDirection, isValidSwipe } from '../utils/swipeDetection';
import { triggerHaptic } from '../utils/haptics';
import QuestionIllustration from './QuestionIllustration';
import arrowIcon from '../assets/arrow.svg';

/**
 * MultiChoiceCard Component
 * 
 * A card that supports 8-directional swipes for multi-choice questions
 * Features:
 * - 2D drag (both x and y axes)
 * - Dynamic directional hints around the card
 * - Distance threshold for valid swipes
 * - Direction detection using angle calculation
 * - Exit animations in the swiped direction
 */
function MultiChoiceCard({ question, currentQuestion, totalQuestions, onAnswer }) {
  const { category, text, options } = question;
  const [exitDirection, setExitDirection] = useState(null);
  
  // Motion values for 2D drag tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform for card rotation based on x position
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  // Keep card fully opaque during swipe (like BinaryCard)
  const opacity = 1;

  // Arrow visibility - fade out when card moves from center (based on 2D distance)
  const arrowOpacity = useTransform(
    [x, y],
    ([xVal, yVal]) => {
      const distance = Math.sqrt(xVal * xVal + yVal * yVal);
      if (distance < 30) return 1; // Fully visible when centered
      if (distance > 70) return 0; // Fully hidden when swiping
      return 1 - (distance - 30) / 40; // Fade transition
    }
  );

  // Transform for overlay text opacity based on swipe distance
  const overlayOpacity = useTransform(
    [x, y],
    ([xVal, yVal]) => {
      const distance = Math.sqrt(xVal * xVal + yVal * yVal);
      return distance > 80 ? 1 : 0;
    }
  );

  // Track the current direction text using state
  const [currentDirectionText, setCurrentDirectionText] = useState('');

  // Update direction text as user drags
  const updateDirectionText = () => {
    const xVal = x.get();
    const yVal = y.get();
    const distance = Math.sqrt(xVal * xVal + yVal * yVal);
    
    if (distance < 50) {
      setCurrentDirectionText('');
    } else {
      const direction = getSwipeDirection(xVal, yVal);
      setCurrentDirectionText(options[direction] || '');
    }
  };

  /**
   * Handle drag end - detect direction and trigger answer
   */
  const handleDragEnd = (event, info) => {
    const { offset } = info;
    
    // Check if swipe meets minimum threshold (100px)
    if (!isValidSwipe(offset.x, offset.y, 100)) {
      // Snap back if swipe too short
      return;
    }
    
    // Get the direction of the swipe
    const direction = getSwipeDirection(offset.x, offset.y);
    
    // Trigger haptic feedback
    triggerHaptic('medium');
    
    // Calculate exit position (move card far in swipe direction)
    const exitMultiplier = 1500;
    const angle = Math.atan2(offset.y, offset.x);
    const exitX = Math.cos(angle) * exitMultiplier;
    const exitY = Math.sin(angle) * exitMultiplier;
    
    setExitDirection({ x: exitX, y: exitY });
    
    // Delay answer callback to allow exit animation
    setTimeout(() => {
      onAnswer(options[direction]);
    }, 200);
  };

  return (
    <div className="w-full max-w-xs mx-auto px-4">
      {/* Card Container with Stacked Effect and 8-Directional Arrow Hints */}
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

        {/* 8-Directional Arrow Hints - behind card at edges */}
        
        {/* Left Arrow */}
        <motion.div className="absolute -left-6 top-1/2 -translate-y-1/2 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-8 h-8" style={{ transform: 'scaleX(-1)' }} />
        </motion.div>

        {/* Right Arrow */}
        <motion.div className="absolute -right-6 top-1/2 -translate-y-1/2 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-8 h-8" />
        </motion.div>

        {/* Up Arrow */}
        <motion.div className="absolute left-1/2 -translate-x-1/2 -top-6 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-8 h-8" style={{ transform: 'rotate(-90deg)' }} />
        </motion.div>

        {/* Down Arrow */}
        <motion.div className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-8 h-8" style={{ transform: 'rotate(90deg)' }} />
        </motion.div>

        {/* Up-Left Arrow (diagonal) */}
        <motion.div className="absolute -left-5 -top-5 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-7 h-7" style={{ transform: 'rotate(-135deg)' }} />
        </motion.div>

        {/* Up-Right Arrow (diagonal) */}
        <motion.div className="absolute -right-5 -top-5 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-7 h-7" style={{ transform: 'rotate(-45deg)' }} />
        </motion.div>

        {/* Down-Left Arrow (diagonal) */}
        <motion.div className="absolute -left-5 -bottom-5 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-7 h-7" style={{ transform: 'rotate(135deg)' }} />
        </motion.div>

        {/* Down-Right Arrow (diagonal) */}
        <motion.div className="absolute -right-5 -bottom-5 z-0" style={{ opacity: arrowOpacity }}>
          <img src={arrowIcon} alt="" className="w-7 h-7" style={{ transform: 'rotate(45deg)' }} />
        </motion.div>

        {/* Active Swipeable Question Card */}
        <motion.div
          className="relative bg-white rounded-2xl p-6 pb-0 w-full aspect-[2/3] flex flex-col justify-start items-center cursor-grab active:cursor-grabbing shadow-2xl overflow-hidden"
          style={{
            x,
            y,
            rotate,
            opacity,
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7}
          onDrag={updateDirectionText}
          onDragEnd={handleDragEnd}
          animate={exitDirection ? { x: exitDirection.x, y: exitDirection.y, opacity: 0 } : {}}
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

MultiChoiceCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['multiChoice']).isRequired,
    options: PropTypes.shape({
      up: PropTypes.string.isRequired,
      upRight: PropTypes.string.isRequired,
      right: PropTypes.string.isRequired,
      downRight: PropTypes.string.isRequired,
      down: PropTypes.string.isRequired,
      downLeft: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      upLeft: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default MultiChoiceCard;
