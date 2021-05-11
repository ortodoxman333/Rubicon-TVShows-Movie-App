import React from "react";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const DetailsMovieCard = ({ title, poster_path, video_id, overview }) => (
  <div className="movie_details">
    {video_id ? (
      <iframe
        className="videos-movie"
        width="662"
        height="372"
        src={`https://www.youtube.com/embed/${video_id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=740&q=80"
        }
        alt={title}
      />
    )}

    <div className="movie_details-info">
      <h3 className="title_details">Movie title: {title}</h3>
    </div>

    <div className="movie_details-over">
      <h2>Overview:</h2>
      <p>{overview}</p>
    </div>
  </div>
);

export default DetailsMovieCard;
