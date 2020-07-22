import React, { useState } from 'react';
import './App.css';
import QuestionCard from './QuestionCard';

type Question={
  category:string;
  type:string;
  difficulty:string;
  question:string;
  correct_answer:string;
  incorrect_answers:string[];
}

function App() {
  const TOTAL_Qs = 10;
  function shuffle(ans:string[])
  {
    return ans.sort();
  }

  function showNext()
  {
    setCurrentQuestion(currentQuestion+1);
    setSelectedAns("");
  }

  const [start, setStart] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAns, setSelectedAns] = useState('');
  const [score, setScore] = useState(0);

  function startQuiz()
  {
    (async function()
    {
        setisLoading(true);
        setStart(false);
        const {results} = await (await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')).json();
        setQuestions(results);
        setisLoading(false);
        setStart(true);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAns("");
    })();

  }
  return (
    <div className='app'>
      <div className='topTitle'>Quizzer</div>
      {!start && !currentQuestion?<button className='btn' onClick={startQuiz}>Start Quiz</button>:null}
      {start?<div className='score'>Score: {score}</div>:null}
      {isLoading?<p style={{color:'white'}}>Loading...</p>:null}
      {start?
      <div className='questionCard'>
        <div><b>Question : {currentQuestion+1}/{TOTAL_Qs}</b></div>
      <QuestionCard question = {questions[currentQuestion].question} selectedAns={selectedAns} callback={setSelectedAns} answers=
      {shuffle([...questions[currentQuestion].incorrect_answers,questions[currentQuestion].correct_answer])}
      correctAns={questions[currentQuestion].correct_answer} setScore={setScore} score={score}/></div>:null
      }
      {selectedAns && currentQuestion !== TOTAL_Qs-1?
      <button onClick={showNext} className='btn'>Next</button>:null
      }
      {selectedAns && currentQuestion === TOTAL_Qs-1?
      <div><div style={{color:'white'}}>Quiz Over!</div>
        <button onClick={startQuiz} className='btn'>Restart Quiz</button></div>:null}
    </div>
  );
}

export default App;
