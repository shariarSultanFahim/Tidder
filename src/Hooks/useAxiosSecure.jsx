import axios from "axios";
import { useContext, useEffect } from "react"

const BASE_URL = "https://tidder-server.vercel.app";

const axiosSecure = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};
export default useAxiosSecure;

