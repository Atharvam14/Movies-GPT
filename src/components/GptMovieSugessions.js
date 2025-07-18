import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSugessions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="p-2 mx-3 md:mx-5   bg-black text-white opacity-85">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSugessions;
