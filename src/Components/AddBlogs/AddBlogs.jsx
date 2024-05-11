import { useContext } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { Button, Card,Label, TextInput } from "flowbite-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion"
import axios from "axios";
import {toast, Toaster} from "react-hot-toast"
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddBlogs = () => {
    useDocumentTitle('Add Blogs');
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)

    const handleAddBlog = async(e) =>{
        e.preventDefault();
        const title = e.target.title.value;
        const photo = e.target.image.value;
        const category = e.target.catagory.value;
        const shortDescription = e.target.shortDescription.value;
        const longDescription = e.target.longDescription.value;
        const wordCount = longDescription.length;
        const userName = user.displayName;
        const email = user.email;
        const profile_img = user.photoURL;
        const blog = {
            title:title,
            image_url:photo,
            category:category,
            short_description:shortDescription,
            long_description:longDescription,
            wordCount:wordCount,
            userName:userName,
            email:email,
            profile_img:profile_img
        }
        try{
            axiosSecure.post('/blogs',blog);

            e.target.reset();
            toast.success('Blog Posted Sucessfully!',{
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
              })
        }catch(error){
            toast.error(error.message,{
                position:"top-center"
            })
        }

    }

    return (
        <motion.div
        initial = {{y:100}}
        animate = {{y:0}}
        transition={{
            duration:"1",
          delay:"0"
        }}
        className="w-[98%] md:w-full mx-auto md:min-h-screen p-10">
        <Card className="w-full mx-auto bg-secondary bg-opacity-50">
            <form onSubmit={handleAddBlog} className="flex flex-col gap-4">
                <h1 className="text-center md:text-3xl lg:text-5xl text-primary">Add Blog</h1>
                
                <div className="flex gap-2 md:gap-4">
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label value="Blog Title" />
                        </div>
                        <TextInput id="title" type="text" name="title" required />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label value="Catagory" />
                        </div>
                        <select name="catagory" id="catagory" className="rounded-md">
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label value="Image URL" />
                    </div>
                    <TextInput id="image" type="text" name="image" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label value="Short Description" />
                    </div>
                    <TextInput id="shortDescription" type="text" name="shortDescription" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label value="Long Description" />
                    </div>
                    <TextInput id="longDescription" type="text" name="longDescription" required />
                </div>

                <Button type="submit">Add Blog</Button>
            </form>
        </Card>
        <div><Toaster position="top-right"/></div>
        </motion.div>
    );
};

export default AddBlogs;