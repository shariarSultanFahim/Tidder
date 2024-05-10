/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const BlogCard = ({ blog }) => {
  return (
    <Card className="max-w-sm h-[500px]"
     imgSrc={blog.image_url}>
      <div className="flex justify-between items-center">
        <h1 className="px-4 bg-pink-600 text-white rounded-full">{blog.category}</h1>
        <div className="flex items-center gap-2">
            <Link to='' className="px-4 bg-blue-600 text-white rounded-full">Details</Link>
            <button className="text-3xl"><IoHeartOutline/></button>
            <button className="text-3xl text-red-700"><IoHeartSharp/></button>
        </div>
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {blog.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {blog.short_description}
      </p>
    </Card>
  );
};

export default BlogCard;
