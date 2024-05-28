import { useEffect, useReducer } from 'react';
import { useLocalStorage } from './useLocalStorage';
import Header from './Header';
import Main from './Main';
import Progress from './Progress';
import Question from './Question';
import Footer from './Footer';
import WelcomeScreen from './WelcomeScreen';
import Error from './Error';
import Loader from './Loader';
import FinishScreen from './FinishScreen';

const initialState = {
  categories: new Set([]),
  questions: [],
  allCategories: [
    'general_knowledge',
    'geography',
    'film_and_tv',
    'sport_and_leisure',
    'history',
    'music',
    'arts_and_literature',
    'science',
  ],
  numQuestions: 10,
  // ! "init", 'error', "loading", "active", "finished"
  status: 'init',
  difficulty: 'medium',
  answer: null,
  index: 0,
  points: 0,
};

function calcPointsPerQ(difficulty) {
  if (difficulty === 'easy') return 10;
  if (difficulty === 'medium') return 20;
  if (difficulty === 'hard') return 30;
}
function reducer(state, action) {
  switch (action.type) {
    case 'errorFetching':
      return { ...state, status: 'error' };

    case 'dataFetched':
      return { ...state, questions: action.payload };

    case 'addCategories':
      return {
        ...state,
        categories: new Set([...state.categories, action.payload]),
      };

    case 'removeCategories':
      return {
        ...state,
        categories: new Set(
          [...state.categories].filter(c => c !== action.payload)
        ),
      };

    case 'changeNumQuestions':
      return { ...state, numQuestions: action.payload };

    case 'changeDifficulty':
      return { ...state, difficulty: action.payload };

    case 'startQuiz':
      if (state.categories.size > 0) return { ...state, status: 'active' };
      else {
        alert('No category selected! You will be quizzed in general knowledge');
        return { ...state, status: 'active' };
      }

    case 'answered':
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctAnswer
            ? calcPointsPerQ(state.difficulty) + state.points
            : state.points,
      };

    case 'nextQuestion':
      if (state.index < state.numQuestions)
        return { ...state, index: state.index++, answer: null };
      else return { ...state, status: 'finished' };

    default:
      throw new Error('Action unknown!');
  }
}

function App() {
  const [
    {
      status,
      answer,
      categories,
      index,
      allCategories,
      difficulty,
      numQuestions,
      questions,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [highscore, setHighscore] = useLocalStorage(0, 'highscore');

  const pointsPerQuestion = calcPointsPerQ(difficulty);
  const maxPoints = pointsPerQuestion * numQuestions;

  useEffect(
    function () {
      async function fetchQuestions() {
        try {
          const categoriesToFetch = [...categories].join(',');
          const response = await fetch(
            `https://the-trivia-api.com/v2/questions?limit=${numQuestions}&categories=${categoriesToFetch}&difficulties=${difficulty}`
          );
          if (!response.ok) throw new Error('Could not get your data...');
          const data = await response.json();
          dispatch({ type: 'dataFetched', payload: data });
        } catch (err) {
          console.error(err);
          dispatch({ type: 'errorFetching' });
        } finally {
        }
      }
      fetchQuestions();
    },
    [difficulty, categories, numQuestions]
  );

  return (
    <div className="app">
      <Header />
      {status === 'init' && (
        <WelcomeScreen
          dispatch={dispatch}
          allCategories={allCategories}
          categories={categories}
        />
      )}
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'active' && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
            />
            <Footer />
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            setHighscore={setHighscore}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
