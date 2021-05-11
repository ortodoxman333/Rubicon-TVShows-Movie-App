import React, { useEffect, useState } from "react";
import { useShows } from "../../contexts/movies-context";
import { useHistory } from "react-router";
import DetailsTVShowsCard from "../../components/Cards/DetailsTVShowsCard";

const TVSHOWS_API = "https://api.themoviedb.org/3/tv";

export function TVShowsDetails({ match }) {
  const history = useHistory();
  const id = parseInt(match.params.id);
  const { show } = useShows();
  const [tv, setShow] = useState(() =>
    show?.find((tv) => tv.id === id)
  );
  const [video, setVideo] = useState();

  const fetchShow = () => {
    return fetch(
      `${TVSHOWS_API}/${id}?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
    ).then((res) => res.json());
  };

  const fetchVideos = (id) => {
    return fetch(
      `${TVSHOWS_API}/${id}/videos?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
    )
      .then((res) => res.json())
      .then((result) => result?.results ?? []); 
  };
  function myFunction ()  {
    fetchShow().then((data) => {
      fetchVideos(data.id).then((videos) => {
        const video = videos?.find((video) => video.type === "Trailer");
        if (video) {
          setVideo(video);
        }
      });
      setShow(data);
    });
  }

  const handleInitialDetails = () => {
    if (!tv) {
    myFunction ();
    } else {
      myFunction ();
    }
  };

  useEffect(() => {
    handleInitialDetails(TVSHOWS_API);
  }, []);

  return (
    <div>
      <div className="tvshow-container">
      <button
          className="back-button"
          onClick={(e) => history.push("/")}
        >
          Back
        </button>
        <DetailsTVShowsCard
          title={tv?.name}
          poster_path={tv?.poster_path}
          overview={tv?.overview}
          vote_average={tv?.vote_average}
          video_id={video?.key}
        />
      </div>
    </div>
  );
}

export default TVShowsDetails;
