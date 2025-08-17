import styles from "../styles/AboutUs.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUsCard from "../UI/AboutUsCard";
import {AboutUsJson} from "../data/AboutUs"
import Image from "../assets/College_Image.webp"

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <Navbar />
      <div className={styles.aboutUsContents}>
        <h1 className={styles.heading}>About Us</h1>
        <img src={Image} alt="College Image" className={styles.image} />
        {AboutUsJson.map((item) => (
          <AboutUsCard key={item.heading} {...item}/>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
