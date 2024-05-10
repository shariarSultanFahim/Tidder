/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { motion } from "framer-motion"

const BlogCard = ({ blog }) => {
  return (
    <motion.div
    initial={{opacity: 0, y:100}}
      animate={{opacity: 100, y: 0}}
      whileHover={{
        scale: 1.1
      }}
      transition={{
          layout: {
            type: "spring"
          },
          duration:"1",
          delay:"0"
      }}
      
      >
        <Card className="w-[98%] mx-auto md:max-w-md h-[510px]"
     imgSrc={blog.image_url}>
      <motion.div 
      initial={{opacity: 0, y:100}}
      animate={{opacity: 100, y: 0}}
      transition={{
          duration:"2",
          delay:"0"
      }}
      className="flex justify-between items-center">
        <h1 className="px-4 bg-pink-600 text-white rounded-full">{blog.category}</h1>
        <div className="flex items-center gap-2">
            <Link to='' className="px-4 bg-blue-600 text-white rounded-full">Details</Link>
            <button className="text-3xl"><IoHeartOutline/></button>
            <button className="text-3xl text-red-700"><IoHeartSharp/></button>
        </div>
      </motion.div>
      <motion.h5 
      initial={{opacity: 0, y:100}}
      animate={{opacity: 100, y: 0}}
      transition={{
          duration:"2",
          delay:"0"
      }}
      className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {blog.title}
      </motion.h5>
      <motion.p
      initial={{opacity: 0, y:100}}
      animate={{opacity: 100, y: 0}}
      transition={{
          duration:"2",
          delay:"0"
      }}
      className="font-normal text-gray-700 dark:text-gray-400">
        {blog.short_description}
      </motion.p>
    </Card>
    </motion.div>
  );
};

export default BlogCard;
