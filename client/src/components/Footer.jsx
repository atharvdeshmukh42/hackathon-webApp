import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import HeartLogo from "../assets/MadeWithLove_Logo.webp";
import PersonInfo from "../UI/PersonInfo";
import { PersonInfoJson } from "../data/PersonInfo";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.heading}>www.avcoecompevents.tech</h2>
        <div className={styles.people}>
          <h2 className={styles.linkHeading}>Key Contacts</h2>
          <div className={styles.peopleContainer}>
            {PersonInfoJson.map((item) => (
              <PersonInfo key={item.name} {...item} />
            ))}
          </div>
        </div>
        <div className={styles.quickLinks}>
          <h2 className={styles.linkHeading}>Quick Links</h2>
          <div className={styles.linkContainer}>
            <Link className={styles.linkItem} to="/Home">
              Home
            </Link>
            <Link className={styles.linkItem} to="/DownloadTemplate">
              Download Template
            </Link>
            <Link className={styles.linkItem} to="/Register">
              Register
            </Link>
            <Link className={styles.linkItem} to="/PS">
              Problem Statements
            </Link>
            <Link className={styles.linkItem} to="/AboutUs">
              About Us
            </Link>
            <Link className={styles.linkItem} to="/RulesAndInfo">
              Rules and Info
            </Link>
          </div>
        </div>
        <div className={styles.socialLinks}>
          <h2 className={styles.linkHeading}>Follow Us</h2>
          <div className={styles.socialContainer}>
            <p className={styles.socialText}>Follow us on Instagram for more detailed updates</p>
            <a href="https://www.instagram.com/tech.pragyan?igsh=MXRqNmxqaGUwaTF6aQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className={styles.madeWith}>
          <p className={styles.madeWithText}>Made with</p>
          <img src={HeartLogo} className={styles.image} />
          <p className={styles.madeWithText}>by team www.avcoecompevents.tech</p>
        </div>
        <p className={styles.text}>
          All the rights related to this event shall remain exclusively reserved
          by the organizers and all social handles!
        </p>
      </div>
    </footer>
  );
}

export default Footer;
