import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const fetchMoviesHandler = () => {
    const movies = fetch('https://swapi.dev/api/films')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
      });
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
