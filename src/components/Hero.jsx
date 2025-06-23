import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { styles } from "../styles";
import Threads from "./Threads";

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
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Aniket</span>
          </h1>
          <p
            ref={typewriterRef}
            style={{ lineHeight: "1.12" }}
            className={`${styles.heroSubText} mt-2 text-white-100 leading-relaxed`}
          ></p>
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
