import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../Utils/moviesSlice";
import { POPULAR_MOVIES_API } from "../Utils/Constants";

const usePopularMovies = () => {
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const dispatch = useDispatch();

  const getPoularMovies = async () => {
    const data = await fetch(POPULAR_MOVIES_API, API_OPTIONS);

    const json = await data.json();

    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    if (!popularMovies) getPoularMovies();
  }, []);
};

export default usePopularMovies;
