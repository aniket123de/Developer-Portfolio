import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const socialLinks = [
    {
      icon: faFacebook,
      url: "https://www.facebook.com/profile.php?id=100067643394312",
      color: "#1877F2"
    },
    {
      icon: faXTwitter,
      url: "https://x.com/AnkieDe1",
      color: "#1DA1F2"
    },
    {
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/aniket-de-505362287/",
      color: "#0077B5"
    },
    {
      icon: faInstagram,
      url: "https://www.instagram.com/aweniket/",
      color: "#E4405F"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? "bg-[rgba(5,8,22,0.95)] backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <motion.div 
          className="flex items-center justify-between w-full px-8 py-3 rounded-full border border-[#915EFF] bg-[#915EFF]/5"
          whileHover={{ backgroundColor: "rgba(145, 94, 255, 0.1)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Left section - Logo and Name */}
          <Link
            to='/'
            className='flex items-center gap-2 group'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <motion.img 
              src={logo} 
              alt='logo' 
              className='w-9 h-9 object-contain'
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <p className='text-white text-[18px] font-bold cursor-pointer flex group-hover:text-[#915EFF] transition-colors duration-300'>
              Aniket De
            </p>
          </Link>

          

          {/* Right section - Navigation and Social Links */}
          <div className='hidden sm:flex items-center gap-6'>
            {/* Navigation Links */}
            <ul className='list-none flex flex-row gap-6 mr-6'>
              {navLinks.map((nav) => (
                <motion.li
                  key={nav.id}
                  className={`${
                    active === nav.title 
                      ? "text-white" 
                      : "text-secondary"
                  } hover:text-white text-[16px] font-medium cursor-pointer transition-all duration-300`}
                  onClick={() => setActive(nav.title)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </motion.li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 border-l border-[#915EFF]/30 pl-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-xl"
                  style={{ color: social.color }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='sm:hidden flex items-center'>
            <motion.img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: toggle ? 1 : 0, scale: toggle ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 black-gradient absolute top-20 right-4 mx-4 my-2 min-w-[140px] z-10 rounded-xl backdrop-blur-sm`}
        >
          <div className='flex flex-col gap-4'>
            <ul className='list-none flex flex-col gap-4'>
              {navLinks.map((nav) => (
                <motion.li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white transition-colors duration-300`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                  whileHover={{ x: 5 }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </motion.li>
              ))}
            </ul>
            <div className="flex gap-4 pt-4 border-t border-[#915EFF]/30">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-xl"
                  style={{ color: social.color }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;