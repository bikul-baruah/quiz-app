// src/Quiz.jsx
import React, { useState } from "react";
import Timer from "./Timer";  // Import Timer component
import Result from "./Result"; // Import Result component

const Quiz = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = data.questions[currentQuestion];

  // Timer logic when time runs out
  const handleTimeUp = () => {
    if (selectedAnswer === question.correct_answer) {
      setScore(score + 1);
    }
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < data.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === question.correct_answer) {
      setScore(score + 1);
    }
    moveToNextQuestion();
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  if (quizCompleted) {
    return <Result score={score} totalQuestions={data.questions.length} restartQuiz={restartQuiz} />;
  }

  return (
    <div className="quiz">
      <h2>{question.question}</h2>
      <Timer timeLeft={30} onTimeUp={handleTimeUp} /> {/* Timer for 30 seconds */}
      <ul>
        {question.answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerSelection(answer)}
            className={`${selectedAnswer === answer ? "selected" : ""}`}
          >
            {answer}
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
        Next Question
      </button>
    </div>
  );
};

export default Quiz;
