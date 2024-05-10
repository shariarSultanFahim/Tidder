import { useContext } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";
import BlogCard from "../BlogCard/BlogCard";

const AllBlogs = () => {
    useDocumentTitle('All Blogs');
    const {blogs} = useContext(AuthContext);

    return (
        <div className="my-10 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
            {
                blogs?.map(blog => <BlogCard key={blog._id} blog={blog} />)
            }
        </div>
    );
};

export default AllBlogs;