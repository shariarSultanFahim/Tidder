import { useContext } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";
import BlogCard from "../BlogCard/BlogCard";
import {  Select } from "flowbite-react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const AllBlogs = () => {
    useDocumentTitle('All Blogs');
    const {blogs} = useContext(AuthContext);

    const handleSearch = (e) =>{
        e.preventDefault();
        console.log(e.target.search.value);
    }
    const handleFilter = (category) =>{
        console.log(category);
    }
    return (
        <section>
             
            <div className="container mx-auto my-10 flex items-center justify-center">
                <div className="max-w-md">
                    <Select id="categories" onChange={(e) => handleFilter(e.target.value)}>
                        <option>All Categories</option>
                        <option>Technology</option>
                        <option>Lifestyle</option>
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Business</option>
                    </Select>
                </div>
                <form onSubmit={handleSearch} className="relative md:w-1/3 flex">
                <input
                    type="search"
                    name="search"
                    className="relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"/>
                <button type="submit"
                    className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
                    id="button-addon2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                </form>
            </div>

            <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {
                blogs?
                blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
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
        </section>
    );
};

export default AllBlogs;