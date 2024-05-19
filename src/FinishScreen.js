function FinishScreen({ points, maxPoints, highscore, setHighscore }) {
  points > highscore && setHighscore(points);

  return (
    <>
      <div className="result">
        <span>
          You scored {points} out of {maxPoints} points!
        </span>
      </div>
      <span className="highscore">Highscore: {highscore}</span>
    </>
  );
}

export default FinishScreen;
