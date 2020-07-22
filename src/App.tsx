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
    return ans.sort(()=>Math.random());
  }

  function showNext()
  {
    if(currentQuestion !== TOTAL_Qs)
      setCurrentQuestion(currentQuestion+1);
    else
    {
      setQuizOver(true);
    }
    setSelectedAns("");
  }

  const [start, setStart] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAns, setSelectedAns] = useState('');
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  function startQuiz()
  {
    (async function()
    {
        setisLoading(true);
        const {results} = await (await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')).json();
        setQuestions(results);
        setisLoading(false);
        setStart(true);
    })();

  }
  return (
    <div style={{textAlign:'center'}}>
      <div>Quiz App</div>
      <div>Score: {score}</div>
      {!start?<button onClick={startQuiz}>Start Quiz</button>:null}
      {quizOver?<button onClick={startQuiz}>Restart Quiz</button>:null}
      {isLoading?<p>Loading</p>:null}
      {start?
      <QuestionCard question = {questions[currentQuestion].question} selectedAns={selectedAns} callback={setSelectedAns} answers=
      {shuffle([...questions[currentQuestion].incorrect_answers,questions[currentQuestion].correct_answer])}
      correctAns={questions[currentQuestion].correct_answer} setScore={setScore} score={score}/>:null
      }
      {selectedAns?
      <button onClick={showNext}>Next</button>:null
      }
    </div>
  );
}

export default App;
