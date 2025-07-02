import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { styles } from "../styles";
import Threads from "./Threads";
import profileImage from "../assets/pp.jpg";

const Hero = () => {
  const typewriterRef = useRef(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const typewriter = new Typewriter(typewriterRef.current, {
      loop: true,
      delay: 60,
    });

    typewriter
      .typeString("I'm A Developer ??")
      .pauseFor(1000)
      .deleteAll()
      .typeString("No, I'm a Professional CTRL+C & CTRL+V Specialist")
      .pauseFor(1000)
      .deleteAll()
      .typeString("And you must be HTML ;) coz you've got me hyperlinked to your heart !")
      .pauseFor(1000)
      .start();

    return () => {
      typewriter.stop(); // Clean up to avoid memory leaks
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Resume-Aniket.pdf";// Replace with the actual path to your resume file
    link.download = "Aniket_Resume.pdf";
    link.click();
    setDownloaded(true);
  };

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      {/* Threads Background Animation */}
      <div className="absolute inset-0 w-full h-full">
        <Threads
          color={[0.57, 0.37, 1]}
          amplitude={5}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX}`}
      >
        {/* Profile Picture with Interactive Animations */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          <div className="flex flex-col justify-center items-center mt-2 md:mt-5 flex-shrink-0">
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Profile Image */}
              <motion.div
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#915EFF] shadow-lg relative"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(145, 94, 255, 0.3)",
                    "0 0 40px rgba(145, 94, 255, 0.6)",
                    "0 0 20px rgba(145, 94, 255, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <img
                  src={profileImage}
                  alt="Aniket"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#915EFF] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </motion.div>
              
              {/* Floating Particles around Profile */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 bg-[#915EFF] rounded-full"
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [10, -10, 10],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-1/2 -left-4 w-1.5 h-1.5 bg-[#915EFF] rounded-full"
                animate={{
                  x: [-5, 5, -5],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </motion.div>
          </div>

          {/* Main Heading - Fixed Position */}
          <div className="flex-1 min-w-0 relative">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm {" "}
              <span 
                className="text-[#915EFF] relative inline-block glitch-text"
                data-text="Aniket"
              >
                Aniket
              </span>
            </h1>
            
            {/* Typewriter text - Absolutely positioned to not affect main heading */}
            <div className="absolute top-full mt-4 left-0 right-0">
              <p
                ref={typewriterRef}
                style={{ lineHeight: "1.12" }}
                className={`${styles.heroSubText} text-white-100 leading-relaxed`}
              ></p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Button */}
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2">
        <button
          onClick={handleDownload}
          className={`px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 ${
            downloaded
              ? "bg-green-500 text-white hover:scale-105 shadow-lg animate-pulse"
              : "bg-white text-black hover:bg-green-200 hover:scale-105 shadow-lg animate-pulse"
          }`}
          style={{
            boxShadow: downloaded
              ? "0 4px 15px rgba(34, 197, 94, 0.4)"
              : "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          {downloaded ? "Downloaded" : "Download Resume"}
        </button>
      </div>

      <div className="absolute bottom-12 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
