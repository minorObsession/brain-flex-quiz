function WelcomeScreen({ allCategories, dispatch, categories }) {
  function handleToggleCategory(clickedEl) {
    const clickedCategory = clickedEl.textContent.replaceAll(' ', '_');

    if (categories?.has(clickedCategory))
      dispatch({ type: 'removeCategories', payload: clickedCategory });
    else dispatch({ type: 'addCategories', payload: clickedCategory });
  }

  return (
    <div className="start">
      <h2>Practice your knowledge at your own terms!</h2>
      <div className="input-div">
        <h3>
          Choose the number of questions
          <select
            className="select-field"
            defaultValue={10}
            onChange={e =>
              dispatch({ type: 'changeNumQuestions', payload: +e.target.value })
            }
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </h3>

        <h3 className="select-difficulty-h3">
          Choose the difficulty of questions
          <select
            className="select-field"
            defaultValue="medium"
            onChange={e =>
              dispatch({ type: 'changeDifficulty', payload: e.target.value })
            }
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </h3>

        <h3>Select your categories </h3>
        {allCategories.map((category, i) => (
          <button
            className={`btn btn-select ${
              categories.has(category) ? 'selected' : ''
            } `}
            key={category + i}
            onClick={e => handleToggleCategory(e.target)}
          >
            {category.replaceAll('_', ' ')}
          </button>
        ))}
      </div>

      <button
        className="btn btn-start"
        onClick={() => dispatch({ type: 'startQuiz' })}
      >
        START
      </button>
    </div>
  );
}

export default WelcomeScreen;
