import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();
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
    // When function is finished we changed state.
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading</p>}
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
