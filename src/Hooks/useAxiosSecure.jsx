import axios from "axios";

const BASE_URL = "http://localhost:5000";

const axiosSecure = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};
export default useAxiosSecure;

