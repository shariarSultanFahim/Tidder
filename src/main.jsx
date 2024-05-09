import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Error from "./Components/Error/Error";
import Root from "./Components/Root/Root";
import Home from "./Components/Home/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<Error/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element:<Login/>
      },
      {
        path: '/register',
        element:<Register/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
