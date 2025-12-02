import { Analytics } from '@vercel/analytics/react';
import SwipeCard from './components/SwipeCard';
import MapBackground from './components/MapBackground';
import ResultsPage from './components/ResultsPage';
import LoadingScreen from './components/LoadingScreen';
import RoundBreak from './components/RoundBreak';
import useGameState from './hooks/useGameState';
import { questions } from '../questions';

function App() {
  const { 
    currentQuestionIndex, 
    answers, 
    gamePhase, 
    setGamePhase,
    addAnswer, 
    restart 
  } = useGameState();

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    // Store the answer with question context
    const newAnswer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      question: currentQuestion.text,
      answer: answer
    };
    
    addAnswer(newAnswer);
  };

  const handleLoadingComplete = () => {
    setGamePhase('results');
  };

  const handleAccept = () => {
    // TODO: Phase 2 - Move to neighborhood selection
    console.log('User accepted city match - Phase 2 coming soon!');
    alert('Neighborhood selection coming in Phase 2! 🎉');
  };

  const handleRefuse = () => {
    restart();
  };

  const handleContinueFromBreak = () => {
    setGamePhase('questions');
  };

  // Show round break screen
  if (gamePhase === 'roundBreak') {
    const roundNumber = Math.ceil(currentQuestionIndex / 5);
    return (
      <RoundBreak 
        roundNumber={roundNumber}
        onContinue={handleContinueFromBreak}
        questionNumber={currentQuestionIndex}
      />
    );
  }

  // Render different screens based on game phase
  if (gamePhase === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (gamePhase === 'results') {
    return (
      <ResultsPage 
        answers={answers}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
      />
    );
  }

  // Default: Questions phase
  return (
    <>
      <MapBackground questionNumber={currentQuestionIndex} />
      <div className="min-h-screen flex items-center justify-center py-4 relative z-10">
        <div className="w-full">
          <div className="text-center mb-4 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-zillow-blue mb-1" style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7), 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Swipe City
            </h1>
            <p className="text-sm text-gray-900 font-medium leading-tight" style={{
              textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7), 0 1px 3px rgba(0, 0, 0, 0.3)'
            }}>
              Discover your perfect city through our card-swiping adventure
            </p>
          </div>
          
          <SwipeCard 
            key={currentQuestionIndex}
            question={currentQuestion}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
      <Analytics />
    </>
  )
}

export default App
