import React from "react";

import Movie from "./Movie";

const MovieList = ({ movies,handleSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie} />
      ))}
    </ul>
  );
};

export default MovieList;
