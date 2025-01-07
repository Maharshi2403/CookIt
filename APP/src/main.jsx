/* eslint-disable no-unused-vars */
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";

import Dashboard from "./Dashboard/homePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard/homePage",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
