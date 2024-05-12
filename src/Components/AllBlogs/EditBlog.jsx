import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import useAxiosSecure, { fetchBlogDetails } from "../../Hooks/useAxiosSecure";
import { toast, Toaster } from "react-hot-toast";
import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthProvider/AuthProvider";
import ReactLoading from "react-loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const EditBlog = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blogdetails", id],
    queryFn: () => fetchBlogDetails(id),
  });

  useDocumentTitle(`Edit - ${blog?.title}`);

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#0E7490"}
          height={100}
          width={100}
        />
      </div>
    );
  }

  const handleEditBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const photo = e.target.image.value;
    const category = e.target.catagory.value;
    const shortDescription = e.target.shortDescription.value;
    const longDescription = e.target.longDescription.value;
    const wordCount = longDescription.length;
    const userName = user.displayName;
    const email = user.email;
    const profile_img = user.photoURL;
    const updatedData = {
      title: title,
      image_url: photo,
      category: category,
      short_description: shortDescription,
      long_description: longDescription,
      wordCount: wordCount,
      userName: userName,
      email: email,
      profile_img: profile_img,
    };
    try {
      axiosSecure.patch(`/blog/edit?id=${id}`, updatedData);

      toast.success("Blog Updated Sucessfully!", {
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

  const handleDeleteBlog = () => {
    toast.success('Blog Deleted!',{
        position:"top-center",
        style: {
          border: '1px solid #0E7490',
          padding: '16px',
          color: '#0E7490',
        },
        iconTheme: {
          primary: '#0E7490',
          secondary: '#E5F9FF',
        },
      })
      
    navigate("/");

    axiosSecure
      .delete(`/blog/delete?id=${id}`);

       
  };

  const submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: handleDeleteBlog,
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        duration: "1",
        delay: "0",
      }}
      className="w-[98%] md:w-full mx-auto md:min-h-screen p-10"
    >
      <Card className="w-full mx-auto bg-secondary bg-opacity-50">
        <form onSubmit={handleEditBlog} className="flex flex-col gap-4">
          <h1 className="text-center md:text-3xl lg:text-5xl text-primary">
            Edit Blog
          </h1>

          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4">
            <div className="md:w-1/2">
              <div className="mb-2 block">
                <Label value="Blog Title" />
              </div>
              <TextInput
                defaultValue={`${blog.title}`}
                id="title"
                type="text"
                name="title"
                required
              />
            </div>
            <div className="md:w-1/2">
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
            <TextInput
              defaultValue={`${blog.image_url}`}
              id="image"
              type="text"
              name="image"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Short Description" />
            </div>
            <Textarea
              defaultValue={`${blog.short_description}`}
              id="shortDescription"
              type="text"
              name="shortDescription"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Long Description" />
            </div>
            <Textarea
              defaultValue={`${blog.long_description}`}
              id="longDescription"
              type="text"
              name="longDescription"
              required
            />
          </div>

          <Button type="submit">Submit</Button>
          <button
            onClick={submit}
            type="button"
            className="bg-red-500 p-2 text-white rounded-lg"
          >
            Delete Blog
          </button>
        </form>
      </Card>
      <div>
        <Toaster position="top-right" />
      </div>
    </motion.div>
  );
};

export default EditBlog;
