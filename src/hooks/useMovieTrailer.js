import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTrailerVideo } from "../Utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  console.log(movieId);
  const dispatch = useDispatch();
  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const mainTrailer = json.results.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(mainTrailer));
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
  return <div></div>;
};

export default useMovieTrailer;
