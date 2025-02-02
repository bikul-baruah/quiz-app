import React, { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "./components/Quiz"; // Assuming Quiz is your component that will display the questions

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions from Trivia API
    axios
      .get("https://the-trivia-api.com/api/questions?limit=10") // Adjust limit if you need more questions
      .then((response) => {
        // Format the data to match the Quiz component structure
        const formattedData = response.data.map((item) => ({
          question: item.question,
          answers: [...item.incorrectAnswers, item.correctAnswer].sort(), // Shuffle answers
          correct_answer: item.correctAnswer,
        }));

        // Set the quiz data to state
        setQuizData({ questions: formattedData });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : quizData && quizData.questions ? (
        <Quiz data={quizData} />
      ) : (
        <p>Error: Unable to load quiz data.</p>
      )}
    </div>
  );
};

export default App;
