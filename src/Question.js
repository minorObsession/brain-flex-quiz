import Options from "./Options";

// function shuffleArray(array) {
//   return array.sort(() => Math.random() - 0.5);
// }

function Question({ question, answer, dispatch, index, numQuestions }) {
  const allAnswers = question.incorrectAnswers.concat(question.correctAnswer);
  const correctAnswer = question.correctAnswer;

  return (
    <div className="question">
      <h3>{question.question.text}</h3>
      <Options
        options={allAnswers}
        correctAnswer={correctAnswer}
        answer={answer}
        dispatch={dispatch}
      />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        {index + 1 === numQuestions ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default Question;
