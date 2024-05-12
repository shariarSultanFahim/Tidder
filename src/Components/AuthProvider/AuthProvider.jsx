import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import axios from "axios";
import useAxiosSecure, { fetchBlogs } from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext(null);
const axiosSecure = useAxiosSecure();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      if (currentUser) {
        axiosSecure.post("/jwt", loggedUser).then((res) => {
          // console.log('token response',res.data)
        });
      } else {
        setUser("");
        axiosSecure.post("/logout", loggedUser).then((res) => {});
      }
      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetching BLOG API
  const [blogs, setBlogs] = useState([]);

  // const {data} = useQuery({
  //   queryKey: ["blogs"],
  //   queryFn: fetchBlogs
  // });

  useEffect(()=>{
    axiosSecure.get('/blogs').then(res => setBlogs(res.data))
  })

  const authInfo = {
    blogs,
    setBlogs,
    user,
    setUser,
    userLoading,
    setUserLoading,
    registerUser,
    loginUser,
    googleLogin,
    githubLogin,
    logOut,
    blogs
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
