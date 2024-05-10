import { Link, useLocation, useNavigate } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import Lottie from "react-lottie";
import animationData from "../../assets/LoginAnimation.json";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {toast, Toaster} from "react-hot-toast"
import { AiOutlineEye ,AiOutlineEyeInvisible } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { Card,Label, TextInput } from "flowbite-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion"

const Login = () => {
  useDocumentTitle(useLocation().pathname.slice(1));
  
  const [passVisibility,setPassVisibility] = useState(false);
  const {loginUser, googleLogin, githubLogin, setUser, user} = useContext(AuthContext)
  const handlePassVisibility = () =>{
    setPassVisibility(!passVisibility);
  }

  const location = useLocation()
  const navigate = useNavigate()

    if(location.state === null){
        location.state = '/';
    }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleLogin = (e) =>{
    e.preventDefault()
 
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    loginUser(email,password)
        .then(result =>{
            toast.success('Logged in sucessfully!');
        })
        .catch((error) =>{
            toast.error(error.code);
        })
  }
  const handleGoogleLogin = () =>{
    googleLogin()
    .then(result =>{
        setUser(result.user)
        toast.success('Logged in sucessfully!');
    })  
    .catch((error) =>{
        toast.error(error.code);
    })
}
const handleGithubLogin = () =>{
    githubLogin()
    .then(result =>{
        setUser(result.user)
        toast.success('Logged in sucessfully!')
    })
    .catch((error) =>{
        toast.error(error.code);
    })
}
useEffect(()=>{
    if(user){
        setTimeout(()=>{
            navigate(location.state);
        },1000); 
    }
},[user]);  

  return (
    <motion.div 
    initial={{opacity: 0, x:1000}}
    animate={{opacity: 100, x: 0}}
    transition={{
      duration:"2",
      delay:"0"
    }}
    className="min-h-screen py-10 md:flex justify-around items-center gap-8 mx-auto ">
    <Card className="md:w-80 lg:w-96 mx-auto bg-secondary">

    <div className='text-center'>
            <motion.button
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleGoogleLogin} className='p-4 text-3xl'><FcGoogle/></motion.button>
            <motion.button
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleGithubLogin} className='p-4 text-3xl'><AiFillGithub/></motion.button>
    </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
         <div className="flex">
            <div className="w-full border-t border-black"></div>
            <div className="-mt-3 px-2">OR</div>
            <div className="w-full border-t border-black"></div>
         </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" type="email" name="email" placeholder="name@email.com" required />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <div className="relative">
            <TextInput id="password" 
                type={passVisibility?'text':'password'}
                name="password" required />

            <a type="" onClick={handlePassVisibility} className="absolute right-2 top-1/4 text-xl hover:cursor-pointer">
                {passVisibility?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p>New to our site? <span className="text-primary hover:underline"><Link to='/register'>Register</Link></span></p>
        </div>
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className="w-full bg-primary py-2 rounded-xl">Login</motion.button>
      </form>
    </Card>

      <div className="hidden md:grid place-content-center w-1/2">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div><Toaster position="top-right"/></div>
    </motion.div>
  );
};

export default Login;
