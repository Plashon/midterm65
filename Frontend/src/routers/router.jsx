import { createBrowserRouter } from "react-router-dom";
import { Children, lazy } from "react";
import Layout from "../components/Layout";
const Home = lazy(() => import("./../pages/Home"));
const Add = lazy(() => import("./../pages/AddBook"));
const Edit = lazy(() => import("./../pages/EditBook"));
const BookDetail = lazy(() => import("../pages/BookDetail"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/detail/:id",
        element: <BookDetail />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
