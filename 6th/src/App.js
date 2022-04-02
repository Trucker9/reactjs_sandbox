import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async (m) => {
    const res = await fetch(
      'https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
        method: 'POST',
        body: JSON.stringify(m),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await res.json();
    console.log(data);
  };
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    // Clear previous errors.
    setError(null);
    try {
      const response = await fetch(
        'https://react-course-4b234-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      );
      if (!response.ok) {
        // If error happens we jump to catch block and other lines won't execute.
        throw new Error(`Something went very Wrong!!! ${response.status}`);
      }
      const data = await response.json();
      // fetch API doesn't throw JS error. we do it manually

      // Transforming API data to match our code.
      const loadedMovies = [];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      // Changing state.
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    // When function is finished we changed state.
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p> No Movies Found !</p>;
  if (error) content = <p> {error} </p>;
  if (isLoading) content = <p>Loading</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
