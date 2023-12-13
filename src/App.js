import { useState } from "react";
import "./App.css";

const generateRandomNumber = () => Math.floor(Math.random() * 10);

const generateQuestion = () => {
  const num1 = generateRandomNumber();
  const num2 = generateRandomNumber();
  return {
    question: `${num1} + ${num2} = ?`,
    answer: num1 + num2,
  };
};

const checkAnswer = (userAnswer, correctAnswer) => {
  return parseInt(userAnswer, 10) === correctAnswer;
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const answerSubmit = () => {
    if (checkAnswer(userAnswer, currentQuestion.answer)) {
      setResult("Correct!");
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      setResult(`Incorrect. The correct answer is ${currentQuestion.answer}`);
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
  };

  const handleNumberClick = (number) => {
    setUserAnswer(userAnswer + number);
  };

  const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
    <button key={number} onClick={() => handleNumberClick(number.toString())}>
      {number}
    </button>
  ));

  return (
    <div className="App">
      <h1>Math Quiz: Add the Numbers</h1>
      <p>{currentQuestion.question}</p>
      <h2>{userAnswer}</h2>
      <div>{numberButtons}</div>
      <button onClick={answerSubmit}>Submit</button>

      {result && <p>{result}</p>}

      <h3>Scoreboard</h3>
      <p>Correct Answers: {score.correct}</p>
      <p>Incorrect Answers: {score.incorrect}</p>
    </div>
  );
}

export default App;
