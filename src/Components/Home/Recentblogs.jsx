import { useContext } from "react";
import Divider from "./Divider";
import { AuthContext } from "../AuthProvider/AuthProvider";
import BlogCard from "../BlogCard/BlogCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Recentblogs = () => {
   const {blogs} = useContext(AuthContext);

  return (
    <div className="relative bg-primary">
      <Divider loc={"top"} />
      <Divider loc={"bottom"} />

      <div className="pt-12 container mx-auto bg-primary">
        <div className="text-white">
          <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl">
            Recent Posts
          </h1>
          <p className="py-2 text-center opacity-50">
            Dive into our newest thought-provoking content
          </p>
        </div>

        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {
                blogs?
                blogs.slice(0,6).map(blog => <BlogCard key={blog._id} blog={blog} />)
                :
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
                ))
            }
            </div>
      </div>
    </div>
  );
};

export default Recentblogs;