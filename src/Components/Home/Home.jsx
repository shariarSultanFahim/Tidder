import { motion } from "framer-motion"
import Divider from "./Divider";

const Home = () => {
    return (
        <div className="min-h-screen space-y-12">

          <div className="relative w-full h-[550px] bg-primary 
          flex flex-col md:flex-row justify-between items-center">
            <Divider/>
            <div className="text-center pt-6 md:pt-0 md:text-left md:px-6 lg:px-12">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-thin">Find Perfect Solution of your <span className="font-bold">Problem</span></h1>
              <p className="pt-4 pb-12 text-white opacity-70 text-sm md:text-xl font-thin">Dive into insightful blog posts covering a variety of topics. Find practical tips, thought-provoking ideas, and discover something new every day.</p>
              <button className=" bg-secondary text-primary font-bold shadow-2xl rounded-3xl px-4 py-2">Explore</button>
            </div>

            <div className="overflow-hidden w-3/4 h-3/4 md:w-full md:h-full grid place-content-center">
              <img className="w-full h-auto" src="/Banner-SideImg.png" />
            </div>

          </div>

          
        </div>
    );
};

export default Home;