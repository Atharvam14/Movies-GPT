import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import HomePage from "./HomePage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import MovieDescription from "./MovieDescription";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Browse",
    element: <Browse />,
  },
  {
    path: "/MovieDescription/:movieId",
    element: <MovieDescription />,
  },
  {
    path: "/Browse",
    element: <Browse />,
  },
]);

const AppLayout = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          } else {
            dispatch(removeUser());
          }
        });
      }, [])}
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default AppLayout;
