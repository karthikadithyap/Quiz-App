import React, { useState } from 'react';
import quizData from './quizData.json'; // Import JSON file for quiz data
import './QuizApp.css'; // Import CSS file for styling

const QuizApp = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(10).fill(null));
    setShowResult(false);
    setTotalMarks(0);
  };

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = () => {
    const marks = userAnswers.reduce((total, userAnswer, index) => {
      if (userAnswer === quizData[selectedSubject][index].answer) {
        return total + 1;
      }
      return total;
    }, 0);
    setTotalMarks(marks);
    setShowResult(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(10).fill(null));
    setShowResult(false);
    setTotalMarks(0);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-heading">Quiz Application</h1>
      <div className="subject-selection">
        <h2>Please Select Your Test Subject:</h2>
        <ul className="subject-list">
          {Object.keys(quizData).map((subject) => (
            <li key={subject}>
              <button className="subject-button" onClick={() => handleSubjectSelect(subject)}>{subject}</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedSubject && !showResult && (
        <div className="quiz-question">
          <h3 className="question-count">Question {currentQuestionIndex + 1} of 10</h3>
          <h4 className="question">{quizData[selectedSubject][currentQuestionIndex].question}</h4>
          <ul className="options-list">
            {quizData[selectedSubject][currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button
                  className={`option-button ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className="button-group">
            <button className="navigation-button" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
            {currentQuestionIndex === 9 ? (
              <button className="navigation-button" onClick={handleSubmit}>Submit</button>
            ) : (
              <button className="navigation-button" onClick={handleNext}>Next</button>
            )}
          </div>
        </div>
      )}
      {showResult && (
        <div className="quiz-result">
          <h2 className="result-heading">Quiz Result</h2>
          <p className="result-text">You scored {totalMarks} out of 10.</p>
          {totalMarks > 9 && <p className="performance-message">Outstanding performance!</p>}
    {totalMarks >= 7 && totalMarks <= 9 && <p className="performance-message">Good job!</p>}
    {totalMarks < 6 && <p className="performance-message">Better luck next time!</p>}
          <button className="retake-button" onClick={handleRetakeQuiz}>Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
