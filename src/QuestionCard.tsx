import React from 'react';

type Props={
    question:string
    answers:string[]
    callback:Function
    selectedAns:string
    correctAns:string
    setScore:Function
    score:number
}

function QuestionCard(props:Props) {
  function clickHandler(e:React.MouseEvent<HTMLButtonElement>)
  {
    if(props.correctAns === e.currentTarget.textContent)
    {
        props.callback(e.currentTarget.textContent);
        props.setScore(props.score+1);
        e.currentTarget.classList.add('trueAns');
    }
    else
    {
        props.callback(e.currentTarget.textContent);
        e.currentTarget.classList.add('falseAns');
    }

  }

  return (
    <div>
        <p dangerouslySetInnerHTML={{__html:props.question}}></p>
        <div>
            {props.answers.map((ans) =>{
                return(
                    <div key={ans}><button className={props.selectedAns && props.correctAns===ans?"trueAns":""} disabled={props.selectedAns?true:false} onClick={clickHandler} dangerouslySetInnerHTML={{__html:ans}}>
                        </button></div>
                )
            })}
        </div>
    </div>
  );
}

export default QuestionCard;
