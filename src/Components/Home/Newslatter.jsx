
import { Banner, Button, Label, TextInput } from "flowbite-react";
import {toast, Toaster} from "react-hot-toast"

const Newslatter = () => {

    const handleSubscribe=(e)=>{
        e.preventDefault();
        toast.success("Thank you for subscribing to our newsletter",{
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
          e.target.reset();
    }

    return (
        <div className="relative ">
            <div className="py-10 flex  justify-center items-center">
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 md:gap-0 items-center">
                    <h1
                        className="pr-0 md:pr-2 mr-auto text-center text-sm font-medium text-gray-500 dark:text-gray-400 md:m-0 md:mb-0 ">
                            Sign up for our newsletter
                    </h1>
                    <TextInput id="email" placeholder="Enter your email" required type="email"/>
                    <Button  type="submit">Subscribe</Button>
                </form>
            </div>

            <div><Toaster position="top-right"/></div>
        </div>
    );
};

export default Newslatter;