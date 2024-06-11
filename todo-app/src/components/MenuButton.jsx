import React, {useState} from "react";
import { motion, MotionConfig } from "framer-motion";

function MenuButton(){
    const [active, setActive] = useState(false)

    return (
        <motion.button 
            className="relative w-20 h-20 rounded-full bg-white/0 transition-colors hover:bg-white/20"
            onClick={() => setActive(!active)}
            animate={active ? "open" : "closed"}
        >
            <motion.span
            className="absolute h-1 w-10 bg-white"
            style={{
                left: "50%",
                top: "35%",
                x: "-50%",
                y: "-50%",
            }}
            variants={{
                open: {
                    rotate: "45deg",
                },
                closed: {
                    rotate: "0deg",
                },

            }}
            />
            <motion.span
            className="absolute h-1 w-10 bg-white"
            style={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
            }}
            />
            <motion.span
            className="absolute h-1 w-5 bg-white"
            style={{
                left: "calc(50% + 10px)",
                bottom: "35%",
                x: "-50%",
                y: "50%",
            }}
            />
        </motion.button>
    )
}

export default MenuButton;