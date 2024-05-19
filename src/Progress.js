function Progress({ numQuestions, index, answer, maxPoints, points }) {
  return (
    <header className="progress">
      <progress
        min={0}
        max={numQuestions}
        value={index + Boolean(answer)}
      ></progress>
      <p>
        Question <strong> {index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points <strong> {points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
