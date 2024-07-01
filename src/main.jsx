import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddBlogs from "./Components/AddBlogs/AddBlogs";
import AllBlogs from "./Components/AllBlogs/AllBlogs";
import BlogDetails from "./Components/AllBlogs/BlogDetails";
import EditBlog from "./Components/AllBlogs/EditBlog";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import Error from "./Components/Error/Error";
import FeaturedBlogs from "./Components/FeaturedBlogs/FeaturedBlogs";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Root from "./Components/Root/Root";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import Register from "./Components/User/Register";
import WishList from "./Components/WishList/WishList";
import "./index.css";

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
      {
        path: '/details/:id',
        element: <BlogDetails/>
      },
      {
        path: '/blogs/edit/:id',
        element: <PrivateRoute>
          <EditBlog/>
          </PrivateRoute>
      }
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
