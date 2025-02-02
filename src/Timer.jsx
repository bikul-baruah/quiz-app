// src/Timer.jsx
import React, { useState, useEffect } from "react";

const Timer = ({ timeLeft, onTimeUp }) => {
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, [time, onTimeUp]);

  return (
    <div className="timer">
      <h3>Time Left: {time}s</h3>
    </div>
  );
};

export default Timer;
