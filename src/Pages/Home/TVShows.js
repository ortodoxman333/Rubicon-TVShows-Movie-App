import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useShows } from "../../contexts/movies-context";
import TVShowCard from "../../components/Cards/TVShowCard";
import { debounce } from "../../utils/debounce";
import "./TVShows.css";

const FEATURED_API =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/tv?&api_key=04c35731a5ee918f014970082a0088b1&language=en-US&&query=";

export function TVShows({ history }) {
  const { show, setShows } = useShows();
  const [searchTerm, setSearchTerm] = useState("");

  const searchShows = (searchTerm) => {
    return fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        return data.results;
      });
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && searchTerm?.length >= 3) {
      searchShows(searchTerm).then(setShows);
      setSearchTerm("");
    }
  };

  const handleDebouncedSearch = useCallback(
    debounce((searchTerm) => searchShows(searchTerm).then(setShows), 1000),
    []
  );
  const handleOnChange = (e) => {
    if (e.target.value?.length > 2) {
      handleDebouncedSearch(e.target.value);
    } else {
      handleInitialShows(FEATURED_API);
    }
    setSearchTerm(e.target.value);
  };

  const handleInitialShows = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setShows(data.results.slice(0, 10));
      });
  };

  const onClick = (id) => {
    history.push(`/TVShowsDetails/${id}`);
  };

  useEffect(() => {
    handleInitialShows(FEATURED_API);
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
      <div className="tvshow-container">
        {show?.map((tv) => {
          return (
            <TVShowCard
              key={tv.id}
              title={tv.name}
              poster_path={tv.poster_path}
              overview={tv.overview}
              vote_average={tv.vote_average}
              onClick={() => onClick(tv.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TVShows;
