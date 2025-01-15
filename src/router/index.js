import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
