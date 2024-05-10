import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {auth} from '../Firebase/Firebase.init'
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () =>{
    return signInWithPopup(auth,googleProvider)
  };
const githubLogin = () =>{
    return signInWithPopup(auth,githubProvider)
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetching BLOG API
  const [blogs, setBlogs] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(()=>{
    axiosSecure.get('/blogs')
    .then(res => setBlogs(res.data))
  });  

  const authInfo = {
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
