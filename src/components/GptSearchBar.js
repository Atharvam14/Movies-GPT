import React, { useRef } from "react";
import lang from "../Utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../Utils/openai";
import { API_OPTIONS } from "../Utils/Constants";
import { addGptMovieResult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handelGptSearchClick = async () => {
    const gptQuerry =
      "act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      "only give me names of 5 movies , comma separated like the example result given ahead . example result :The Conjuring,Annabelle,Raaz,It,Nun";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuerry }],
      model: "gpt-3.5-turbo",
    });
    const gptMovies = gptResults?.choices[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className=" pt-[8%] mb-3 flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-40 md:mt-0 mx-1  w-[400px] md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          name="gpt-search-bar"
          className=" p-4 mx-4 my-4 md:m-4  col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handelGptSearchClick}
          className="col-span-3 m-4 px-[2px] py-2 md:px-2 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
