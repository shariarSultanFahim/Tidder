import axios from "axios";
import { useContext, useEffect } from "react"

// http://localhost:5000
// https://tidder-server.vercel.app
const BASE_URL = "http://localhost:5000";

const axiosSecure = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
});

export const fetchBlogs = () => {
    return (axiosSecure.get('/blogs').then(res => res.data))
};

export const fetchFeaturedBlogs = () => {
    return (axiosSecure.get('/blogs/featured').then(res => res.data))
};

export const fetchBlogDetails = (id) =>{
    return (axiosSecure.get(`/blogs/details?id=${id}`).then(res => res.data));
}

export const fetchCommentByBlogId = (blogId) =>{
    return (axiosSecure.get(`/comment?blogId=${blogId}`).then(res=>res.data));
}

const useAxiosSecure = () => {
    return axiosSecure;
};
export default useAxiosSecure;

