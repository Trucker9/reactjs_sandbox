import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
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
  };

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
