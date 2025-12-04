import { Analytics } from '@vercel/analytics/react';
import SwipeCard from './components/SwipeCard';
import MapBackground from './components/MapBackground';
import ResultsPage from './components/ResultsPage';
import LoadingScreen from './components/LoadingScreen';
import RoundBreak from './components/RoundBreak';
import IntroPage from './components/IntroPage';
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
    setGamePhase('roundBreak'); // Show Round 1 screen after restart
  };

  const handleContinueFromBreak = () => {
    setGamePhase('questions');
  };

  const handleStartGame = () => {
    setGamePhase('roundBreak');
  };

  // Show intro page
  if (gamePhase === 'intro') {
    return <IntroPage onStart={handleStartGame} />;
  }

  // Show round break screen
  if (gamePhase === 'roundBreak') {
    const roundNumber = Math.ceil((currentQuestionIndex + 1) / 5);
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
