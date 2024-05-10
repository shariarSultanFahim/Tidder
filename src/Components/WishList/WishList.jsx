import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { motion } from "framer-motion"

const WishList = () => {
    useDocumentTitle('Wishlist')
    return (
        <motion.div
        initial={{opacity: 0, y:100}}
        animate={{opacity: 100, y: 0}}
        transition={{
          duration:"1",
          delay:"0"
        }}>
            
        </motion.div>
    );
};

export default WishList;