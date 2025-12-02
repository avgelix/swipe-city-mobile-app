import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Import custom SVG illustrations as URLs
import Q1Snow from '../assets/illustrations/Q1-snow.svg';
import Q2Wardrobe from '../assets/illustrations/Q2-wardrobe.svg';
import Q3Rain from '../assets/illustrations/Q3-rain.svg';
import Q4PM from '../assets/illustrations/Q4-11PM.svg';
import Q5Store from '../assets/illustrations/Q5-store.svg';
import Q6Loud from '../assets/illustrations/Q6-loud.svg';
import Q7Coffeeshop from '../assets/illustrations/Q7-coffeeshop.svg';
import Q8Pay from '../assets/illustrations/Q8-pay.svg';
import Q9Fridaydinner from '../assets/illustrations/Q9-fridaydinner.svg';
import Q10Foodvariety from '../assets/illustrations/Q10-foodvariety.svg';
import Q11Political from '../assets/illustrations/Q11-political.svg';
import Q12Sunday from '../assets/illustrations/Q12-Sunday.svg';
import Q13Weekend from '../assets/illustrations/Q13-weekend.svg';
import Q14Outdoor from '../assets/illustrations/Q14-outdoor.svg';
import Q15Exercise from '../assets/illustrations/Q15-exercise.svg';
import Q16Unwind from '../assets/illustrations/Q16-unwind.svg';
import Q17Education from '../assets/illustrations/Q17-education.svg';
import Q18Family from '../assets/illustrations/Q18-family.svg';
import Q19Flying from '../assets/illustrations/Q19-flying.svg';
import Q20Late from '../assets/illustrations/Q20-late.svg';

/**
 * QuestionIllustration Component
 * 
 * Renders custom SVG illustrations for each question
 * Uses imported SVG files that maintain proportions and fit within card space
 */
function QuestionIllustration({ questionId }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const illustrationSrc = useMemo(() => {
    const illustrations = {
      1: Q1Snow,
      2: Q2Wardrobe,
      3: Q3Rain,
      4: Q4PM,
      5: Q5Store,
      6: Q6Loud,
      7: Q7Coffeeshop,
      8: Q8Pay,
      9: Q9Fridaydinner,
      10: Q10Foodvariety,
      11: Q11Political,
      12: Q12Sunday,
      13: Q13Weekend,
      14: Q14Outdoor,
      15: Q15Exercise,
      16: Q16Unwind,
      17: Q17Education,
      18: Q18Family,
      19: Q19Flying,
      20: Q20Late,
    };

    return illustrations[questionId] || null;
  }, [questionId]);

  if (!illustrationSrc) return null;

  return (
    <div className="w-full flex-1 flex items-end justify-center px-4 pb-4 z-10">
      {/* Show a subtle loading indicator while image loads */}
      {!imageLoaded && !imageError && (
        <div 
          className="w-full max-w-full flex items-center justify-center" 
          style={{ height: '320px' }}
        >
          <div className="animate-pulse text-gray-300">Loading...</div>
        </div>
      )}
      
      <img 
        src={illustrationSrc}
        alt=""
        className={`w-full max-w-full object-contain transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          height: 'auto',
          maxHeight: '320px',
          display: imageLoaded ? 'block' : 'none'
        }}
        onLoad={() => {
          setImageLoaded(true);
          setImageError(false);
        }}
        onError={(e) => {
          console.error(`Failed to load illustration for question ${questionId}:`, e);
          setImageError(true);
        }}
      />
      
      {/* Fallback if image fails to load */}
      {imageError && (
        <div 
          className="w-full max-w-full flex items-center justify-center text-gray-400" 
          style={{ height: '320px' }}
        >
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

QuestionIllustration.propTypes = {
  questionId: PropTypes.number.isRequired
};

export default QuestionIllustration;
