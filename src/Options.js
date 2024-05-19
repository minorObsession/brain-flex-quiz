function Options({ options, correctAnswer, answer, dispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option) => (
        <button
          className={`btn ${answer === option ? "answer" : ""}
           ${hasAnswered && option === correctAnswer && "correct"} ${
            hasAnswered && option !== correctAnswer && "wrong"
          } `}
          key={option}
          disabled={hasAnswered}
          onClick={(e) =>
            dispatch({ type: "answered", payload: e.target.textContent })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
