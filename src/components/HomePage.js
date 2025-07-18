import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NETFLIX_BG_IMAGE } from "../Utils/Constants";

const HomePage = () => {
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
  return (
    <div className="">
      <div className="absolute w-full h-screen flex justify-center items-center bg-black opacity-75">
        <div className="  text-white">
          <h1 className="relative left-4 text-3xl md:text-5xl ml-0  md:ml-0 font-extrabold">
            The biggest Indian{" "}
            <span className="left-[-10px] md:ml-0 ">hits. Ready to watch</span>{" "}
            here from <span className="ml-[33%] md:hidden">₹149.</span>
            <br></br>
            <span className="-left-[40%] relative md:left-[540px] md:mt-4  md:right-0 md:inset-x-[43%]">
              ₹149.
            </span>
          </h1>
          <div>
            <h3 className="text-xl  -ml-12 md:ml-[11%] relative inset-x-[29%] font-normal md:text-2xl -mt-4 md:mt-[14px] ">
              Join today. Cancel anytime.
            </h3>
            <h3 className="text-xl -ml-14 md:ml-[12%] relative inset-x-[25%] font-normal md:text-2xl mt-[14px] ">
              Ready to watch? Sign In to Enjoy.
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between absolute  p-3  bg-gradient-to-b from-black ">
        <div>
          <img
            className=" w-48 "
            alt="netflix-logo"
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          ></img>
        </div>
        <div>
          <button className="end-5 md:end-[50px] top-[25px]   w-[100px]  px-4 py-2 absolute text-white opacity-100  bg-red-700 font-bold text-xl cursor-pointer rounded-lg">
            <Link to={"/login"}>Sign In</Link>
          </button>
        </div>
      </div>
      {/* bg-gradient-to-r from-black to-black bg-gradient-to-b from-black to-black */}
      <div className="w-[100%]  ">
        <img
          className="h-screen object-cover md:w-screen md:bg-cover "
          src={NETFLIX_BG_IMAGE}
          alt="Bg-pic-netflix"
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
