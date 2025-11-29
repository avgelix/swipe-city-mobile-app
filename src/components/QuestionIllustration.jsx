import PropTypes from 'prop-types';

/**
 * QuestionIllustration Component
 * 
 * Renders contextual SVG illustrations for each question
 * Matches the soft, minimalist aesthetic of the original snow dome
 */
function QuestionIllustration({ questionId }) {
  const illustrations = {
    // Q1: Snow on winter morning
    1: (
      <svg viewBox="0 0 200 330" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <path d="M 0 330 L 0 120 Q 0 0, 100 0 Q 200 0, 200 120 L 200 330 Z" fill="#5B9AAD"/>
        <circle cx="140" cy="27" r="3" fill="white" opacity="0.9"/>
        <circle cx="95" cy="52" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="160" cy="78" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="120" cy="102" r="3" fill="white" opacity="0.9"/>
        <circle cx="70" cy="128" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="170" cy="150" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="105" cy="177" r="3" fill="white" opacity="0.9"/>
        <circle cx="150" cy="202" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="85" cy="228" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="130" cy="252" r="3" fill="white" opacity="0.9"/>
        <circle cx="175" cy="278" r="2.5" fill="white" opacity="0.9"/>
        <circle cx="100" cy="303" r="2.5" fill="white" opacity="0.9"/>
      </svg>
    ),

    // Q2: Wardrobe/clothing variety - closet with hangers
    2: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="40" y="220" width="120" height="80" rx="8" fill="#E8D5C4" opacity="0.8"/>
        <line x1="50" y1="230" x2="150" y2="230" stroke="#8B7355" strokeWidth="3"/>
        <path d="M 70 230 Q 70 245, 75 255 L 65 255 Q 70 245, 70 230" fill="#6BA5D8" opacity="0.7"/>
        <path d="M 95 230 Q 95 245, 100 255 L 90 255 Q 95 245, 95 230" fill="#C97064" opacity="0.7"/>
        <path d="M 120 230 Q 120 245, 125 255 L 115 255 Q 120 245, 120 230" fill="#7BA885" opacity="0.7"/>
        <path d="M 80 255 L 70 280 L 90 280 L 80 255" fill="#5B8AAD" opacity="0.6"/>
        <path d="M 110 255 L 100 280 L 120 280 L 110 255" fill="#A67C52" opacity="0.6"/>
      </svg>
    ),

    // Q3: Thunderstorm - lightning bolt and rain
    3: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="100" cy="80" rx="50" ry="30" fill="#8B9AA3" opacity="0.6"/>
        <ellipse cx="80" cy="90" rx="40" ry="25" fill="#6B7A83" opacity="0.7"/>
        <ellipse cx="120" cy="90" rx="45" ry="28" fill="#7B8A93" opacity="0.65"/>
        <path d="M 100 100 L 85 150 L 95 150 L 85 200 L 110 145 L 100 145 Z" fill="#F4D03F" opacity="0.9"/>
        <line x1="60" y1="120" x2="55" y2="140" stroke="#6BA5D8" strokeWidth="2" opacity="0.5"/>
        <line x1="75" y1="130" x2="70" y2="150" stroke="#6BA5D8" strokeWidth="2" opacity="0.5"/>
        <line x1="125" y1="125" x2="120" y2="145" stroke="#6BA5D8" strokeWidth="2" opacity="0.5"/>
        <line x1="140" y1="135" x2="135" y2="155" stroke="#6BA5D8" strokeWidth="2" opacity="0.5"/>
      </svg>
    ),

    // Q4: 11 PM Tuesday - bed vs late night food
    4: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="40" y="200" width="120" height="60" rx="5" fill="#8B9AA3" opacity="0.6"/>
        <rect x="45" y="180" width="110" height="25" rx="3" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="55" cy="192" r="8" fill="white" opacity="0.7"/>
        <circle cx="75" cy="192" r="8" fill="white" opacity="0.7"/>
        <circle cx="95" cy="192" r="8" fill="white" opacity="0.7"/>
        <path d="M 70 140 Q 75 145, 100 145 Q 125 145, 130 140 L 135 155 Q 100 160, 65 155 Z" fill="#F4D03F" opacity="0.3"/>
        <circle cx="100" cy="125" r="15" fill="#F4D03F" opacity="0.4"/>
      </svg>
    ),

    // Q5: Walking to store - footsteps
    5: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="60" cy="220" rx="12" ry="18" fill="#6BA5D8" opacity="0.6" transform="rotate(-15 60 220)"/>
        <ellipse cx="75" cy="200" rx="12" ry="18" fill="#6BA5D8" opacity="0.5" transform="rotate(10 75 200)"/>
        <ellipse cx="90" cy="180" rx="12" ry="18" fill="#6BA5D8" opacity="0.4" transform="rotate(-15 90 180)"/>
        <ellipse cx="105" cy="160" rx="12" ry="18" fill="#6BA5D8" opacity="0.35" transform="rotate(10 105 160)"/>
        <ellipse cx="120" cy="140" rx="12" ry="18" fill="#6BA5D8" opacity="0.3" transform="rotate(-15 120 140)"/>
        <ellipse cx="135" cy="120" rx="12" ry="18" fill="#6BA5D8" opacity="0.25" transform="rotate(10 135 120)"/>
      </svg>
    ),

    // Q6: Sirens at 3 AM - sound waves
    6: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="100" cy="200" r="8" fill="#C97064" opacity="0.8"/>
        <circle cx="100" cy="200" r="25" stroke="#C97064" strokeWidth="2" fill="none" opacity="0.5"/>
        <circle cx="100" cy="200" r="40" stroke="#C97064" strokeWidth="2" fill="none" opacity="0.3"/>
        <circle cx="100" cy="200" r="55" stroke="#C97064" strokeWidth="2" fill="none" opacity="0.2"/>
        <path d="M 85 185 L 85 160 L 95 160 L 95 175 L 105 175 L 105 160 L 115 160 L 115 185 Z" fill="#7B8A93" opacity="0.6"/>
      </svg>
    ),

    // Q7: Coffee shop work conversations - coffee cup
    7: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="60" y="180" width="80" height="90" rx="8" fill="#8B6F47" opacity="0.7"/>
        <rect x="65" y="185" width="70" height="80" rx="6" fill="#C4A57B" opacity="0.8"/>
        <path d="M 140 200 Q 160 200, 160 220 Q 160 240, 140 240" stroke="#8B6F47" strokeWidth="4" fill="none" opacity="0.6"/>
        <ellipse cx="100" cy="160" rx="35" ry="8" fill="#5B4A3C" opacity="0.5"/>
        <path d="M 85 140 Q 90 130, 95 135" stroke="#8B6F47" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M 100 135 Q 105 125, 110 130" stroke="#8B6F47" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M 105 140 Q 110 130, 115 135" stroke="#8B6F47" strokeWidth="2" fill="none" opacity="0.4"/>
      </svg>
    ),

    // Q8: Paycheck/money - wallet with bills
    8: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="50" y="200" width="100" height="70" rx="5" fill="#7BA885" opacity="0.7"/>
        <rect x="55" y="190" width="90" height="60" rx="5" fill="#8BC497" opacity="0.6"/>
        <rect x="60" y="180" width="80" height="50" rx="5" fill="#A5D6B0" opacity="0.5"/>
        <circle cx="100" cy="205" r="15" stroke="#5B7A65" strokeWidth="2" fill="none" opacity="0.8"/>
        <text x="100" y="212" fontSize="20" fill="#5B7A65" textAnchor="middle" opacity="0.8">$</text>
      </svg>
    ),

    // Q9: Friday dinner - cooking pot vs restaurant plate
    9: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="100" cy="220" rx="60" ry="10" fill="#C4A57B" opacity="0.6"/>
        <circle cx="100" cy="200" r="50" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="85" cy="195" r="15" fill="#C97064" opacity="0.6"/>
        <circle cx="115" cy="195" r="12" fill="#7BA885" opacity="0.6"/>
        <circle cx="100" cy="210" r="10" fill="#F4D03F" opacity="0.6"/>
        <path d="M 95 175 L 85 160 L 87 158 L 97 173" stroke="#8B7355" strokeWidth="2" fill="none"/>
        <path d="M 105 175 L 115 160 L 113 158 L 103 173" stroke="#8B7355" strokeWidth="2" fill="none"/>
      </svg>
    ),

    // Q10: Food variety - multiple cuisine icons
    10: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="70" cy="180" r="25" fill="#C97064" opacity="0.6"/>
        <path d="M 70 165 L 65 175 L 75 175 Z" fill="#F4D03F" opacity="0.7"/>
        <rect x="110" y="170" width="35" height="35" rx="3" fill="#8BC497" opacity="0.6"/>
        <circle cx="127" cy="187" r="8" fill="white" opacity="0.8"/>
        <path d="M 60 230 Q 80 245, 100 230" stroke="#8B6F47" strokeWidth="3" fill="none" opacity="0.6"/>
        <path d="M 100 230 Q 120 245, 140 230" stroke="#8B6F47" strokeWidth="3" fill="none" opacity="0.6"/>
        <circle cx="85" cy="260" r="12" fill="#6BA5D8" opacity="0.5"/>
        <circle cx="115" cy="260" r="12" fill="#A67C52" opacity="0.5"/>
      </svg>
    ),

    // Q11: Political debate - speech bubbles
    11: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="40" y="170" width="70" height="50" rx="8" fill="#6BA5D8" opacity="0.6"/>
        <path d="M 60 220 L 55 235 L 70 220" fill="#6BA5D8" opacity="0.6"/>
        <rect x="90" y="200" width="70" height="50" rx="8" fill="#C97064" opacity="0.6"/>
        <path d="M 140 250 L 145 265 L 130 250" fill="#C97064" opacity="0.6"/>
        <line x1="50" y1="185" x2="95" y2="185" stroke="white" strokeWidth="2" opacity="0.5"/>
        <line x1="50" y1="195" x2="85" y2="195" stroke="white" strokeWidth="2" opacity="0.5"/>
        <line x1="100" y1="215" x2="145" y2="215" stroke="white" strokeWidth="2" opacity="0.5"/>
        <line x1="100" y1="225" x2="135" y2="225" stroke="white" strokeWidth="2" opacity="0.5"/>
      </svg>
    ),

    // Q12: Sunday peace - coffee cup and nature
    12: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="100" cy="140" r="30" fill="#F4D03F" opacity="0.3"/>
        <path d="M 60 200 Q 80 180, 100 200 Q 120 220, 140 200" fill="#7BA885" opacity="0.6"/>
        <rect x="75" y="220" width="20" height="40" fill="#8B6F47" opacity="0.5"/>
        <circle cx="85" cy="210" r="20" fill="#7BA885" opacity="0.7"/>
        <circle cx="75" cy="205" r="15" fill="#7BA885" opacity="0.6"/>
        <circle cx="95" cy="205" r="15" fill="#7BA885" opacity="0.6"/>
        <rect x="110" y="240" width="30" height="40" rx="3" fill="#C4A57B" opacity="0.7"/>
        <path d="M 140 250 Q 155 250, 155 265 Q 155 280, 140 280" stroke="#8B6F47" strokeWidth="3" fill="none" opacity="0.6"/>
      </svg>
    ),

    // Q13: Weekend activities - ticket stub
    13: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="50" y="180" width="100" height="80" rx="5" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="50" cy="220" r="8" fill="white" opacity="0.9"/>
        <circle cx="150" cy="220" r="8" fill="white" opacity="0.9"/>
        <line x1="60" y1="200" x2="90" y2="200" stroke="#8B7355" strokeWidth="2" opacity="0.6"/>
        <line x1="60" y1="215" x2="80" y2="215" stroke="#8B7355" strokeWidth="2" opacity="0.6"/>
        <line x1="60" y1="230" x2="85" y2="230" stroke="#8B7355" strokeWidth="2" opacity="0.6"/>
        <path d="M 110 210 L 120 195 L 130 210 L 140 195 L 135 215 L 115 215 Z" fill="#6BA5D8" opacity="0.6"/>
      </svg>
    ),

    // Q14: Outdoor Saturday - mountain/trail
    14: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <path d="M 0 270 L 60 180 L 100 220 L 140 160 L 180 200 L 200 270 Z" fill="#8B9AA3" opacity="0.6"/>
        <path d="M 40 270 L 80 200 L 120 240 L 160 190 L 200 240" fill="#7BA885" opacity="0.5"/>
        <circle cx="50" cy="140" r="20" fill="#F4D03F" opacity="0.4"/>
        <path d="M 90 210 L 95 200 L 100 210" fill="white" opacity="0.7"/>
        <path d="M 130 180 L 135 170 L 140 180" fill="white" opacity="0.7"/>
      </svg>
    ),

    // Q15: Exercise setting - running figure
    15: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="100" cy="170" r="15" fill="#6BA5D8" opacity="0.7"/>
        <path d="M 100 185 L 100 230" stroke="#6BA5D8" strokeWidth="6" opacity="0.7"/>
        <path d="M 100 200 L 80 220" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <path d="M 100 200 L 120 215" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <path d="M 100 230 L 85 265" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <path d="M 100 230 L 115 260" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <ellipse cx="100" cy="280" rx="30" ry="8" fill="#8B9AA3" opacity="0.3"/>
      </svg>
    ),

    // Q16: Unwind - couch
    16: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="35" y="210" width="130" height="50" rx="10" fill="#8B9AA3" opacity="0.7"/>
        <rect x="30" y="200" width="20" height="70" rx="8" fill="#7B8A93" opacity="0.6"/>
        <rect x="150" y="200" width="20" height="70" rx="8" fill="#7B8A93" opacity="0.6"/>
        <rect x="45" y="190" width="110" height="25" rx="5" fill="#A0ADB5" opacity="0.8"/>
        <circle cx="70" cy="202" r="8" fill="#E8D5C4" opacity="0.6"/>
        <circle cx="100" cy="202" r="8" fill="#E8D5C4" opacity="0.6"/>
        <circle cx="130" cy="202" r="8" fill="#E8D5C4" opacity="0.6"/>
      </svg>
    ),

    // Q17: Education quality - graduation cap and book
    17: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="60" y="220" width="80" height="60" rx="3" fill="#6BA5D8" opacity="0.6"/>
        <rect x="65" y="225" width="70" height="50" rx="2" fill="#8BC4D8" opacity="0.5"/>
        <line x1="75" y1="235" x2="125" y2="235" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="75" y1="245" x2="125" y2="245" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="75" y1="255" x2="115" y2="255" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <path d="M 100 180 L 60 195 L 100 210 L 140 195 Z" fill="#F4D03F" opacity="0.7"/>
        <rect x="95" y="210" width="10" height="15" fill="#C97064" opacity="0.6"/>
      </svg>
    ),

    // Q18: Family far away - airplane
    18: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <path d="M 140 180 L 120 190 L 60 185 L 55 195 L 110 200 L 80 220 L 75 225 L 105 228 L 100 240 L 110 243 L 120 225 L 150 230 L 155 200 Z" fill="#6BA5D8" opacity="0.7"/>
        <circle cx="145" cy="195" r="8" fill="white" opacity="0.8"/>
        <circle cx="155" cy="195" r="8" fill="white" opacity="0.8"/>
        <path d="M 50 250 Q 60 245, 70 250" stroke="#E8D5C4" strokeWidth="3" fill="none" opacity="0.4"/>
        <path d="M 80 255 Q 90 250, 100 255" stroke="#E8D5C4" strokeWidth="3" fill="none" opacity="0.3"/>
        <path d="M 110 260 Q 120 255, 130 260" stroke="#E8D5C4" strokeWidth="3" fill="none" opacity="0.2"/>
      </svg>
    ),

    // Q19: Flying comfort - airplane in sky
    19: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="80" cy="160" rx="40" ry="20" fill="#E8D5C4" opacity="0.5"/>
        <ellipse cx="130" cy="180" rx="50" ry="25" fill="#D5C4B4" opacity="0.4"/>
        <ellipse cx="110" cy="200" rx="45" ry="22" fill="#C4B4A4" opacity="0.3"/>
        <path d="M 120 230 L 100 240 L 50 235 L 48 242 L 95 247 L 70 260 L 68 265 L 93 267 L 90 275 L 98 277 L 105 262 L 130 267 L 133 242 Z" fill="#8BC4D8" opacity="0.8"/>
        <circle cx="125" cy="247" r="6" fill="white" opacity="0.9"/>
      </svg>
    ),

    // Q20: Late for meeting - car keys vs metro card
    20: (
      <svg viewBox="0 0 200 300" className="w-3/5 h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="50" y="200" width="100" height="60" rx="8" fill="#C97064" opacity="0.6"/>
        <rect x="60" y="210" width="80" height="40" rx="5" fill="white" opacity="0.8"/>
        <circle cx="75" cy="230" r="8" fill="#6BA5D8" opacity="0.7"/>
        <circle cx="125" cy="230" r="8" fill="#6BA5D8" opacity="0.7"/>
        <rect x="95" y="215" width="10" height="30" rx="2" fill="#7B8A93" opacity="0.6"/>
        <path d="M 70 175 L 60 165 L 65 160 L 75 170" stroke="#8B7355" strokeWidth="3" fill="none"/>
        <circle cx="68" cy="168" r="8" fill="#F4D03F" opacity="0.6"/>
      </svg>
    )
  };

  return (
    <div className="w-full flex-1 flex items-end justify-center z-10">
      {illustrations[questionId] || illustrations[1]}
    </div>
  );
}

QuestionIllustration.propTypes = {
  questionId: PropTypes.number.isRequired
};

export default QuestionIllustration;
