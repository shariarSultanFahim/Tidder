import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Error from "./Components/Error/Error";
import Root from "./Components/Root/Root";
import Home from "./Components/Home/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import AddBlogs from "./Components/AddBlogs/AddBlogs";
import AllBlogs from "./Components/AllBlogs/AllBlogs";
import FeaturedBlogs from "./Components/FeaturedBlogs/FeaturedBlogs";
import WishList from "./Components/WishList/WishList";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Profile from "./Components/User/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/addblogs",
        element: (
          <PrivateRoute>
            <AddBlogs />
          </PrivateRoute>
        ),
      },
      {
        path: "/allblogs",
        element: <AllBlogs />,
      },
      {
        path: "/featuredblogs",
        element: <FeaturedBlogs />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
