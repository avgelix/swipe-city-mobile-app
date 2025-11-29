import PropTypes from 'prop-types';

/**
 * QuestionIllustration Component
 * 
 * Renders contextual SVG illustrations for each question
 * Matches the soft, minimalist aesthetic of the original snow dome
 */
function QuestionIllustration({ questionId }) {
  const illustrations = {
    // Q1: Snow on winter morning - ORIGINAL SNOW DOME
    1: (
      <svg viewBox="0 0 200 330" className="w-3/5" style={{ height: '330px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
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

    // Q2: Wardrobe/clothing variety - t-shirt icon
    2: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 60 80 L 60 60 L 80 60 Q 80 50, 100 50 Q 120 50, 120 60 L 140 60 L 140 80 L 165 100 L 165 140 L 145 140 L 145 240 L 55 240 L 55 140 L 35 140 L 35 100 Z" fill="#6BA5D8" opacity="0.85"/>
        <rect x="70" y="140" width="60" height="15" fill="white" opacity="0.3"/>
      </svg>
    ),

    // Q3: Thunderstorm - lightning bolt and rain
    3: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="100" cy="90" rx="80" ry="50" fill="#8B9AA3" opacity="0.8"/>
        <ellipse cx="65" cy="105" rx="70" ry="45" fill="#6B7A83" opacity="0.8"/>
        <ellipse cx="135" cy="105" rx="75" ry="48" fill="#7B8A93" opacity="0.75"/>
        <path d="M 100 130 L 65 210 L 90 210 L 65 280 L 135 190 L 105 190 Z" fill="#F4D03F" opacity="0.95" stroke="#E0C030" strokeWidth="2"/>
        <line x1="30" y1="150" x2="20" y2="190" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <line x1="55" y1="160" x2="45" y2="200" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <line x1="150" y1="155" x2="140" y2="195" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <line x1="175" y1="165" x2="165" y2="205" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
      </svg>
    ),

    // Q4: 11 PM Tuesday - moon for nighttime
    4: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 100 40 Q 80 60, 80 100 Q 80 140, 100 160 Q 70 150, 50 120 Q 30 90, 50 60 Q 70 30, 100 40 Z" fill="#F4D03F" opacity="0.9"/>
        <circle cx="65" cy="75" r="8" fill="#E0C030" opacity="0.5"/>
        <circle cx="75" cy="105" r="12" fill="#E0C030" opacity="0.4"/>
        <circle cx="60" cy="100" r="6" fill="#E0C030" opacity="0.5"/>
      </svg>
    ),

    // Q5: Walking to store - footsteps
    5: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="40" cy="250" rx="25" ry="38" fill="#6BA5D8" opacity="0.8" transform="rotate(-15 40 250)"/>
        <ellipse cx="75" cy="210" rx="25" ry="38" fill="#6BA5D8" opacity="0.75" transform="rotate(10 75 210)"/>
        <ellipse cx="105" cy="170" rx="25" ry="38" fill="#6BA5D8" opacity="0.7" transform="rotate(-15 105 170)"/>
        <ellipse cx="140" cy="130" rx="25" ry="38" fill="#6BA5D8" opacity="0.65" transform="rotate(10 140 130)"/>
        <ellipse cx="170" cy="90" rx="25" ry="38" fill="#6BA5D8" opacity="0.6" transform="rotate(-15 170 90)"/>
      </svg>
    ),

    // Q6: Sirens at 3 AM - siren light
    6: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="160" r="25" fill="#C97064" opacity="0.95"/>
        <circle cx="100" cy="160" r="50" stroke="#C97064" strokeWidth="6" fill="none" opacity="0.7"/>
        <circle cx="100" cy="160" r="80" stroke="#C97064" strokeWidth="6" fill="none" opacity="0.45"/>
        <circle cx="100" cy="160" r="110" stroke="#C97064" strokeWidth="6" fill="none" opacity="0.25"/>
      </svg>
    ),

    // Q7: Coffee shop work conversations - coffee cup
    7: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="35" y="140" width="130" height="150" rx="15" fill="#8B6F47" opacity="0.85"/>
        <rect x="45" y="150" width="110" height="130" rx="12" fill="#C4A57B" opacity="0.9"/>
        <path d="M 155 175 Q 185 175, 185 215 Q 185 255, 155 255" stroke="#8B6F47" strokeWidth="10" fill="none" opacity="0.8"/>
        <ellipse cx="100" cy="100" rx="60" ry="15" fill="#5B4A3C" opacity="0.7"/>
        <path d="M 70 60 Q 82 40, 94 55" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.6"/>
        <path d="M 94 55 Q 106 35, 118 50" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.6"/>
      </svg>
    ),

    // Q8: Paycheck/money - dollar sign
    8: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="150" r="70" fill="#7BA885" opacity="0.85"/>
        <text x="100" y="190" fontSize="90" fontWeight="bold" fill="white" textAnchor="middle" opacity="0.95">$</text>
      </svg>
    ),

    // Q9: Friday dinner - plate with utensils
    9: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="100" cy="185" rx="75" ry="12" fill="#C4A57B" opacity="0.6"/>
        <circle cx="100" cy="160" r="65" fill="#E8D5C4" opacity="0.9" stroke="#8B7355" strokeWidth="3"/>
        <line x1="40" y1="100" x2="40" y2="220" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="110" x2="50" y2="110" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="130" x2="50" y2="130" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="150" x2="50" y2="150" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <path d="M 160 100 Q 155 140, 155 160 L 155 220" stroke="#8B7355" strokeWidth="5" fill="none" opacity="0.8"/>
        <ellipse cx="160" cy="95" rx="8" ry="12" fill="#8B7355" opacity="0.8"/>
      </svg>
    ),

    // Q10: Food variety - pizza, taco, sushi
    10: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 100 60 L 40 180 Q 70 195, 100 180 Q 130 195, 160 180 Z" fill="#F4D03F" opacity="0.85" stroke="#C4A030" strokeWidth="3"/>
        <circle cx="80" cy="130" r="8" fill="#C97064" opacity="0.9"/>
        <circle cx="115" cy="145" r="8" fill="#C97064" opacity="0.9"/>
        <circle cx="95" cy="160" r="8" fill="#7BA885" opacity="0.9"/>
        <path d="M 40 220 Q 70 260, 100 220" stroke="#8B6F47" strokeWidth="8" fill="#F4D03F" opacity="0.8"/>
        <rect x="120" y="220" width="60" height="40" rx="3" fill="#C97064" opacity="0.8"/>
        <circle cx="135" cy="235" r="6" fill="white" opacity="0.9"/>
        <circle cx="155" cy="245" r="6" fill="white" opacity="0.9"/>
      </svg>
    ),

    // Q11: Political debate - speech bubbles
    11: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="15" y="120" width="100" height="80" rx="15" fill="#6BA5D8" opacity="0.85"/>
        <path d="M 45 200 L 30 235 L 75 200" fill="#6BA5D8" opacity="0.85"/>
        <line x1="30" y1="145" x2="100" y2="145" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="165" x2="90" y2="165" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="185" x2="95" y2="185" stroke="white" strokeWidth="5" opacity="0.8"/>
        <rect x="85" y="160" width="100" height="80" rx="15" fill="#C97064" opacity="0.85"/>
        <path d="M 155 240 L 170 275 L 125 240" fill="#C97064" opacity="0.85"/>
        <line x1="100" y1="185" x2="170" y2="185" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="100" y1="205" x2="160" y2="205" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="100" y1="225" x2="165" y2="225" stroke="white" strokeWidth="5" opacity="0.8"/>
      </svg>
    ),

    // Q12: Sunday peace - sun and tree
    12: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="90" r="45" fill="#F4D03F" opacity="0.85"/>
        <line x1="100" y1="30" x2="100" y2="50" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="140" y1="50" x2="125" y2="65" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="160" y1="90" x2="140" y2="90" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="140" y1="130" x2="125" y2="115" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="60" y1="50" x2="75" y2="65" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="40" y1="90" x2="60" y2="90" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="60" y1="130" x2="75" y2="115" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <rect x="85" y="210" width="30" height="70" fill="#8B6F47" opacity="0.8"/>
        <circle cx="100" cy="195" r="40" fill="#7BA885" opacity="0.85"/>
        <circle cx="75" cy="180" r="30" fill="#7BA885" opacity="0.8"/>
        <circle cx="125" cy="180" r="30" fill="#7BA885" opacity="0.8"/>
      </svg>
    ),

    // Q13: Weekend activities - event ticket
    13: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="20" y="130" width="160" height="140" rx="10" fill="#E8D5C4" opacity="0.9"/>
        <circle cx="20" cy="200" r="15" fill="white" opacity="0.95"/>
        <circle cx="180" cy="200" r="15" fill="white" opacity="0.95"/>
        <line x1="45" y1="160" x2="110" y2="160" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="45" y1="185" x2="100" y2="185" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="45" y1="210" x2="105" y2="210" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="45" y1="235" x2="95" y2="235" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <text x="145" y="205" fontSize="50" fontWeight="bold" fill="#6BA5D8" opacity="0.8">★</text>
      </svg>
    ),

    // Q14: Outdoor Saturday - mountains
    14: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="70" r="35" fill="#F4D03F" opacity="0.7"/>
        <path d="M 0 280 L 60 140 L 100 190 L 140 100 L 180 160 L 200 280 Z" fill="#8B9AA3" opacity="0.85"/>
        <path d="M 20 280 L 70 170 L 110 215 L 160 135 L 200 195" fill="#7BA885" opacity="0.75"/>
        <path d="M 95 185 L 105 165 L 115 185" fill="white" opacity="0.9"/>
        <path d="M 135 130 L 145 110 L 155 130" fill="white" opacity="0.9"/>
      </svg>
    ),

    // Q15: Exercise setting - running figure
    15: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="100" r="30" fill="#6BA5D8" opacity="0.9"/>
        <path d="M 100 130 L 100 220" stroke="#6BA5D8" strokeWidth="14" opacity="0.9"/>
        <path d="M 100 160 L 55 200" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
        <path d="M 100 160 L 145 190" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
        <path d="M 100 220 L 65 275" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
        <path d="M 100 220 L 135 270" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
      </svg>
    ),

    // Q16: Unwind - couch
    16: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="15" y="180" width="170" height="85" rx="18" fill="#8B9AA3" opacity="0.85"/>
        <rect x="5" y="165" width="35" height="110" rx="15" fill="#7B8A93" opacity="0.8"/>
        <rect x="160" y="165" width="35" height="110" rx="15" fill="#7B8A93" opacity="0.8"/>
        <rect x="30" y="140" width="140" height="45" rx="10" fill="#A0ADB5" opacity="0.9"/>
        <circle cx="65" cy="162" r="15" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="100" cy="162" r="15" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="135" cy="162" r="15" fill="#E8D5C4" opacity="0.8"/>
      </svg>
    ),

    // Q17: Education quality - graduation cap
    17: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 100 100 L 25 140 L 100 180 L 175 140 Z" fill="#F4D03F" opacity="0.9" stroke="#C4A030" strokeWidth="3"/>
        <rect x="88" y="180" width="24" height="40" fill="#C97064" opacity="0.85"/>
        <rect x="70" y="215" width="60" height="8" fill="#C97064" opacity="0.85"/>
      </svg>
    ),

    // Q18: Family far away - airplane
    18: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 165 140 L 130 158 L 35 150 L 25 168 L 120 180 L 70 220 L 60 230 L 110 237 L 100 262 L 120 268 L 140 225 L 185 235 L 193 180 Z" fill="#6BA5D8" opacity="0.9"/>
        <circle cx="170" cy="160" r="15" fill="white" opacity="0.95"/>
        <circle cx="190" cy="160" r="15" fill="white" opacity="0.95"/>
      </svg>
    ),

    // Q19: Flying comfort - clouds
    19: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="60" cy="120" rx="50" ry="35" fill="#E8D5C4" opacity="0.85"/>
        <ellipse cx="110" cy="105" rx="55" ry="38" fill="#D5C4B4" opacity="0.85"/>
        <ellipse cx="150" cy="120" rx="45" ry="32" fill="#C4B4A4" opacity="0.85"/>
        <ellipse cx="70" cy="200" rx="55" ry="38" fill="#E8D5C4" opacity="0.75"/>
        <ellipse cx="125" cy="185" rx="60" ry="40" fill="#D5C4B4" opacity="0.75"/>
        <ellipse cx="165" cy="200" rx="50" ry="35" fill="#C4B4A4" opacity="0.75"/>
      </svg>
    ),

    // Q20: Late for meeting - car
    20: (
      <svg viewBox="0 0 200 300" className="w-full" style={{ height: '280px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="25" y="170" width="150" height="95" rx="15" fill="#C97064" opacity="0.85"/>
        <rect x="40" y="185" width="120" height="65" rx="10" fill="white" opacity="0.9"/>
        <circle cx="60" cy="250" r="18" fill="#6BA5D8" opacity="0.9" stroke="#333" strokeWidth="3"/>
        <circle cx="140" cy="250" r="18" fill="#6BA5D8" opacity="0.9" stroke="#333" strokeWidth="3"/>
        <rect x="90" y="185" width="20" height="65" rx="3" fill="#7B8A93" opacity="0.8"/>
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
