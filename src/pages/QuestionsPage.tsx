import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects } from '../data/mockData';
import { Question, QuizState } from '../types';
import { withSecurityFeatures } from '../utils/securityUtils';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RefreshCw, Home, BookOpen } from 'lucide-react';
import { getQuestions } from '../lib/storage';

const QuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    showingReview: false,
    selectedAnswer: null,
    selectedSubject: ''
  });

  useEffect(() => {
    const loadedQuestions = getQuestions();
    setQuestions(loadedQuestions);
  }, []);

  const filteredQuestions = selectedSubject
    ? questions.filter(q => q.subject === selectedSubject)
    : [];
  
  const currentQuestion: Question | undefined = filteredQuestions[quizState.currentQuestionIndex];
  
  const handleSelectAnswer = (optionIndex: number) => {
    if (!currentQuestion || quizState.answers[quizState.currentQuestionIndex] !== null) {
      return;
    }
    
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = optionIndex;
    
    setQuizState({
      ...quizState,
      answers: newAnswers,
      selectedAnswer: optionIndex
    });
  };
  
  const handleNext = () => {
    if (quizState.currentQuestionIndex < filteredQuestions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex + 1,
        selectedAnswer: null
      });
    } else {
      // Check if all questions are answered
      const unansweredIndex = quizState.answers.findIndex(answer => answer === null);
      if (unansweredIndex !== -1) {
        setShowWarning(true);
        setQuizState({
          ...quizState,
          currentQuestionIndex: unansweredIndex,
          showingReview: false
        });
        return;
      }
      setQuizState({
        ...quizState,
        showingReview: true
      });
    }
  };
  
  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState({
        ...quizState,
        currentQuestionIndex: quizState.currentQuestionIndex - 1,
        selectedAnswer: null
      });
    }
  };
  
  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: Array(filteredQuestions.length).fill(null),
      showingReview: false,
      selectedAnswer: null,
      selectedSubject: selectedSubject || ''
    });
  };

  const handleStartQuiz = (subject: string) => {
    const subjectQuestions = questions.filter(q => q.subject === subject);
    setSelectedSubject(subject);
    setQuizState({
      currentQuestionIndex: 0,
      answers: Array(subjectQuestions.length).fill(null),
      showingReview: false,
      selectedAnswer: null,
      selectedSubject: subject
    });
  };
  
  const goToQuestion = (index: number) => {
    setShowWarning(false);
    setQuizState({
      ...quizState,
      currentQuestionIndex: index,
      showingReview: false,
      selectedAnswer: null
    });
  };

  const goToHome = () => {
    navigate('/');
  };

  const resetQuiz = () => {
    setSelectedSubject(null);
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      showingReview: false,
      selectedAnswer: null,
      selectedSubject: ''
    });
  };
  
  const calculateScore = () => {
    let correctCount = 0;
    quizState.answers.forEach((answer, index) => {
      if (answer === filteredQuestions[index].correctAnswer) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: filteredQuestions.length,
      percentage: Math.round((correctCount / filteredQuestions.length) * 100)
    };
  };

  if (!selectedSubject) {
    const availableSubjects = [...new Set(questions.map(q => q.subject))];

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-400 mb-4">Select a Subject</h1>
            <p className="text-gray-300">Choose a subject to start the quiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map(subject => {
              const subjectQuestions = questions.filter(q => q.subject === subject);
              if (subjectQuestions.length === 0) return null;

              return (
                <button
                  key={subject}
                  onClick={() => handleStartQuiz(subject)}
                  className="p-6 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-emerald-400 group-hover:text-emerald-300">
                      {subject}
                    </h3>
                    <BookOpen className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    {subjectQuestions.length} questions available
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">No Questions Available</h2>
            <p className="text-gray-300 mb-6">There are no questions available for this subject yet.</p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Choose Another Subject
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (quizState.showingReview) {
    const score = calculateScore();
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
          <h1 className="text-3xl font-bold text-emerald-400 mb-6">Quiz Results</h1>
          
          <div className="mb-8 p-6 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Your Score</h2>
                <p className="text-gray-300">You got {score.correct} out of {score.total} questions correct.</p>
              </div>
              <div className="text-5xl font-bold text-emerald-500">{score.percentage}%</div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">Question Summary</h3>
          
          <div className="space-y-6">
            {filteredQuestions.map((question, index) => {
              const userAnswer = quizState.answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div 
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    userAnswer === null
                      ? 'border-gray-600 bg-gray-700'
                      : isCorrect
                        ? 'border-green-600 bg-green-900/20'
                        : 'border-red-600 bg-red-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-white">
                      Question {index + 1}
                    </h4>
                    {userAnswer !== null && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )
                    )}
                  </div>
                  <p className="text-gray-300 mb-3">{question.text}</p>
                  
                  {userAnswer !== null && (
                    <div>
                      <p className="text-sm text-gray-400 mb-1">
                        Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      
                      {!isCorrect && (
                        <p className="text-sm text-gray-400 mb-1">
                          Correct answer: <span className="text-green-400">
                            {question.options[question.correctAnswer]}
                          </span>
                        </p>
                      )}
                      
                      {!isCorrect && (
                        <p className="text-sm text-emerald-400 mt-2">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <button
                    onClick={() => goToQuestion(index)}
                    className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Review Question
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleRestartQuiz}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center transition-colors text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Restart Quiz</span>
            </button>
            <button
              onClick={resetQuiz}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Change Subject</span>
            </button>
            <button
              onClick={goToHome}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors text-sm sm:text-base"
            >
              <Home className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-emerald-400">
              {selectedSubject} Quiz
            </h1>
            <div className="text-gray-400">
              Question {quizState.currentQuestionIndex + 1} of {filteredQuestions.length}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {filteredQuestions.map((_, index) => {
              const isAnswered = quizState.answers[index] !== null;
              return (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-10 h-10 flex items-center justify-center text-sm transition-colors border
                    ${index === quizState.currentQuestionIndex 
                      ? 'bg-emerald-600 text-white border-emerald-500' 
                      : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                        : 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          
          <div className="w-full bg-gray-700 h-2.5 rounded-full">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((quizState.currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {showWarning && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg">
            <p className="text-red-400">Please answer all questions before viewing the results.</p>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-xl font-medium text-white mb-6">{currentQuestion.text}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = quizState.answers[quizState.currentQuestionIndex] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const hasAnswered = quizState.answers[quizState.currentQuestionIndex] !== null;
              const isDisabled = hasAnswered && !isSelected;
              
              let bgClass = isDisabled 
                ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600';
              let borderClass = 'border-gray-600';
              
              if (isSelected && hasAnswered) {
                if (isCorrect) {
                  bgClass = 'bg-green-900/30';
                  borderClass = 'border-green-600';
                } else {
                  bgClass = 'bg-red-900/30';
                  borderClass = 'border-red-600';
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && handleSelectAnswer(index)}
                  disabled={isDisabled}
                  className={`w-full text-left p-4 rounded-lg border ${borderClass} ${bgClass} transition-colors duration-200`}
                >
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-500 mr-3 text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-white">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {quizState.answers[quizState.currentQuestionIndex] !== null && (
          <div className="mb-8 p-4 rounded-lg border">
            {quizState.answers[quizState.currentQuestionIndex] === currentQuestion.correctAnswer ? (
              <div className="bg-green-900/20 border-green-600 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-400 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Correct!
                </h3>
              </div>
            ) : (
              <div className="bg-red-900/20 border-red-600 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-400 mb-2 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Incorrect
                </h3>
                <p className="text-gray-300 mb-2">
                  The correct answer is: <span className="text-emerald-400 font-medium">
                    {currentQuestion.options[currentQuestion.correctAnswer]}
                  </span>
                </p>
                <p className="text-sm text-emerald-400">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={quizState.currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
              quizState.currentQuestionIndex === 0 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={quizState.answers[quizState.currentQuestionIndex] === null}
            className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
              quizState.answers[quizState.currentQuestionIndex] === null
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {quizState.currentQuestionIndex < filteredQuestions.length - 1 ? (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'View Results'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withSecurityFeatures(QuestionsPage);