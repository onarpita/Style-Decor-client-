import { motion } from "framer-motion";

const Hero = () => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <div className="relative bg-[url(https://i.ibb.co/WvzGNW34/round-rug.jpg)] bg-cover bg-center bg-no-repeat min-h-[500px]">
            <motion.div variants={container} initial="hidden"
                animate="visible" className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4 text-white space-y-4">
                <motion.h2 variants={item} className="text-5xl font-semibold">Bring the Canvas of Nature Indoors</motion.h2>
                <motion.p variants={item}>Where Beauty Is Intentional And Every Decor Piece Tells A Story</motion.p>
                <motion.div variants={item}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary text-black">Book Decoration Service</motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;