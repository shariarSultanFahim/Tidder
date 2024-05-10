
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Profile = () => {
    useDocumentTitle('Profile')

    const {user} = useContext(AuthContext)
    return (
        <div className="py-8 md:py-16 lg:py-28 ">
            <div className="p-10 flex flex-col md:flex-row gap-8 md:gap-2 justify-between items-center shadow-2xl rounded-lg bg-secondary bg-opacity-50 w-[90%] md:w-10/12 lg:w-3/4 mx-auto">
            <div className="md:w-1/2 grid place-items-center">
                <div className="h-40 w-40 rounded-full overflow-hidden">
                    <img className="h-full w-full" src={user.photoURL}/>
                </div>
                <h1 className="hidden md:block">{user.displayName}</h1>
            </div>
            <div className="md:w-1/2 flex gap-6 items-start">
                <div className="space-y-4 text-lg">
                    <h1>Name:</h1>
                    <h1>Email:</h1>
                    <h1>Email Varified:</h1>
                    <h1>Last Sign In:</h1>
                    <h1>Account Creation Time:</h1>
                </div>
                <div className="space-y-4 text-lg">
                    <h1>{user.displayName}</h1>
                    <h1>{user.email}</h1>
                    <h1>{user.emailVerified?'Yes':'No'}</h1>
                    <h1>{user.metadata.lastSignInTime}</h1>
                    <h1>{user.metadata.creationTime}</h1>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Profile;