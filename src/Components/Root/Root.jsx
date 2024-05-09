import { Outlet } from "react-router-dom";
import Nav from "../Header/Nav";
import TidderFooter from "../Footer/TidderFooter";

const Root = () => {
    return (
        <>
        <div className="container mx-auto w-[98%] md:w-full">
            <Nav/>
            <Outlet/>
        </div>
        <TidderFooter/>
        </>
    );
};

export default Root;