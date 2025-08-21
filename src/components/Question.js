import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Reset timer when a new question is loaded
  useEffect(() => {
    setTimeRemaining(10);
  }, [question]);

  useEffect(() => {
    // Decrement every second
    const tick = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      }
    }, 1000);

    // Fire once when timeRemaining hits 0
    if (timeRemaining === 0) {
      onAnswered(false);
    }

    return () => clearTimeout(tick);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
