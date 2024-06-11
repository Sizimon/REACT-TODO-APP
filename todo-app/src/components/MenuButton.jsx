import React, {useState} from "react";
import { motion, MotionConfig } from "framer-motion";

function MenuButton(){
    const [active, setActive] = useState(false)

    return (
        <MotionConfig
         transition={{ 
            duration: 0.2, 
            ease: "easeInOut"
        }}
        >
            <motion.button 
                className="relative w-10 h-20"
                onClick={() => setActive(!active)}
                animate={active ? "open" : "closed"}
                initial={false}
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
                        rotate: ["0deg", "0deg", "45deg"],
                        top: ["35%", "50%", "50%"]
                    },
                    closed: {
                        rotate: ["45deg", "0deg", "0deg"],
                        top: ["50%", "50%", "35%"]
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
                variants={{
                    open: {
                        rotate: ["0deg", "0deg", "-45deg"],
                    },
                    closed: {
                        rotate: ["-45deg", "0deg", "0deg"],
                    },

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
                variants={{
                    open: {
                        rotate: ["0deg", "0deg", "45deg"],
                        left: "50%",
                        bottom: ["35%", "50%", "50%"]
                    },
                    closed: {
                        rotate: ["45deg", "0deg", "0deg"],
                        left: "calc(50% + 10px)",
                        bottom: ["50%", "50%", "35%"]
                    },
                }}
                />
            </motion.button>
        </MotionConfig>
    )
}

export default MenuButton;