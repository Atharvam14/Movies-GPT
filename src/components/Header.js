import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import {
  SUPPORTED_LANGUAGES,
  USER_AVATAR,
} from "../Utils/Constants";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isClicked, setIsClicked] = useState(false);

  const photoClickHandler = () => {
    setIsClicked(!isClicked);
  };

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/Browse");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="w-full">
      <div className="hidden sm:block">
        <div className="z-10 w-full absolute flex justify-between bg-gradient-to-b from-black">
          <div className="w-1/2">
            {/* Change "Movies-GPT" text color to red */}
            <h2 className="md:ml-14 mt-2 text-4xl font-bold text-red-600 mx-4">
              Movies-GPT
            </h2>
          </div>
          {user && (
            <div className="text-red-600">
              <div>
                {showGptSearch && (
                  <select
                    onClick={handleLanguageChange}
                    className="p-2 mr-10 cursor-pointer rounded-lg bg-gray-800 text-white"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  className="p-2 mr-10 my-3 cursor-pointer rounded-lg bg-purple-800 text-white"
                  onClick={handleGptSearchClick}
                >
                  {showGptSearch ? "HomePage" : "GptSearch"}
                </button>

                <img
                  onClick={photoClickHandler}
                  className="inline-block w-[45px] h-[45px] mr-10 my-2 rounded-lg cursor-pointer"
                  alt="user-icon"
                  src={USER_AVATAR}
                />
              </div>
              {isClicked && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSignOut}
                    className="mr-[26px] p-2 bg-gray-700 text-white rounded-lg shadow-lg cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden block bg-gradient-to-b from-black">
        <div className="bg-black w-full flex justify-center">
          {/* Change "Movies-GPT" text color to red */}
          <h1 className="absolute text-4xl font-bold text-red-600 mx-4">
            Movies-GPT
          </h1>
        </div>
        {user && (
          <div className="top-20 bg-inherit z-10 w-full absolute flex justify-between mx-4">
            <div>
              <button
                className="p-2 my-3 cursor-pointer rounded-lg bg-purple-800 text-white"
                onClick={handleGptSearchClick}
              >
                {showGptSearch ? "HomePage" : "GptSearch"}
              </button>
            </div>
            <div>
              {showGptSearch && (
                <select
                  onClick={handleLanguageChange}
                  className="p-2 my-3 cursor-pointer rounded-lg bg-gray-800 text-white"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <img
                onClick={photoClickHandler}
                className="block w-[45px] h-[45px] mr-10 my-2 rounded-lg cursor-pointer"
                alt="user-icon"
                src={USER_AVATAR}
              />
              <div className="">
                {isClicked && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleSignOut}
                      className="absolute mr-6 my-2 p-2 bg-purple-800 text-white rounded-lg shadow-lg cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
