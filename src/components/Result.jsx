// src/Result.jsx
import React from "react";

const Result = ({ score, totalQuestions, restartQuiz }) => {
  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>Your score: {score} / {totalQuestions}</p>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default Result;
