import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants"; // List of technologies with name and icon
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  return (
    <div className="w-full flex flex-col items-center mt-15">
      {/* Animated Header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Technologies I've Worked With
        </h2>
      </motion.div>

      {/* Technology Icons Section */}
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {technologies.map((technology) => (
          <motion.div
            className="w-24 h-24 flex justify-center items-center rounded-full border-2 shadow-xl p-2 m-2"
            style={{ borderColor: "#915EFF" }}
            key={technology.name}
            whileHover={{
              scale: 1.2, // Magnifying effect
              rotate: 10, // Tilt effect
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          >
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");

