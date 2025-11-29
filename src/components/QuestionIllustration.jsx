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
      <svg viewBox="0 0 200 330" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
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
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="20" y="180" width="160" height="120" rx="12" fill="#E8D5C4" opacity="0.8"/>
        <line x1="30" y1="200" x2="170" y2="200" stroke="#8B7355" strokeWidth="5"/>
        <path d="M 60 200 Q 60 225, 70 245 L 50 245 Q 60 225, 60 200" fill="#6BA5D8" opacity="0.8"/>
        <path d="M 100 200 Q 100 225, 110 245 L 90 245 Q 100 225, 100 200" fill="#C97064" opacity="0.8"/>
        <path d="M 140 200 Q 140 225, 150 245 L 130 245 Q 140 225, 140 200" fill="#7BA885" opacity="0.8"/>
        <path d="M 70 245 L 55 285 L 85 285 L 70 245" fill="#5B8AAD" opacity="0.7"/>
        <path d="M 120 245 L 105 285 L 135 285 L 120 245" fill="#A67C52" opacity="0.7"/>
      </svg>
    ),

    // Q3: Thunderstorm - lightning bolt and rain
    3: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="100" cy="100" rx="70" ry="45" fill="#8B9AA3" opacity="0.7"/>
        <ellipse cx="70" cy="115" rx="60" ry="40" fill="#6B7A83" opacity="0.75"/>
        <ellipse cx="130" cy="115" rx="65" ry="42" fill="#7B8A93" opacity="0.7"/>
        <path d="M 100 130 L 75 200 L 95 200 L 75 270 L 120 190 L 100 190 Z" fill="#F4D03F" opacity="0.95"/>
        <line x1="40" y1="150" x2="30" y2="185" stroke="#6BA5D8" strokeWidth="3" opacity="0.6"/>
        <line x1="60" y1="160" x2="50" y2="195" stroke="#6BA5D8" strokeWidth="3" opacity="0.6"/>
        <line x1="140" y1="155" x2="130" y2="190" stroke="#6BA5D8" strokeWidth="3" opacity="0.6"/>
        <line x1="160" y1="165" x2="150" y2="200" stroke="#6BA5D8" strokeWidth="3" opacity="0.6"/>
      </svg>
    ),

    // Q4: 11 PM Tuesday - bed vs late night food
    4: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="20" y="200" width="160" height="80" rx="8" fill="#8B9AA3" opacity="0.7"/>
        <rect x="30" y="170" width="140" height="35" rx="5" fill="#E8D5C4" opacity="0.85"/>
        <circle cx="50" cy="187" r="12" fill="white" opacity="0.8"/>
        <circle cx="80" cy="187" r="12" fill="white" opacity="0.8"/>
        <circle cx="110" cy="187" r="12" fill="white" opacity="0.8"/>
        <circle cx="140" cy="187" r="12" fill="white" opacity="0.8"/>
        <path d="M 60 120 Q 70 130, 100 130 Q 130 130, 140 120 L 150 145 Q 100 155, 50 145 Z" fill="#F4D03F" opacity="0.4"/>
        <circle cx="100" cy="95" r="25" fill="#F4D03F" opacity="0.5"/>
      </svg>
    ),

    // Q5: Walking to store - footsteps
    5: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="50" cy="240" rx="18" ry="28" fill="#6BA5D8" opacity="0.7" transform="rotate(-15 50 240)"/>
        <ellipse cx="75" cy="210" rx="18" ry="28" fill="#6BA5D8" opacity="0.65" transform="rotate(10 75 210)"/>
        <ellipse cx="100" cy="180" rx="18" ry="28" fill="#6BA5D8" opacity="0.6" transform="rotate(-15 100 180)"/>
        <ellipse cx="125" cy="150" rx="18" ry="28" fill="#6BA5D8" opacity="0.55" transform="rotate(10 125 150)"/>
        <ellipse cx="150" cy="120" rx="18" ry="28" fill="#6BA5D8" opacity="0.5" transform="rotate(-15 150 120)"/>
        <ellipse cx="175" cy="90" rx="18" ry="28" fill="#6BA5D8" opacity="0.45" transform="rotate(10 175 90)"/>
      </svg>
    ),

    // Q6: Sirens at 3 AM - sound waves
    6: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="100" cy="200" r="15" fill="#C97064" opacity="0.9"/>
        <circle cx="100" cy="200" r="40" stroke="#C97064" strokeWidth="4" fill="none" opacity="0.6"/>
        <circle cx="100" cy="200" r="65" stroke="#C97064" strokeWidth="4" fill="none" opacity="0.4"/>
        <circle cx="100" cy="200" r="90" stroke="#C97064" strokeWidth="4" fill="none" opacity="0.25"/>
        <path d="M 75 165 L 75 125 L 90 125 L 90 150 L 110 150 L 110 125 L 125 125 L 125 165 Z" fill="#7B8A93" opacity="0.7"/>
      </svg>
    ),

    // Q7: Coffee shop work conversations - coffee cup
    7: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="40" y="160" width="120" height="130" rx="12" fill="#8B6F47" opacity="0.8"/>
        <rect x="50" y="170" width="100" height="110" rx="10" fill="#C4A57B" opacity="0.85"/>
        <path d="M 150 190 Q 180 190, 180 220 Q 180 250, 150 250" stroke="#8B6F47" strokeWidth="6" fill="none" opacity="0.7"/>
        <ellipse cx="100" cy="130" rx="50" ry="12" fill="#5B4A3C" opacity="0.6"/>
        <path d="M 75 95 Q 85 80, 95 90" stroke="#8B6F47" strokeWidth="3" fill="none" opacity="0.5"/>
        <path d="M 95 90 Q 105 75, 115 85" stroke="#8B6F47" strokeWidth="3" fill="none" opacity="0.5"/>
        <path d="M 105 95 Q 115 80, 125 90" stroke="#8B6F47" strokeWidth="3" fill="none" opacity="0.5"/>
      </svg>
    ),

    // Q8: Paycheck/money - wallet with bills
    8: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="30" y="200" width="140" height="90" rx="8" fill="#7BA885" opacity="0.8"/>
        <rect x="35" y="185" width="130" height="80" rx="8" fill="#8BC497" opacity="0.7"/>
        <rect x="40" y="170" width="120" height="70" rx="8" fill="#A5D6B0" opacity="0.6"/>
        <circle cx="100" cy="205" r="25" stroke="#5B7A65" strokeWidth="3" fill="none" opacity="0.9"/>
        <text x="100" y="218" fontSize="32" fontWeight="bold" fill="#5B7A65" textAnchor="middle" opacity="0.9">$</text>
      </svg>
    ),

    // Q9: Friday dinner - cooking pot vs restaurant plate
    9: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="100" cy="240" rx="80" ry="15" fill="#C4A57B" opacity="0.7"/>
        <circle cx="100" cy="200" r="70" fill="#E8D5C4" opacity="0.85"/>
        <circle cx="75" cy="190" r="22" fill="#C97064" opacity="0.7"/>
        <circle cx="125" cy="190" r="18" fill="#7BA885" opacity="0.7"/>
        <circle cx="100" cy="215" r="15" fill="#F4D03F" opacity="0.7"/>
        <path d="M 90 155 L 75 130 L 80 125 L 95 150" stroke="#8B7355" strokeWidth="3" fill="none"/>
        <path d="M 110 155 L 125 130 L 120 125 L 105 150" stroke="#8B7355" strokeWidth="3" fill="none"/>
      </svg>
    ),

    // Q10: Food variety - multiple cuisine icons
    10: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="60" cy="150" r="35" fill="#C97064" opacity="0.7"/>
        <path d="M 60 125 L 50 145 L 70 145 Z" fill="#F4D03F" opacity="0.8"/>
        <rect x="110" y="135" width="50" height="50" rx="5" fill="#8BC497" opacity="0.7"/>
        <circle cx="135" cy="160" r="12" fill="white" opacity="0.9"/>
        <path d="M 40 220 Q 70 245, 100 220" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.7"/>
        <path d="M 100 220 Q 130 245, 160 220" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.7"/>
        <circle cx="75" cy="270" r="18" fill="#6BA5D8" opacity="0.6"/>
        <circle cx="125" cy="270" r="18" fill="#A67C52" opacity="0.6"/>
      </svg>
    ),

    // Q11: Political debate - speech bubbles
    11: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="20" y="140" width="90" height="70" rx="12" fill="#6BA5D8" opacity="0.7"/>
        <path d="M 50 210 L 40 235 L 70 210" fill="#6BA5D8" opacity="0.7"/>
        <rect x="90" y="180" width="90" height="70" rx="12" fill="#C97064" opacity="0.7"/>
        <path d="M 150 250 L 160 275 L 130 250" fill="#C97064" opacity="0.7"/>
        <line x1="35" y1="160" x2="95" y2="160" stroke="white" strokeWidth="3" opacity="0.6"/>
        <line x1="35" y1="175" x2="85" y2="175" stroke="white" strokeWidth="3" opacity="0.6"/>
        <line x1="35" y1="190" x2="90" y2="190" stroke="white" strokeWidth="3" opacity="0.6"/>
        <line x1="105" y1="200" x2="165" y2="200" stroke="white" strokeWidth="3" opacity="0.6"/>
        <line x1="105" y1="215" x2="155" y2="215" stroke="white" strokeWidth="3" opacity="0.6"/>
        <line x1="105" y1="230" x2="160" y2="230" stroke="white" strokeWidth="3" opacity="0.6"/>
      </svg>
    ),

    // Q12: Sunday peace - coffee cup and nature
    12: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="100" cy="110" r="40" fill="#F4D03F" opacity="0.4"/>
        <path d="M 40 200 Q 70 170, 100 200 Q 130 230, 160 200" fill="#7BA885" opacity="0.7"/>
        <rect x="60" y="210" width="30" height="60" fill="#8B6F47" opacity="0.6"/>
        <circle cx="75" cy="195" r="30" fill="#7BA885" opacity="0.75"/>
        <circle cx="60" cy="185" r="22" fill="#7BA885" opacity="0.7"/>
        <circle cx="90" cy="185" r="22" fill="#7BA885" opacity="0.7"/>
        <rect x="115" y="235" width="45" height="55" rx="5" fill="#C4A57B" opacity="0.8"/>
        <path d="M 160 250 Q 180 250, 180 270 Q 180 290, 160 290" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.7"/>
      </svg>
    ),

    // Q13: Weekend activities - ticket stub
    13: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="30" y="150" width="140" height="120" rx="8" fill="#E8D5C4" opacity="0.85"/>
        <circle cx="30" cy="210" r="12" fill="white" opacity="0.95"/>
        <circle cx="170" cy="210" r="12" fill="white" opacity="0.95"/>
        <line x1="50" y1="180" x2="100" y2="180" stroke="#8B7355" strokeWidth="3" opacity="0.7"/>
        <line x1="50" y1="200" x2="90" y2="200" stroke="#8B7355" strokeWidth="3" opacity="0.7"/>
        <line x1="50" y1="220" x2="95" y2="220" stroke="#8B7355" strokeWidth="3" opacity="0.7"/>
        <line x1="50" y1="240" x2="85" y2="240" stroke="#8B7355" strokeWidth="3" opacity="0.7"/>
        <path d="M 115 200 L 130 175 L 145 200 L 160 175 L 152 225 L 123 225 Z" fill="#6BA5D8" opacity="0.7"/>
      </svg>
    ),

    // Q14: Outdoor Saturday - mountain/trail
    14: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <path d="M 0 280 L 50 160 L 90 200 L 130 130 L 170 180 L 200 280 Z" fill="#8B9AA3" opacity="0.7"/>
        <path d="M 30 280 L 70 190 L 110 230 L 150 170 L 190 220 L 200 280" fill="#7BA885" opacity="0.6"/>
        <circle cx="40" cy="100" r="30" fill="#F4D03F" opacity="0.5"/>
        <path d="M 85 200 L 93 185 L 101 200" fill="white" opacity="0.8"/>
        <path d="M 125 160 L 133 145 L 141 160" fill="white" opacity="0.8"/>
      </svg>
    ),

    // Q15: Exercise setting - running figure
    15: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <circle cx="100" cy="140" r="25" fill="#6BA5D8" opacity="0.8"/>
        <path d="M 100 165 L 100 240" stroke="#6BA5D8" strokeWidth="10" opacity="0.8"/>
        <path d="M 100 190 L 65 225" stroke="#6BA5D8" strokeWidth="8" opacity="0.8"/>
        <path d="M 100 190 L 135 215" stroke="#6BA5D8" strokeWidth="8" opacity="0.8"/>
        <path d="M 100 240 L 75 285" stroke="#6BA5D8" strokeWidth="8" opacity="0.8"/>
        <path d="M 100 240 L 125 280" stroke="#6BA5D8" strokeWidth="8" opacity="0.8"/>
        <ellipse cx="100" cy="295" rx="45" ry="12" fill="#8B9AA3" opacity="0.4"/>
      </svg>
    ),

    // Q16: Unwind - couch
    16: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="20" y="200" width="160" height="70" rx="15" fill="#8B9AA3" opacity="0.8"/>
        <rect x="10" y="185" width="30" height="95" rx="12" fill="#7B8A93" opacity="0.7"/>
        <rect x="160" y="185" width="30" height="95" rx="12" fill="#7B8A93" opacity="0.7"/>
        <rect x="35" y="165" width="130" height="40" rx="8" fill="#A0ADB5" opacity="0.85"/>
        <circle cx="70" cy="185" r="12" fill="#E8D5C4" opacity="0.7"/>
        <circle cx="100" cy="185" r="12" fill="#E8D5C4" opacity="0.7"/>
        <circle cx="130" cy="185" r="12" fill="#E8D5C4" opacity="0.7"/>
      </svg>
    ),

    // Q17: Education quality - graduation cap and book
    17: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="40" y="210" width="120" height="80" rx="5" fill="#6BA5D8" opacity="0.7"/>
        <rect x="48" y="218" width="104" height="64" rx="4" fill="#8BC4D8" opacity="0.6"/>
        <line x1="60" y1="235" x2="140" y2="235" stroke="white" strokeWidth="2.5" opacity="0.7"/>
        <line x1="60" y1="250" x2="140" y2="250" stroke="white" strokeWidth="2.5" opacity="0.7"/>
        <line x1="60" y1="265" x2="130" y2="265" stroke="white" strokeWidth="2.5" opacity="0.7"/>
        <path d="M 100 150 L 40 175 L 100 200 L 160 175 Z" fill="#F4D03F" opacity="0.8"/>
        <rect x="92" y="200" width="16" height="25" fill="#C97064" opacity="0.7"/>
      </svg>
    ),

    // Q18: Family far away - airplane
    18: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <path d="M 150 160 L 120 175 L 40 168 L 32 183 L 110 192 L 70 225 L 62 233 L 105 238 L 98 258 L 115 263 L 130 230 L 168 238 L 175 188 Z" fill="#6BA5D8" opacity="0.8"/>
        <circle cx="155" cy="178" r="12" fill="white" opacity="0.9"/>
        <circle cx="172" cy="178" r="12" fill="white" opacity="0.9"/>
        <path d="M 35 265 Q 50 257, 65 265" stroke="#E8D5C4" strokeWidth="5" fill="none" opacity="0.5"/>
        <path d="M 75" cy="272 Q 90 264, 105 272" stroke="#E8D5C4" strokeWidth="5" fill="none" opacity="0.4"/>
        <path d="M 115 278 Q 130 270, 145 278" stroke="#E8D5C4" strokeWidth="5" fill="none" opacity="0.3"/>
      </svg>
    ),

    // Q19: Flying comfort - airplane in sky
    19: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <ellipse cx="70" cy="130" rx="55" ry="30" fill="#E8D5C4" opacity="0.6"/>
        <ellipse cx="140" cy="155" rx="65" ry="35" fill="#D5C4B4" opacity="0.5"/>
        <ellipse cx="110" cy="180" rx="60" ry="32" fill="#C4B4A4" opacity="0.4"/>
        <path d="M 130 220 L 105 235 L 35 228 L 30 240 L 95 248 L 60 270 L 55 278 L 90 282 L 85 295 L 98 299 L 108 275 L 145 283 L 150 240 Z" fill="#8BC4D8" opacity="0.85"/>
        <circle cx="140" cy="245" r="10" fill="white" opacity="0.95"/>
      </svg>
    ),

    // Q20: Late for meeting - car keys vs metro card
    20: (
      <svg viewBox="0 0 200 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="30" y="190" width="140" height="85" rx="12" fill="#C97064" opacity="0.7"/>
        <rect x="45" y="205" width="110" height="55" rx="8" fill="white" opacity="0.85"/>
        <circle cx="70" cy="232" r="12" fill="#6BA5D8" opacity="0.8"/>
        <circle cx="130" cy="232" r="12" fill="#6BA5D8" opacity="0.8"/>
        <rect x="95" y="210" width="15" height="45" rx="3" fill="#7B8A93" opacity="0.7"/>
        <path d="M 60 155 L 45 140 L 53 132 L 68 147" stroke="#8B7355" strokeWidth="5" fill="none"/>
        <circle cx="59" cy="146" r="12" fill="#F4D03F" opacity="0.7"/>
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
