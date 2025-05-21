import React, { useRef, useState, useEffect } from "react";
import { cn } from "../utils/cn";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { navLinks } from "../constants";
import { logo } from "../assets";

// Social links array for use in component
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

export const ModernNavbar = ({ className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (title) => {
    setActive(title);
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      
      {/* Desktop Navigation */}
      <NavBody visible={visible}>
        {/* Left side - Logo */}
        <NavbarLogo />
        
        {/* Center - Nav Items */}
        <NavItems 
          items={navLinks.map(item => ({ name: item.title, link: `#${item.id}` }))} 
          onItemClick={(e) => {
            const name = e.target.textContent;
            setActive(name);
          }}
          activeItem={active}
        />
        
        {/* Right side - Social Links */}
        <div className="relative z-20 flex items-center space-x-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
              style={{ color: social.color }}
            >
              <FontAwesomeIcon icon={social.icon} />
            </motion.a>
          ))}
        </div>
      </NavBody>
      
      {/* Mobile Navigation */}
      <MobileNav visible={visible}>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isMenuOpen} onClick={toggleMenu} />
        </MobileNavHeader>
        
        <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          {navLinks.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={`#${item.id}`}              className={cn(
                "w-full rounded-md px-4 py-3 text-base font-medium transition duration-200",
                active === item.title
                  ? "bg-gray-100 text-black dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-600 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              )}
              onClick={() => handleNavItemClick(item.title)}
            >
              {item.title}
            </a>
          ))}
          
          {/* Mobile Social Links */}
          <div className="mt-4 flex w-full flex-row items-center justify-start gap-4 border-t border-gray-200 pt-4 dark:border-neutral-800">
            {socialLinks.map((social, index) => (
              <a
                key={`mobile-social-${index}`}                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
                style={{ color: social.color }}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 10px rgba(145, 94, 255, 0.2)",
        width: visible ? "40%" : "80%",
        y: visible ? 20 : 10,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-6 py-3 lg:flex",
        visible ? "bg-[#050816]/80 backdrop-blur-md border border-[#915EFF]/30" : "bg-[#050816] border border-[#915EFF]/50",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, activeItem }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-4 text-base font-medium text-zinc-400 transition duration-200 hover:text-zinc-200 lg:flex lg:space-x-4",
        className
      )}>
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => onItemClick(e)}          className={cn(            "relative px-5 py-2.5 tracking-wide",
            activeItem === item.name ? "text-white" : "text-zinc-400"
          )}
          key={`link-${idx}`}
          href={item.link}>          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[#1d1836] border border-[#915EFF]/40 shadow-[0_0_10px_rgba(145,94,255,0.3)]" />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 10px rgba(145, 94, 255, 0.2)",        width: visible ? "90%" : "95%",
        paddingRight: visible ? "16px" : "20px",
        paddingLeft: visible ? "16px" : "20px",
        borderRadius: visible ? "8px" : "2rem",
        y: visible ? 20 : 10,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible ? "bg-[#050816]/80 backdrop-blur-md border border-[#915EFF]/30" : "bg-[#050816] border border-[#915EFF]/50",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-[#050816] px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
            className
          )}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-base font-normal text-white"
      onClick={() => {
        window.scrollTo(0, 0);
      }}>
      <motion.img
        src={logo}
        alt="logo"
        width={36}
        height={36}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      />
      <span className="font-semibold text-white text-lg">Aniket De</span>
    </a>
  );
};

export default ModernNavbar;
