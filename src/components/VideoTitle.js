import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VideoTitle = ({ title, overview }) => {
  const movies = useSelector((store) => store.movies);
  if (movies == null) return;
  const mId = movies.nowPlayingMovies[3].id;
  return (
    <div className="w-screen h-[40%] md:h-auto aspect-video absolute pt-[8%] bg-gradient-to-r from-black md:bg-gradient-to-r md:from-black">
      <div className="-mt-2 md:mt-0 px-3 md:px-12 text-white">
        <h1 className="w-2/3 h-[50px] md:w-1/4 text-3xl md:text-6xl mt-[40px] md:mb-[2%] md:ml-5 font-semibold md:font-bold md:mt-0">
          {title}
        </h1>
        <p className=" hidden md:inline-block md:mt-9 md:w-1/4 mb-2 p-6 text-lg">
          {overview}
        </p>
        <br></br>
        <Link to={"/movieDescription/" + mId}>
          <button className="absolute md:static -mt-7 md:top-0 md:ml-[1.8%] py-1 px-2 md:p-3 md:font-semibold text-lg text-black bg-gray-600 md:bg-gray-400 hover:bg-gray-500 rounded-md md:rounded-lg">
            ▶️ Play Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;
