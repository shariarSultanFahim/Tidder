import { useState } from "react";
import useAxiosSecure, { fetchFeaturedBlogs } from "../../Hooks/useAxiosSecure";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { Table } from "flowbite-react";

const FeaturedBlogs = () => {
    useDocumentTitle('Featured Blogs')

    const {data:featuredBlogs,isLoading} = useQuery({
      queryKey: ["featured-blogs"],
      queryFn: fetchFeaturedBlogs
    })

    if(isLoading){
      return (
        <div className="py-10">
        <motion.div
        initial = {{y:70, opacity:0}}
        animate = {{y:0,opacity: 70}}
        transition={{
          duration:"0.5",
          delay:"0"
        }}
        >
        <h1 className="text-center text-primary mb-10 font-bold text-3xl md:text-4xl lg:text-5xl">Featured Blogs</h1>
        </motion.div>

        <motion.div
        initial={{opacity: 0, y:70}}
        animate={{opacity: 70, y: 0}}
        transition={{
          duration:"0.5",
          delay:"0"
        }}
        className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell className="text-center bg-primary bg-opacity-90 text-white">Serial No.</Table.HeadCell>
              <Table.HeadCell className=" bg-primary bg-opacity-90 text-white">Title</Table.HeadCell>
              <Table.HeadCell className=" bg-primary bg-opacity-90 text-white">Owner</Table.HeadCell>
              <Table.HeadCell className="text-center bg-primary bg-opacity-90 text-white">Owner Photo</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {
                Array.from({ length: 6 }).map((blog, idx)=>
                  <Table.Row className={(idx%2==0)?'bg-secondary bg-opacity-50':'bg-secondary bg-opacity-30'}>
                    <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900">
                    <Skeleton />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900"><Skeleton /></Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900"><Skeleton /></Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#F0F0F0]">
                      </div>
                      </div>
                    </Table.Cell>
                </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </motion.div>
      </div>
      )
    }


    return (
      <div className="py-10">
        <div>
        <h1 className="text-center text-primary mb-10 font-bold text-3xl md:text-4xl lg:text-5xl">Featured Blogs</h1>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell className="text-center bg-primary bg-opacity-90 text-white">Serial No.</Table.HeadCell>
              <Table.HeadCell className=" bg-primary bg-opacity-90 text-white">Title</Table.HeadCell>
              <Table.HeadCell className=" bg-primary bg-opacity-90 text-white">Owner</Table.HeadCell>
              <Table.HeadCell className="text-center bg-primary bg-opacity-90 text-white">Owner Photo</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {
                featuredBlogs.map((blog, idx)=>
                  <Table.Row className={(idx%2==0)?'bg-secondary bg-opacity-50':'bg-secondary bg-opacity-30'}>
                    <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900">
                      {idx+1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">{blog.title}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">{blog.userName}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-center">
                        <img className="w-12 h-12 rounded-full" src={blog.profile_img} alt="Owner Picture" />
                      </div>
                    </Table.Cell>
                </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
};

export default FeaturedBlogs;