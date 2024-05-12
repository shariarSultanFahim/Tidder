import { useQuery } from "@tanstack/react-query";
import useAxiosSecure, { fetchBlogDetails, fetchCommentByBlogId } from "../../Hooks/useAxiosSecure";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import Skeleton from 'react-loading-skeleton'
import useDocumentTitle from "../../Hooks/useDocumentTitle";


const BlogDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const blogId = id;
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogdetails", id],
    queryFn: () => fetchBlogDetails(id),
  });

  useDocumentTitle(`${blog?.title}`);

//   Comment not updating without refrashing the page in this methode
//   const {data,isLoading:commentLoadind} = useQuery({
//     queryKey: ["comments", blogId],
//     queryFn: ()=> fetchCommentByBlogId(blogId)
//   });

  useEffect(()=>{
    axiosSecure.get(`/comment?blogId=${blogId}`).then(res=> setComments(res.data))    
    });
  
  

  if (isLoading) {
    return (
        <div className="container mx-auto  pt-6 md:pt-12 space-y-6 min-h-screen p-4">
            <div><Skeleton/></div>
            <div className="w-full h-[450px] bg-[#F0F0F0]  rounded-lg overflow-hidden mx-auto ">
            </div>
            <div className="space-y-4 text-lg">
                <h1><Skeleton count={10}/></h1>
            </div>
        </div>
    )
  }

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const currentDate = new Date();
    const commentTime = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const commentData = {
      blogId: blog._id,
      comment,
      commentTime,
      userName:user.displayName,
      photo: user.photoURL,
    };
    try {
      axiosSecure.post("/comment", commentData);
      e.target.reset();
      toast.success("Comment Posted Sucessfully!", {
        position: "top-center",
        style: {
          border: "1px solid #0E7490",
          padding: "16px",
          color: "#0E7490",
        },
        iconTheme: {
          primary: "#0E7490",
          secondary: "#E5F9FF",
        },
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const showAll = () =>{
    setShowMore(!showMore);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{
        duration: "1",
        delay: "0",
      }}
      className="container mx-auto pt-6 md:pt-12 space-y-6 lg:min-h-screen p-4"
    >
      <div>
        <h1 className="font-bold text-primary text-3xl md:text-4xl lg:text-5xl">
          {blog.title}
        </h1>
      </div>
      <div className="w-full h-[450px]  rounded-lg overflow-hidden mx-auto relative">
        <img
          className="object-cover object-center w-full h-full absolute top-0 left-0"
          src={blog.image_url}
          alt="Blog Image"
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="px-4 bg-pink-600 text-white rounded-full">
          {blog.category}
        </h1>
        <div className="flex items-center gap-2">
          {
            (user.email === blog.email) &&
            <Link to={`/blogs/edit/${id}`} className="bg-primary px-2 rounded-lg text-white">Edit Blog</Link>
          }
          <button className="text-3xl">
            <IoHeartOutline />
          </button>
          <button className="text-3xl text-red-700">
            <IoHeartSharp />
          </button>
          
        </div>
      </div>
      <div className="space-y-4 text-lg">
        <h1>{blog.short_description}</h1>
        <h1>{blog.long_description}</h1>
      </div>
      {/* Comment Section */}
      <section className="w-full space-y-8 p-4 border-2 border-primary rounded-xl shadow-2xl">
        <div>
          <h1 className="text-3xl font-bold text-primary pb-2">Comments</h1>
        </div>
        {user ? (
          user.email !== blog.email ? (
            <form
              onSubmit={handleComment}
              className="w-full h-60 p-4 border border-primary rounded-md shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img className="h-full w-full" src={user.photoURL} alt="" />
                </div>
                <h1 className="text-md font-bold text-primary">
                  {user.displayName}
                </h1>
              </div>
              <div className="py-2">
                <textarea
                  className="w-full rounded-lg "
                  type="text"
                  rows="3"
                  name="comment"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-md inline-flex items-center gap-2"
                >
                  <FaTelegramPlane />
                  Comment
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleComment}
              className="w-full h-60 p-4 border border-primary rounded-md shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img className="h-full w-full" src={user.photoURL} alt="" />
                </div>
                <h1 className="text-md font-bold text-primary">
                  {user.displayName}
                </h1>
              </div>
              <div className="py-2">
                <textarea
                  className="w-full rounded-lg "
                  type="text"
                  rows="1"
                  name="comment"
                  value={"Can not comment on own blog"}
                />
              </div>
              <div className="flex justify-end">
                <h1 className="bg-primary text-white p-2 rounded-md inline-flex items-center gap-2">
                  <FaTelegramPlane />
                  Comment
                </h1>
              </div>
            </form>
          )
        ) : (
          <div className="w-full hover:underline">
            <Link to="/login">Login to comment</Link>
          </div>
        )}
        {
            showMore?
            comments.map(comment => 
                <div key={comment._id} className="w-full p-4 border border-primary rounded-md shadow-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img className="h-full w-full" src={comment.photo} alt="" />
                    </div>
                    <h1 className="text-md font-bold text-primary">
                        {comment.userName}
                    </h1>
                    </div>
                    <div>
                    <h1 className="font-semibold text-primary">{comment.commentTime}</h1>
                    </div>
                </div>
                <div className="py-2">
                    <h1 className="w-full rounded-lg">
                    {comment.comment}
                    </h1>
                </div>
            </div>
            ):
            comments.slice(0,3).map(comment => 
                <div key={comment._id} className="w-full p-4 border border-primary rounded-md shadow-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img className="h-full w-full" src={comment.photo} alt="" />
                    </div>
                    <h1 className="text-md font-bold text-primary">
                        {comment.userName}
                    </h1>
                    </div>
                    <div>
                    <h1 className="font-semibold text-primary">{comment.commentTime}</h1>
                    </div>
                </div>
                <div className="py-2">
                    <h1 className="w-full rounded-lg">
                    {comment.comment}
                    </h1>
                </div>
            </div>
            )
        }
        <div className="flex justify-center ">
            {
            !showMore?
            <button onClick={showAll} className="bg-primary p-2 text-white font-semibold rounded-lg">Show More</button>
            :
            <button onClick={showAll} className="bg-primary p-2 text-white font-semibold rounded-lg">Show Less</button>
            }   
        </div>
      </section>
      <div>
        <Toaster position="top-right" />
      </div>
    </motion.div>
  );
};

export default BlogDetails;
