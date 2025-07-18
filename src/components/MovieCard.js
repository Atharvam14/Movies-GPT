import React from "react";
import { IMG_CDN_URL } from "../Utils/Constants";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, movieId }) => {
  if (!posterPath) return;
  return (
    <div className=" w-32 md:w-40  pr-4 cursor-pointer">
      <Link to={"/movieDescription/" + movieId}>
        <img alt="MovieCard" src={IMG_CDN_URL + posterPath} />
      </Link>
    </div>
  );
};

export default MovieCard;
