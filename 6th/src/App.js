import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    // Clear previous errors.
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        // If error happens we jump to catch block and other lines won't execute.
        throw new Error(`Something went very Wrong!!! ${response.status}`);
      }
      const data = await response.json();
      // fetch API doesn't throw JS error. we do it manually

      // Transforming API data to match our code.
      const transformedMovies = data.results.map((el) => {
        return {
          id: el.episode_id,
          title: el.title,
          openingText: el.opening_crawl,
          releaseDate: el.release_date,
        };
      });
      // Changing state.
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    // When function is finished we changed state.
    setIsLoading(false);
  },[]);
  /*
   By doing this we make sure that we get movies as soon as this App component loads.
  But there is problem here. if we were using some external state in fetchMoviesHandler
  (in this example we dont') this function only runs for the first time that App loads.
  so if that state changes, this function won't run again.
  so we have to add fetchMoviesHandler to dependencies to run it if something changed there.
  if we do that, each time that App is runs, a new version of fetchMoviesHandler
  will be created and causes App to re evaluate. this is an infinite loop.
  so we use useCallback here.
  */
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
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
