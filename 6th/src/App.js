import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const fetchMoviesHandler = async () => {
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
