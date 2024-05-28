import Options from './Options';
import { useState, useRef, useEffect } from 'react';

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Question({ question, answer, dispatch, index, numQuestions }) {
  const [options, setOptions] = useState([]);

  const correctAnswer = question.correctAnswer;
  console.log(correctAnswer);

  useEffect(() => {
    const allAnswers = question.incorrectAnswers.concat(question.correctAnswer);
    const shuffled = shuffleArray([...allAnswers]);
    setOptions(shuffled);
  }, [question]);

  return (
    <div className="question">
      <h3>{question.question.text}</h3>
      <Options
        correctAnswer={correctAnswer}
        answer={answer}
        dispatch={dispatch}
        // ! aaaaaaaaaaa
        options={options}
      />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        {index + 1 === numQuestions ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default Question;
