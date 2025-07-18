import { useEffect, useRef, useState } from "react";
import SignInValidation from "../Utils/SignInValidation";
import SignUpValidation from "../Utils/SignUpValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { NETFLIX_BG_IMAGE, USER_AVATAR } from "../Utils/Constants";
import Header from "./Header";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [rememberMe, SetRememberMe] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [signInError, setSignInError] = useState(null);

  useEffect(() => {
    const handleTouchMove = (event) => {
      // Prevent default behavior for touchmove event
      event.preventDefault();
    };

    // Add touchmove event listener when the component mounts
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Remove touchmove event listener when the component unmounts
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const clickHandler = () => {
    if (!isSignInForm) {
      const message = SignUpValidation(
        name.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;
    } else {
      const message = SignInValidation(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;
    }

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: { USER_AVATAR },
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/Browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setSignInError(
            "Oops !! Your password does not match with email , please  .. Check your email and password ."
          );
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/Browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setSignInError(
            "Oops !! Your password does not match with email , please  .. Check your email and password ."
          );
        });
    }
  };

  const rememberMeHandler = () => {
    SetRememberMe(!rememberMe);
  };

  const signUpSignInHandler = (e) => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="">
      <Header />
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" md:inset-x-[35%] inset-y-[10%] mt-3 md:mt-0  absolute bg-black w-[101%] h-[90%] md:w-[450px] md:h-[610px] text-white bg-opacity-80  -mr-8 md:mr-0"
      >
        <h1 className=" p-3 mx-[60px] mt-4 text-3xl font-bold m-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="py-7 px-4 ml-[19.5%] md:px-4 md:mx-[73px] w-[240px] md:w-[300px] h-[50px] rounded-md border-[1px] border-slate-700 bg-slate-700 "
            type="Name"
            name="Name"
            placeholder="Full Name"
          ></input>
        )}
        <input
          ref={email}
          className="py-7 px-4  my-5 mx-[73px] w-[240px] md:w-[300px] h-[50px] rounded-md border-[1px] border-slate-700 bg-slate-700"
          type="text"
          name="email"
          placeholder="Your email"
        ></input>
        <input
          ref={password}
          className="py-7 px-4 mx-[73px] w-[240px] md:w-[300px] h-[50px] rounded-md border-[1px] border-slate-700 bg-slate-700 "
          type="password"
          name="password"
          placeholder="password"
        ></input>
        <p className="relative start-[64px] w-[250px] md:w-[300px] text-red-600 font-medium text-lg p-2 pb-1 mt-4">
          {errorMessage}
        </p>
        <p className="relative start-[64px] w-[250px] md:w-[300px] text-red-600 font-medium text-lg p-2 pb-1">
          {errorMessage ? "" : isSignInForm ? signInError : ""}
        </p>

        <button
          className="my-1 mx-[73px] w-[240px] md:w-[300px] h-[50px] rounded-md bg-red-700 border-[1px] border-black"
          onClick={clickHandler}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <input
          className="mb-[24px] -ml-[70px] md:ml-0  relative right-60 md:right:auto inset-y-14 md:inset-x-20 md:inset-y-6 p-2 w-4 h-4 "
          type="checkbox"
          name="Remember-me"
          id="Remember-me"
          value="Remember-me"
          onClick={rememberMeHandler}
          checked={rememberMe}
        ></input>
        <label
          htmlFor="Remember me"
          className="ml-10 md:ml-1 relative inset-y-2  inset-x-[56px] md:inset-x-20
         md:inset-y-6 p-[1px] mx-1 text-lg md:text-xl cursor-pointer"
          onClick={rememberMeHandler}
        >
          Remember me
        </label>
        <p
          className="relative inset-y-1 inset-x-[75px]
         md:inset-y-6 p-[1px] text-lg"
        >
          {isSignInForm ? "New to Netflix ?" : "Already a user ?"}

          <button
            className="text-xl font-bold ml-[2px]"
            onClick={signUpSignInHandler}
          >
            {isSignInForm ? " Sign Up" : " Sign In"}
          </button>
        </p>
      </form>

      <div className="w-[101%]">
        <img
          className=" h-screen object-cover md:w-screen"
          src={NETFLIX_BG_IMAGE}
          alt="Bg-pic-netflix"
        ></img>
      </div>
    </div>
  );
};

export default Login;
