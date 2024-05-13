/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";
import {toast, Toaster} from "react-hot-toast"
import { Tooltip } from "flowbite-react";

const BlogCard = ({ blog }) => {
  
  const id = blog._id;
  const axiosSecure = useAxiosSecure();
  const {user, wishList} = useContext(AuthContext);
  const [wish, setWish] = useState(false);

   if(blog?.isWish===true && wish===false)
    {
      setWish(true);
    }
   if (wishList?.some(wish=>wish.blogId === id) && wish===false)
    {
        setWish(true);
    }


  const handleWish = () => {
    if (!wish) {
      const wishData = {
        blogId:id,
        title: blog.title,
        image_url: blog.image_url,
        category: blog.category,
        short_description: blog.short_description,
        email:user.email,
        isWish: true
      };
      axiosSecure.post("/wishlist", wishData);
      setWish(true);
    } else {
      axiosSecure.delete(`/wishlist/remove?id=${id}`).then(res=>console.log(res.data));
      setWish(false);
    }
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 100, y: 0 }}
      whileHover={{
        scale: 1.1,
      }}
      transition={{
        layout: {
          type: "spring",
        },
        duration: "0.5",
        delay: "0",
      }}
    >
      <div className="bg-white space-y-4 w-[98%] mx-auto md:max-w-md h-full md:h-[560px] lg:h-[510px]  p-2 flex flex-col rounded-md shadow-2xl">
        <div className="h-1/2 w-full overflow-hidden rounded-t-md">
          <img
            className="h-full w-full"
            src={blog.image_url}
            alt="blog image"
          />
        </div>
        <div className="space-y-4 h-1/2 w-full px-2 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{
              duration: "2",
              delay: "0",
            }}
            className="flex justify-between items-center"
          >
            <h1 className="px-4 bg-pink-600 text-white rounded-full">
              {blog.category}
            </h1>
            <div className="flex items-center gap-2">
              <Link
                to={`/details/${blog._id}`}
                className="px-4 bg-primary text-white rounded-full"
              >
                Details
              </Link>
              {wish ? (
                  <button onClick={handleWish} className='text-3xl text-red-700'>
                    <IoHeartSharp />
                  </button>
              ) : (
                !user?
              <Tooltip content="Login to add to wishlist">
                  <h1 className="text-3xl">
                    <IoHeartOutline />
                  </h1>
              </Tooltip>
              :<button onClick={handleWish} className="text-3xl">
              <IoHeartOutline />
            </button>
              )}
            </div>
          </motion.div>
          <motion.h5
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{
              duration: "2",
              delay: "0",
            }}
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {blog.title}
          </motion.h5>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{
              duration: "2",
              delay: "0",
            }}
            className="font-normal text-gray-700 dark:text-gray-400"
          >
            {blog.short_description.split(" ").slice(0, 30).join(" ")}
            <span>. . .</span>{" "}
            <span className="hover:underline hover:text-blue-600">
              <Link to={`/details/${blog._id}`}>Read More</Link>
            </span>
          </motion.p>
        </div>
      </div>
      <div><Toaster position="top-right"/></div>
    </motion.div>
  );
};

export default BlogCard;
