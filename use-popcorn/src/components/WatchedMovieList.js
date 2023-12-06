import React from "react";
import WatcedMovie from "./WatcedMovie";

const WatchedMovieList = ({ watched ,onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatcedMovie key={movie.imdbID} movie={movie}  onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
