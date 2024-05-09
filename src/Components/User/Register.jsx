import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import Lottie from "react-lottie";
import animationData from "../../assets/LoginAnimation.json";

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

  return (
    <div className="min-h-screen md:flex justify-between items-center">
      <div className="hidden md:block">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div>
        
      </div>
      
    </div>
  );
};

export default Register;
