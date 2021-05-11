import { createContext, useContext, useState } from "react";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
 // const [topMovies, setTopMovies] = useState([]);
  const [show, setShows] = useState([]);

  // Javascript debounce

  return (
    <MoviesContext.Provider
      value={{ movies, setMovies, show, setShows }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const useShows = () => {
  return useContext(MoviesContext);
};
