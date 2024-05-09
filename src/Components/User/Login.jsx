import { Link, useLocation, useNavigate } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import Lottie from "react-lottie";
import animationData from "../../assets/LoginAnimation.json";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {toast, Toaster} from "react-hot-toast"
import { AiOutlineEye ,AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";


const Login = () => {
  useDocumentTitle(useLocation().pathname.slice(1));
  
  const [passVisibility,setPassVisibility] = useState(false);

  const handlePassVisibility = () =>{
    setPassVisibility(!passVisibility);
  }

  const navigate = useNavigate()

    if(location.state === null){
        location.state = '/profile';
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
    console.log(email,password)
  }
  const handleGoogleLogin = () =>{
    console.log('google')
  }
  const handleGithubLogin = () =>{
    console.log('github')

  }

  return (
    <div className="min-h-screen md:flex justify-around items-center gap-8 mx-auto">
    <Card className="md:w-80 lg:w-96 mx-auto">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        <div className='text-center'>
            <button onClick={handleGoogleLogin} className='p-4 text-3xl'><FcGoogle/></button>
            <button onClick={handleGithubLogin } className='p-4 text-3xl'><AiFillGithub/></button>
         </div>

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
        <Button type="submit">Login</Button>
      </form>
    </Card>

      <div className="hidden md:block w-1/2">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div><Toaster position="top-right"/></div>
    </div>
  );
};

export default Login;
