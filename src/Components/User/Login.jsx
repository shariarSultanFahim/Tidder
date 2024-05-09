import {  useLocation} from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";


const Login = () => {
    useDocumentTitle(useLocation().pathname.slice(1));

    return (
        <div>
            
        </div>
    );
};

export default Login;