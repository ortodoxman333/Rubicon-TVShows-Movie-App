import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useMovies } from "../../contexts/movies-context";
import MovieCard from "../../components/Cards/MovieCard";
import { debounce } from "../../utils/debounce";
import "./Movies.css";

const FEATURED_API =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

export function Movies({ history }) {
  const { movies, setMovies } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = (searchTerm) => {
    return fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        return data.results;
      });
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && searchTerm?.length >= 3) {
      searchMovies(searchTerm).then(setMovies);
      setSearchTerm("");
    }
  };

  const handleDebouncedSearch = useCallback(
    debounce((searchTerm) => searchMovies(searchTerm).then(setMovies), 1000),
    []
  );

  const handleOnChange = (e) => {
    if (e.target.value?.length > 2) {
      handleDebouncedSearch(e.target.value);
    } else {
      handleInitialMovies(FEATURED_API);
    }
    setSearchTerm(e.target.value);
  };

  const handleInitialMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results.slice(0, 10));
      });
  };

  const onClick = (id) => {
    history.push(`/MovieDetails/${id}`);
  };

  useEffect(() => {
    handleInitialMovies(FEATURED_API);
  }, []);

  return (
    <div>
      <div>
        <SearchInput
          value={searchTerm}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
        />
      </div>
      <div className="movie-container">
        {movies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              overview={movie.overview}
              vote_average={movie.vote_average}
              onClick={() => onClick(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
