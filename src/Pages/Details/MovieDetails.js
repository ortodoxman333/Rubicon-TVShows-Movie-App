import React, { useEffect, useState } from "react";
import { useMovies } from "../../contexts/movies-context";
import { useHistory } from "react-router";
import DetailsMovieCard from "../../components/Cards/DetailsMovieCard";

const MOVIE_API = "https://api.themoviedb.org/3/movie";

export function MovieDetails({ match }) {
  const history = useHistory();
  const id = parseInt(match.params.id);
  const { movies } = useMovies();
  const [movie, setMovie] = useState(() =>
    movies?.find((movie) => movie.id === id)
  );
  const [video, setVideo] = useState();

  const fetchMovie = () => {
    return fetch(
      `${MOVIE_API}/${id}?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
    ).then((res) => res.json());
  };

  const fetchVideos = (id) => {
    return fetch(
      `${MOVIE_API}/${id}/videos?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
    )
      .then((res) => res.json())
      .then((result) => result?.results ?? []);
  };

  function myFunction ()  {
    fetchMovie().then((data) => {
      fetchVideos(data.id).then((videos) => {
        const video = videos?.find((video) => video.type === "Trailer");
        if (video) {
          setVideo(video);
        }
      });
      setMovie(data);
    });
  }
  const handleInitialDetails = () => {
    if (!movie) {
    myFunction ();
    } else {
      myFunction ();
    }
  };

  useEffect(() => {
    handleInitialDetails(MOVIE_API);
  }, []);

  return (
    <div>
      <div className="movie-container">
        <button
          className="back-button"
          onClick={(e) => history.push("/Movies")}
        >
          Back
        </button>
        <DetailsMovieCard
          title={movie?.title}
          poster_path={movie?.poster_path}
          overview={movie?.overview}
          vote_average={movie?.vote_average}
          video_id={video?.key}
        />
      </div>
    </div>
  );
}

export default MovieDetails;
