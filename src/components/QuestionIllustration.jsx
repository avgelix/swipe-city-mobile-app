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
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 65 40 L 65 20 L 82 20 Q 82 10, 100 10 Q 118 10, 118 20 L 135 20 L 135 40 L 155 60 L 155 100 L 140 100 L 140 200 L 60 200 L 60 100 L 45 100 L 45 60 Z" fill="#6BA5D8" opacity="0.85"/>
        <rect x="75" y="100" width="50" height="15" fill="white" opacity="0.3"/>
      </svg>
    ),

    // Q3: Thunderstorm - lightning bolt and rain
    3: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="100" cy="55" rx="70" ry="45" fill="#8B9AA3" opacity="0.8"/>
        <ellipse cx="70" cy="68" rx="60" ry="40" fill="#6B7A83" opacity="0.8"/>
        <ellipse cx="130" cy="68" rx="60" ry="40" fill="#7B8A93" opacity="0.75"/>
        <path d="M 100 95 L 70 170 L 90 170 L 70 235 L 130 155 L 105 155 Z" fill="#F4D03F" opacity="0.95" stroke="#E0C030" strokeWidth="2"/>
        <line x1="35" y1="115" x2="28" y2="150" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <line x1="55" y1="120" x2="48" y2="155" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <line x1="145" y1="120" x2="138" y2="155" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
        <line x1="165" y1="125" x2="158" y2="160" stroke="#6BA5D8" strokeWidth="5" opacity="0.7"/>
      </svg>
    ),

    // Q4: 11 PM Tuesday - moon for nighttime
    4: (
      <svg viewBox="0 0 200 200" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 120 20 Q 95 45, 95 90 Q 95 135, 120 160 Q 85 148, 60 115 Q 35 82, 60 50 Q 85 17, 120 20 Z" fill="#F4D03F" opacity="0.9"/>
        <circle cx="75" cy="65" r="10" fill="#E0C030" opacity="0.5"/>
        <circle cx="87" cy="100" r="15" fill="#E0C030" opacity="0.4"/>
        <circle cx="68" cy="95" r="8" fill="#E0C030" opacity="0.5"/>
      </svg>
    ),

    // Q5: Walking to store - footsteps
    5: (
      <svg viewBox="0 0 200 200" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="40" cy="180" rx="25" ry="38" fill="#6BA5D8" opacity="0.8" transform="rotate(-15 40 180)"/>
        <ellipse cx="75" cy="140" rx="25" ry="38" fill="#6BA5D8" opacity="0.75" transform="rotate(10 75 140)"/>
        <ellipse cx="105" cy="100" rx="25" ry="38" fill="#6BA5D8" opacity="0.7" transform="rotate(-15 105 100)"/>
        <ellipse cx="140" cy="60" rx="25" ry="38" fill="#6BA5D8" opacity="0.65" transform="rotate(10 140 60)"/>
        <ellipse cx="170" cy="20" rx="25" ry="38" fill="#6BA5D8" opacity="0.6" transform="rotate(-15 170 20)"/>
      </svg>
    ),

    // Q6: Sirens at 3 AM - siren light
    6: (
      <svg viewBox="0 0 200 200" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="100" r="25" fill="#C97064" opacity="0.95"/>
        <circle cx="100" cy="100" r="50" stroke="#C97064" strokeWidth="6" fill="none" opacity="0.7"/>
        <circle cx="100" cy="100" r="80" stroke="#C97064" strokeWidth="6" fill="none" opacity="0.45"/>
        <circle cx="100" cy="100" r="110" stroke="#C97064" strokeWidth="6" fill="none" opacity="0.25"/>
      </svg>
    ),

    // Q7: Coffee shop work conversations - coffee cup
    7: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="40" y="85" width="120" height="145" rx="15" fill="#8B6F47" opacity="0.85"/>
        <rect x="48" y="93" width="104" height="130" rx="12" fill="#C4A57B" opacity="0.9"/>
        <path d="M 152 118 Q 175 118, 175 155 Q 175 192, 152 192" stroke="#8B6F47" strokeWidth="9" fill="none" opacity="0.8"/>
        <ellipse cx="100" cy="50" rx="55" ry="14" fill="#5B4A3C" opacity="0.7"/>
        <path d="M 75 12 Q 85 -5, 95 8" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.6"/>
        <path d="M 95 8 Q 105 -5, 115 8" stroke="#8B6F47" strokeWidth="5" fill="none" opacity="0.6"/>
      </svg>
    ),

    // Q8: Paycheck/money - dollar sign
    8: (
      <svg viewBox="0 0 200 200" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="100" r="80" fill="#7BA885" opacity="0.85"/>
        <text x="100" y="145" fontSize="100" fontWeight="bold" fill="white" textAnchor="middle" opacity="0.95">$</text>
      </svg>
    ),

    // Q9: Friday dinner - plate with utensils
    9: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="100" cy="145" rx="70" ry="12" fill="#C4A57B" opacity="0.6"/>
        <circle cx="100" cy="120" r="60" fill="#E8D5C4" opacity="0.9" stroke="#8B7355" strokeWidth="3"/>
        <line x1="45" y1="65" x2="45" y2="175" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="37" y1="73" x2="53" y2="73" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="37" y1="90" x2="53" y2="90" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="37" y1="107" x2="53" y2="107" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <path d="M 155 65 Q 151 100, 151 120 L 151 175" stroke="#8B7355" strokeWidth="5" fill="none" opacity="0.8"/>
        <ellipse cx="155" cy="60" rx="7" ry="11" fill="#8B7355" opacity="0.8"/>
      </svg>
    ),

    // Q10: Food variety - pizza, taco, sushi
    10: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 100 20 L 40 140 Q 70 155, 100 140 Q 130 155, 160 140 Z" fill="#F4D03F" opacity="0.85" stroke="#C4A030" strokeWidth="3"/>
        <circle cx="80" cy="90" r="8" fill="#C97064" opacity="0.9"/>
        <circle cx="115" cy="105" r="8" fill="#C97064" opacity="0.9"/>
        <circle cx="95" cy="120" r="8" fill="#7BA885" opacity="0.9"/>
        <path d="M 40 180 Q 70 220, 100 180" stroke="#8B6F47" strokeWidth="8" fill="#F4D03F" opacity="0.8"/>
        <rect x="120" y="180" width="60" height="40" rx="3" fill="#C97064" opacity="0.8"/>
        <circle cx="135" cy="195" r="6" fill="white" opacity="0.9"/>
        <circle cx="155" cy="205" r="6" fill="white" opacity="0.9"/>
      </svg>
    ),

    // Q11: Political debate - speech bubbles
    11: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="15" y="60" width="100" height="80" rx="15" fill="#6BA5D8" opacity="0.85"/>
        <path d="M 45 140 L 30 175 L 75 140" fill="#6BA5D8" opacity="0.85"/>
        <line x1="30" y1="85" x2="100" y2="85" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="105" x2="90" y2="105" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="30" y1="125" x2="95" y2="125" stroke="white" strokeWidth="5" opacity="0.8"/>
        <rect x="85" y="100" width="100" height="80" rx="15" fill="#C97064" opacity="0.85"/>
        <path d="M 155 180 L 170 215 L 125 180" fill="#C97064" opacity="0.85"/>
        <line x1="100" y1="125" x2="170" y2="125" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="100" y1="145" x2="160" y2="145" stroke="white" strokeWidth="5" opacity="0.8"/>
        <line x1="100" y1="165" x2="165" y2="165" stroke="white" strokeWidth="5" opacity="0.8"/>
      </svg>
    ),

    // Q12: Sunday peace - sun and tree
    12: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="60" r="45" fill="#F4D03F" opacity="0.85"/>
        <line x1="100" y1="0" x2="100" y2="20" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="140" y1="20" x2="125" y2="35" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="160" y1="60" x2="140" y2="60" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="140" y1="100" x2="125" y2="85" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="60" y1="20" x2="75" y2="35" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="40" y1="60" x2="60" y2="60" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <line x1="60" y1="100" x2="75" y2="85" stroke="#F4D03F" strokeWidth="6" opacity="0.85"/>
        <rect x="85" y="170" width="30" height="70" fill="#8B6F47" opacity="0.8"/>
        <circle cx="100" cy="155" r="40" fill="#7BA885" opacity="0.85"/>
        <circle cx="75" cy="140" r="30" fill="#7BA885" opacity="0.8"/>
        <circle cx="125" cy="140" r="30" fill="#7BA885" opacity="0.8"/>
      </svg>
    ),

    // Q13: Weekend activities - event ticket
    13: (
      <svg viewBox="0 0 200 180" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="20" y="20" width="160" height="140" rx="10" fill="#E8D5C4" opacity="0.9"/>
        <circle cx="20" cy="90" r="15" fill="white" opacity="0.95"/>
        <circle cx="180" cy="90" r="15" fill="white" opacity="0.95"/>
        <line x1="45" y1="50" x2="110" y2="50" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="45" y1="75" x2="100" y2="75" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="45" y1="100" x2="105" y2="100" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <line x1="45" y1="125" x2="95" y2="125" stroke="#8B7355" strokeWidth="5" opacity="0.8"/>
        <text x="145" y="95" fontSize="50" fontWeight="bold" fill="#6BA5D8" opacity="0.8">★</text>
      </svg>
    ),

    // Q14: Outdoor Saturday - mountains
    14: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="40" r="35" fill="#F4D03F" opacity="0.7"/>
        <path d="M 0 240 L 60 100 L 100 150 L 140 60 L 180 120 L 200 240 Z" fill="#8B9AA3" opacity="0.85"/>
        <path d="M 20 240 L 70 130 L 110 175 L 160 95 L 200 155" fill="#7BA885" opacity="0.75"/>
        <path d="M 95 145 L 105 125 L 115 145" fill="white" opacity="0.9"/>
        <path d="M 135 90 L 145 70 L 155 90" fill="white" opacity="0.9"/>
      </svg>
    ),

    // Q15: Exercise setting - running figure
    15: (
      <svg viewBox="0 0 200 240" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <circle cx="100" cy="52" r="28" fill="#6BA5D8" opacity="0.9"/>
        <path d="M 100 80 L 100 165" stroke="#6BA5D8" strokeWidth="14" opacity="0.9"/>
        <path d="M 100 110 L 62 145" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
        <path d="M 100 110 L 138 137" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
        <path d="M 100 165 L 70 218" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
        <path d="M 100 165 L 130 215" stroke="#6BA5D8" strokeWidth="12" opacity="0.9"/>
      </svg>
    ),

    // Q16: Unwind - couch
    16: (
      <svg viewBox="0 0 200 180" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="20" y="82" width="160" height="80" rx="16" fill="#8B9AA3" opacity="0.85"/>
        <rect x="12" y="68" width="30" height="100" rx="13" fill="#7B8A93" opacity="0.8"/>
        <rect x="158" y="68" width="30" height="100" rx="13" fill="#7B8A93" opacity="0.8"/>
        <rect x="32" y="45" width="136" height="42" rx="9" fill="#A0ADB5" opacity="0.9"/>
        <circle cx="65" cy="65" r="14" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="100" cy="65" r="14" fill="#E8D5C4" opacity="0.8"/>
        <circle cx="135" cy="65" r="14" fill="#E8D5C4" opacity="0.8"/>
      </svg>
    ),

    // Q17: Education quality - graduation cap
    17: (
      <svg viewBox="0 0 200 180" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 100 30 L 25 70 L 100 110 L 175 70 Z" fill="#F4D03F" opacity="0.9" stroke="#C4A030" strokeWidth="3"/>
        <rect x="88" y="110" width="24" height="40" fill="#C97064" opacity="0.85"/>
        <rect x="70" y="145" width="60" height="8" fill="#C97064" opacity="0.85"/>
      </svg>
    ),

    // Q18: Family far away - airplane
    18: (
      <svg viewBox="0 0 200 200" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <path d="M 155 65 L 125 80 L 40 73 L 32 88 L 115 98 L 72 133 L 64 142 L 108 148 L 100 170 L 117 175 L 135 137 L 175 145 L 182 100 Z" fill="#6BA5D8" opacity="0.9"/>
        <circle cx="160" cy="82" r="13" fill="white" opacity="0.95"/>
        <circle cx="178" cy="82" r="13" fill="white" opacity="0.95"/>
      </svg>
    ),

    // Q19: Flying comfort - clouds
    19: (
      <svg viewBox="0 0 200 180" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="65" cy="50" rx="45" ry="32" fill="#E8D5C4" opacity="0.85"/>
        <ellipse cx="110" cy="38" rx="48" ry="35" fill="#D5C4B4" opacity="0.85"/>
        <ellipse cx="148" cy="50" rx="40" ry="30" fill="#C4B4A4" opacity="0.85"/>
        <ellipse cx="70" cy="128" rx="48" ry="35" fill="#E8D5C4" opacity="0.75"/>
        <ellipse cx="120" cy="115" rx="52" ry="37" fill="#D5C4B4" opacity="0.75"/>
        <ellipse cx="160" cy="128" rx="45" ry="32" fill="#C4B4A4" opacity="0.75"/>
      </svg>
    ),

    // Q20: Late for meeting - car
    20: (
      <svg viewBox="0 0 200 180" className="w-full" style={{ height: '320px' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="55" width="140" height="90" rx="14" fill="#C97064" opacity="0.85"/>
        <rect x="42" y="68" width="116" height="62" rx="9" fill="white" opacity="0.9"/>
        <circle cx="62" cy="130" r="17" fill="#6BA5D8" opacity="0.9" stroke="#333" strokeWidth="3"/>
        <circle cx="138" cy="130" r="17" fill="#6BA5D8" opacity="0.9" stroke="#333" strokeWidth="3"/>
        <rect x="93" y="68" width="18" height="62" rx="3" fill="#7B8A93" opacity="0.8"/>
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
