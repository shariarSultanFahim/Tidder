
import Divider from "./Divider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Element} from 'react-scroll';
import { fetchFeaturedBlogs } from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { Card, Dropdown } from "flowbite-react";

const TopAuthor = () => {
   const {data:blogs} = useQuery({
    queryKey: ["featured-blogs"],
    queryFn: fetchFeaturedBlogs
  })

  return (
    <div className="relative bg-primary">
      <Divider loc={"top"} />

      <Element id="recent-post"/>
      <div id="recent-post" className="pt-12 container mx-auto bg-primary">
        <div className="text-white">
          <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl">
            Top Author
          </h1>
          <p className="py-2 text-center opacity-50">
            Check out our top author's content
          </p>
        </div>

        <div className="py-20 grid grid-cols-1 place-items-center">
            {
                blogs?
                blogs.slice(0,1).map(blog => 
                    <Card className="max-w-sm rounded-3xl">
                    <div className="flex flex-col items-center pb-10">
                      <img className="w-60 h-60 rounded-full overflow-hidden" src={blog.profile_img} alt="" />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{blog.userName}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{blog.email}</span>
                    </div>
                  </Card>
                )
                :
                <div className="max-w-sm ">
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
                
            }
            </div>
      </div>
    </div>
  );
};

export default TopAuthor;
