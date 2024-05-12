import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { motion } from "framer-motion"
import { AuthContext } from "../AuthProvider/AuthProvider";
import Skeleton from 'react-loading-skeleton'
import BlogCard from "../BlogCard/BlogCard";

const WishList = () => {
    useDocumentTitle('Wishlist');
    const {user,blogs,wishList, setWishList} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    

    if(!wishList){
      return (
        Array.from({ length: 3 }).map((blog, idx) => (
            <div key={idx} className="max-w-sm ">
                <div className="bg-[#F0F0F0] h-[200px] w-full">
                </div>
                <div className="py-4 flex justify-between">
                    {<Skeleton width={100}/>}
                    <div className="flex justify-between gap-2">
                        {<Skeleton width={50}/>}
                        {<Skeleton width={50}/>}
                    </div>
                </div>
                {<Skeleton count={5}/>}
            </div>
        )))}

      
      
    // const usersWishlist = blogs.filter(blog => wishList.some(wish=>wish.blogId === blog._id));

    
    return (
        <motion.div
        initial={{opacity: 0, y:100}}
        animate={{opacity: 100, y: 0}}
        transition={{
          duration:"1",
          delay:"0"
        }} className="md:min-h-screen">
            <div className="container mx-auto pt-16 pb-10 flex items-center justify-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Wishlist</h1>
            </div>
            {
              (wishList.length == 0)&&
              <h1 className="text-center text-xl font-bold text-primary">Wishlist Empty</h1>
            }

            <div className="pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {
              wishList.map(wish => <BlogCard key={wish._id} blog={wish} />)
            }
            </div>
        </motion.div>
    );
};

export default WishList;