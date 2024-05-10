import { useContext } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { Button, Card,Label, TextInput } from "flowbite-react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion"

const AddBlogs = () => {
    useDocumentTitle('Add Blogs');

    const {user} = useContext(AuthContext)

    const handleAddBlog = (e) =>{
        e.preventDefault();
        const title = e.target.title.value;
        const photo = e.target.image.value;
        const catagory = e.target.catagory.value;
        const shortDescription = e.target.shortDescription.value;
        const longDescription = e.target.longDescription.value;
        const userName = user.displayName;
        const email = user.email;

        const blog = {title,photo,catagory,shortDescription,longDescription,userName,email}
        console.log(blog)


    }

    return (
        <motion.div
        initial = {{y:100}}
        animate = {{y:0}}
        transition={{
            duration:"1",
          delay:"0"
        }}
        className="min-h-screen my-10">
        <Card className="w-full mx-auto">
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
        </motion.div>
    );
};

export default AddBlogs;