import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import { Root } from "./Root";
import Recommendations from "../src/Recommendations";
import MintBadge from "./MintBadge";
import Welcome from "./Welcome";
import Donate from "./Donate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recommendations",
        element: <Recommendations />,
      },
    ],
  },
  {
    path: "/mintbadge",
    element: <MintBadge />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/donate",
    element: <Donate />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
