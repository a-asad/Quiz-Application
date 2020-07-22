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
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  function startQuiz()
  {
    (async function()
    {
      if(totalQuestions <= 0)
        { 
          alert("Please enter valid amount of Questions!");
          return;
        }
        setisLoading(true);
        setStart(false);
        const {results} = await (await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)).json();
        setQuestions(results);
        setisLoading(false);
        setStart(true);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAns("");
    })();
  }
  function restartQuiz()
  {
    setStart(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAns("");
  }
  function setTotal(e:React.ChangeEvent<HTMLInputElement>)
  {
    setTotalQuestions(Number(e.target.value));
  }
  function setcategory(e:React.ChangeEvent<HTMLSelectElement>)
  {
    setCategory(e.target.value);
  }
  function setdifficulty(e:React.ChangeEvent<HTMLSelectElement>)
  {
    setDifficulty(e.target.value);
  }

  return (
    <div className='app'>
      <div className='topTitle'>Quizzer</div>
      {start?<div className='score'>Score: {score}</div>:null}
      {!start?<div className='optionsBox'>
        <form>
          <div>Number of Questions:</div>
          <input className='formElement' type='number' min='5' defaultValue={totalQuestions} onChange={setTotal} required={true}></input>
          <div>Difficulty:</div>
          <select className='formElement' defaultValue={difficulty} onChange={setdifficulty}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          <div>Category:</div>
          <select className='formElement' defaultValue={category} onChange={setcategory}>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
          </form>
        </div>:null}

      {!start && !currentQuestion?<button className='btn' onClick={startQuiz}>Start Quiz</button>:null}
      {isLoading?<p style={{color:'white'}}>Loading...</p>:null}
      {start?
      <div className='questionCard'>
        <div><b>Question : {currentQuestion+1}/{totalQuestions}</b></div>
      <QuestionCard question = {questions[currentQuestion].question} selectedAns={selectedAns} callback={setSelectedAns} answers=
      {shuffle([...questions[currentQuestion].incorrect_answers,questions[currentQuestion].correct_answer])}
      correctAns={questions[currentQuestion].correct_answer} setScore={setScore} score={score}/></div>:null
      }
      {selectedAns && currentQuestion !== totalQuestions-1?
      <button onClick={showNext} className='btn'>Next</button>:null
      }
      {start && selectedAns && currentQuestion === totalQuestions-1?
      <div><div style={{color:'white'}}>Quiz Over!</div>
        <button onClick={restartQuiz} className='btn'>Restart Quiz</button></div>:null}
    </div>
  );
}

export default App;
