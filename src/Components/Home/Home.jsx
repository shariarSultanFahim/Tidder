import { motion } from "framer-motion"
import Divider from "./Divider";

const Home = () => {



    return (
        <div className="min-h-screen space-y-12">

          {/* Banner */}
          <div className="bg-primary relative">
           <Divider/>
          <div className="container mx-auto w-full h-[550px] bg-primary 
          flex flex-col md:flex-row justify-between items-center">
            <div className="text-center pt-6 md:pt-0 md:text-left md:px-6 lg:px-12">
              <motion.h1
              initial = {{x:-1000}}
              animate = {{x:0}}
              transition={{
                duration:"2",
                delay:"0"
              }}
              className="text-white text-3xl md:text-4xl lg:text-5xl font-thin">Find Perfect Solution of your <span className="font-bold">Problem</span></motion.h1>
              
              <motion.p
              initial = {{x:-1000}}
              animate = {{x:0}}
              transition={{
                duration:"2",
                delay:"1"
              }}
              className="pt-4 pb-12 text-white opacity-70 text-sm md:text-xl font-thin">Dive into insightful blog posts covering a variety of topics. Find practical tips, thought-provoking ideas, and discover something new every day.</motion.p>
              
              <motion.button
              initial = {{y:1000}}
              animate = {{y:0}}
              transition={{
                duration:"0.5",
                delay:"3"
              }}
              
              
              className=" bg-secondary text-primary font-bold shadow-2xl rounded-3xl px-4 py-2">Explore</motion.button>
            </div>

            <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: "1" 
            }}
            className="overflow-hidden w-3/4 h-3/4 md:w-full md:h-full grid place-content-center">
              <img className="w-full h-auto" src="/Banner-SideImg.png" />
            </motion.div>

          </div>
          </div>

          <div className="h-96 w-full">

          </div>

          
        </div>
    );
};

export default Home;