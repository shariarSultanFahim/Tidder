import { Outlet, ScrollRestoration } from "react-router-dom";
import Nav from "../Header/Nav";
import TidderFooter from "../Footer/TidderFooter";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ReactLoading from 'react-loading';

const Root = () => {

    const {userLoading} = useContext(AuthContext)

    if(userLoading){
        return (
        <div className="min-h-screen grid place-items-center">
            <ReactLoading type={'spinningBubbles'} color={'#0E7490'} height={100} width={100}/>
        </div>
        )
    }


    return (
        <>
        <ScrollRestoration/>
        <div className="bg-primary">
            <Nav/>
        </div>
        <div className="bg-secondary bg-opacity-30">
        <Outlet/>
        </div>
        <TidderFooter/>
        </>
    );
};

export default Root;