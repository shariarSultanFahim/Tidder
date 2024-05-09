import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

const Error = () => {
    return (
        <div className="md:container mx-auto">
            <div className="h-80 mt-10 ">
                <img className="mx-auto h-full" src="/Lost Tourist-big.png" alt="" />
            </div>
            <div className="mt-10 text-center">
                <h1 className="text-3xl">Page Not Found</h1>
                <p className="mt-4">Sorry, we couldn't find the page you're looking for.</p>
                <Link to="/"><button className="mt-4 text-blue-700 font-bold inline-flex items-center justify-center">
                    <span className="text-3xl">
                        <BsArrowLeftShort></BsArrowLeftShort>
                    </span>
                    Go to Home</button></Link>
            </div>

        </div>
    );
};

export default Error;