import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Error from "../pages/Error";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/postIdPage";
import Login from "../pages/Login";

// массив маршрутов для построения роутинга
export const privateRoutes = [
  { path: "/", element: <Posts /> },
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> },
  { path: "/posts/:id", element: <PostIdPage /> },
];

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/error", element: <Error /> },
  // { path: "*", element: <Navigate to="/error" /> },
];
