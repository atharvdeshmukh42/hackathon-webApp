import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const linkHolderRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1300);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    const handleClickOutside = (event) => {
      if (isOpen && 
          !navRef.current?.contains(event.target) && 
          !linkHolderRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { path: "/Result", text: "Result" },
    { path: "/Confirmation", text: "Confirm Participation" },
    { path: "/AboutUs", text: "About Us" },
    { path: "/RulesAndInfo", text: "Rules and Info" }
  ];

  return (
    <>
      <nav className={styles.navbar} ref={navRef}>
        <Link className={styles.logo} to="/Home">
          TechPragyan
        </Link>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        {!isMobile && (
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  className={styles.navItem} 
                  to={link.path}
                  onClick={handleLinkClick}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      {isMobile && isOpen && (
        <div className={styles.linkHolder} ref={linkHolderRef}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.path} className={styles.linkItem}>
                <Link 
                  className={styles.navItem} 
                  to={link.path}
                  onClick={handleLinkClick}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;