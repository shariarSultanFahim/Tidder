import { Link, useLocation, useNavigate } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import Lottie from "react-lottie";
import animationData from "../../assets/LoginAnimation.json";
import { Button, Card,TextInput } from "flowbite-react";
import { AiOutlineEye ,AiOutlineEyeInvisible } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import {toast, Toaster} from "react-hot-toast"
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion"

const Register = () => {
  useDocumentTitle(useLocation().pathname.slice(1));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const location = useLocation()
  const navigate = useNavigate()

    if(location.state === null){
        location.state = '/';
    }

  const {registerUser,user, setUser} = useContext(AuthContext)

  const [passVisibility,setPassVisibility] = useState(false);

    const handlePassVisibility = () =>{
        setPassVisibility(!passVisibility);
    }

const formRef = useRef(null);
  const [error,setError] = useState("");

  const handleRegister = (e) =>{
    e.preventDefault()
    const name = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if(password.length==0){
        setError("Enter a valid password");
        return
    }
    if(password.length<6){
        setError("Password must be at least 6 characters");
        return
    }
    if(!/[A-Z]/.test(password)){    
        setError("Must have an Uppercase letter in the password");
        return
    }
    if(!/[a-z]/.test(password)){
        setError("Must have a Lowercase letter in the password");
        return
    }
    if(!/[0-9]/.test(password)){
        setError("Must have a Numaric character in the password");
        return
    }
    if(!/[@.#$!%*?&^]/.test(password)){
        setError("Must have a special character in the password");
        return
    }
    if(password !== confirmPassword){
        setError("Passwords didn't match");
        return
    }
    
    setError('');

    registerUser(email,password)
        .then(result=>{
            updateProfile(result.user,{
                displayName:name,
                photoURL:photoURL
            });
            setUser(result.user);
            toast.success("Registration Successful!",{
              position:"top-center",
              style: {
                border: '1px solid #0E7490',
                padding: '16px',
                color: '#0E7490',
              },
              iconTheme: {
                primary: '#0E7490',
                secondary: '#E5F9FF',
              },
            });
            formRef.current.reset();
        })  
        .catch(error=> setError(error.message));
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
    initial={{opacity: 0, x:-1000}}
    animate={{opacity: 100, x: 0}}
    transition={{
      duration:"2",
      delay:"0"
    }}
    className="min-h-screen py-10 md:flex justify-between items-center mx-auto ">
      <div className="hidden md:grid place-content-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <Card className="md:w-80 lg:w-96 mx-auto  bg-secondary">
      <form onSubmit={handleRegister} ref={formRef} className="flex flex-col gap-4">
        
        <div>
          <TextInput id="name" type="name" name="name" placeholder="Name" required />
        </div>
        
        <div>
          <TextInput id="email1" type="email" name="email" placeholder="name@email.com" required />
        </div>

        <div>
          <TextInput id="photo" type="photo" name="photo"
          placeholder="Photo URL" required />
        </div>

        <div>
          <div className="relative">
            <TextInput id="password" 
                type={passVisibility?'text':'password'}
                name="password"
                placeholder="Password" required />

            <a type="" onClick={handlePassVisibility} className="absolute right-2 top-1/4 text-xl hover:cursor-pointer">
                {passVisibility?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}
            </a>
          </div>
        </div>
        {
            error && <small className='text-red-500'>{error}</small>
        }
        <div>
          <div className="relative">
            <TextInput id="confirmPassword" 
                type={passVisibility?'text':'password'}
                name="confirmPassword"
                placeholder="Confirm Password" required />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p>Already have an account? <span className="text-primary hover:underline"><Link to='/login'>Login</Link></span></p>
        </div>
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className="w-full bg-primary py-2 rounded-xl">Register</motion.button>
      </form>
      </Card>
      
    <div><Toaster position="top-right"/></div>
      
    </motion.div>
  );
};

export default Register;
