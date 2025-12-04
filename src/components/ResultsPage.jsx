import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MapBackground from './MapBackground';
import compassIcon from '../assets/compass.svg';

/**
 * ResultsPage Component
 * 
 * Displays AI-generated city recommendation after user completes all questions.
 * Features:
 * - Loading state while fetching AI recommendation
 * - Error handling with retry option
 * - City match display with explanation
 * - Accept/Refuse actions
 * - Map background showing the matched city
 */
function ResultsPage({ answers, onAccept, onRefuse }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityMatch, setCityMatch] = useState(null);
  const [mapCityIndex, setMapCityIndex] = useState(0);

  // Fast-changing map background while loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setMapCityIndex(prev => (prev + 1) % 30);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const fetchCityRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Calling /api/gemini with answers:', answers);
      
      // Call Vercel serverless function
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ API Error:', errorData);
        
        // Special handling for rate limit errors
        if (response.status === 429 || errorData.error?.includes('429') || errorData.error?.includes('exhausted')) {
          throw new Error('You\'ve tested the game too many times! The AI quota has been reached. Please wait a few minutes and try again, or click "Start Over" to play again later.');
        }
        
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Success! City match:', data);
      setCityMatch(data);
    } catch (err) {
      console.error('💥 Error fetching city recommendation:', err);
      setError(err.message || 'An unexpected error occurred. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCityRecommendation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Fast-changing map background */}
        <MapBackground questionNumber={mapCityIndex} />
        
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              {/* Spinning Compass */}
              <div className="mb-6 flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-24 h-24"
                >
                  <img 
                    src={compassIcon} 
                    alt="Loading" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>
              
              {/* Loading Text */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Finding Your Perfect Match...
              </h2>
              <p className="text-gray-600">
                Our AI is analyzing your preferences to find the ideal city for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    const isRateLimit = error.includes('quota') || error.includes('429') || error.includes('exhausted');
    
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl">{isRateLimit ? '⏱️' : '😞'}</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isRateLimit ? 'Rate Limit Reached' : 'Oops! Something Went Wrong'}
            </h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <div className="flex gap-4">
              {!isRateLimit && (
                <button
                  onClick={fetchCityRecommendation}
                  className="flex-1 bg-zillow-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={onRefuse}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Start Over
              </button>
            </div>
            {isRateLimit && (
              <p className="mt-4 text-sm text-gray-500">
                💡 The free AI tier has a daily limit. Wait 5-10 minutes and try again!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Success state - show city match
  return (
    <div className="relative min-h-screen flex items-center justify-center py-8 overflow-hidden">
      {/* Map Background */}
      {cityMatch?.city && (
        <div className="absolute inset-0 z-0">
          <MapBackground city={cityMatch.city} />
        </div>
      )}
      
      {/* Blue glowing overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 116, 228, 0.4) 0%, rgba(0, 80, 180, 0.6) 100%)',
          backdropFilter: 'blur(2px)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-md mx-auto px-6 flex flex-col items-center justify-start min-h-screen pt-12">
        
        {/* Page Title */}
        <h2 
          className="text-2xl font-light text-white/80 mb-6 text-center italic"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
        >
          Your new home may be...
        </h2>

        {/* City & Country */}
        <div className="text-center mb-8">
          <h1 
            className="text-6xl font-bold text-white mb-3"
            style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }}
          >
            {cityMatch.city}
          </h1>
          <p 
            className="text-2xl text-white/90"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
          >
            {cityMatch.country}
          </p>
        </div>

        {/* Why This City Section */}
        <div className="w-full mb-8 p-6 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl">
          <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider mb-4">
            Why This City?
          </h3>
          <p className="text-white text-base leading-relaxed">
            {cityMatch.explanation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <button
            onClick={onAccept}
            className="w-full bg-white text-zillow-blue py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            ✓ Love It! Let&apos;s Find a Neighborhood
          </button>
          <button
            onClick={onRefuse}
            className="w-full bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-all shadow-lg"
          >
            Not Quite Right - Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

ResultsPage.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onRefuse: PropTypes.func.isRequired,
};

export default ResultsPage;
