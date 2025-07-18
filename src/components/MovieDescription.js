import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IMG_CDN_URL, NETFLIX_LOGO_URl } from "../Utils/Constants";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieDescription = () => {
  const { movieId } = useParams();
  useMovieTrailer(movieId);
  const trailer = useSelector((store) => store?.movies?.trailerVideo);

  const movies = useSelector((store) => store?.movies);
  const currentPlayingMovie = movies?.nowPlayingMovies;
  const topRatedMovie = movies?.topRatedMovies;
  const upcomingMovie = movies?.upcomingMovies;
  const popularMovie = movies?.popularMovies;

  let selectedMovie = null;

  if (currentPlayingMovie) {
    selectedMovie = currentPlayingMovie.find(
      (movie) => movie.id === parseInt(movieId, 10)
    );
  }
  if (!selectedMovie && topRatedMovie)
    selectedMovie = topRatedMovie.find(
      (movie) => movie.id === parseInt(movieId, 10)
    );
  if (!selectedMovie && upcomingMovie)
    selectedMovie = upcomingMovie.find(
      (movie) => movie.id === parseInt(movieId, 10)
    );
  if (!selectedMovie && popularMovie)
    selectedMovie = popularMovie.find(
      (movie) => movie.id === parseInt(movieId, 10)
    );

  if (!selectedMovie) return null;

  const { title, overview, release_date, poster_path, vote_average } =
    selectedMovie;

  return (
    <div className="w-full aspect-video absolute  bg-gradient-to-b from-black">
      <div className="flex justify-end">
        <div className="absolute   ">
          <img
            className="mt-[282.5%] w-screen object-cover h-2/6 md:h-[800px] md:mt-[132%] ; md:p2 md:w-[600px] md:mr-16"
            alt="movie poster"
            src={IMG_CDN_URL + poster_path}
          ></img>
        </div>
      </div>

      <div className="ml-[8%] md:mx-10 top-[30%] md:top-[55%] bg-black bg-opacity-65 md:bg-gradient-to-r md:from-black text-white absolute w-10/12 md:w-[45%] md:mt-0 h-[76%] md:h-[40%]">
        <div className=" md:absolute bg-opacity-85 md:bg-transparent ml-4 px-3 pb-2 bg- w-full md:ml-14 md:w-[80%] ">
          <h1 className=" mt-[6%]  text-4xl font-extrabold md:mt-[10%] p-5 shadow-sm">
            {title}
          </h1>
          <h1 className="p-2 text-xl font-semibold">{overview}</h1>
          <h1 className="p-2 text-lg font-medium">⭐ {vote_average}</h1>
          <h1 className="p-2 text-lg font-medium">
            Release-date ➡️ {release_date}
          </h1>
          <button className="bg-red-600 p-4 m-4 mt-3 ml-12 md:ml-6 ml2 font-bold text-xl rounded-lg">
            Watch Now
          </button>
        </div>
      </div>
      <div>
        <div>
          <img
            className="-mt-[70px]  md:mt-0   absolute ml-2 w-44 mx-auto md:mx-0"
            alt="netflix-logo"
            src={NETFLIX_LOGO_URl}
          ></img>
          <Link to={"/Browse"}>
            <button className="absolute bg-red-600 text-white font-bold text-xl px-4 py-2 my-6 ml-[67%] -mt-[16%] md:mt-4  md:ml-[90%] rounded-lg">
              Home
            </button>
          </Link>
        </div>
        <iframe
          className="mt-[25%] md:mt-0 w-screen object-cover md:w-full aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailer?.key +
            "?&autoplay=1&showinfo=0&controls=1&loop=1"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write;  encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className>
          <img
            className="md:h-full h-screen object-cover md:w-screen md:bg-cover  bg-gradient-to-b from-black to-black"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
            alt="Bg-pic-netflix"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
