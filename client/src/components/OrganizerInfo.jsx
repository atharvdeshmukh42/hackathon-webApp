import styles from "../styles/OrganizerInfo.module.css";
import IEEELogo from '../assets/IEEE_Logo.webp'
import ISTELogo from '../assets/ISTE_Logo.webp'
import IEEECS from '../assets/IEEE-CS_Logo.webp'
import AVCOELogo from '../assets/AVCOE_Logo.webp'

function OrganizerInfo() {
  return (
    <div className={styles.organizerInfo}>
      <h1 className={styles.heading1}>Organized by</h1>
      <img src={AVCOELogo} alt="ISTE" className={styles.imageAVCOE}/>
      <h1 className={styles.heading1}>Amrutvahini College of Engineering, Sangamner</h1>
      <h2 className={styles.heading2}>Department of Computer Engineering</h2>
      <h3 className={styles.heading3}>In association with</h3>
      <div className={styles.imageContainer}>
        <img src={ISTELogo} alt="ISTE" className={styles.imageISTE}/>
        <img src={IEEELogo} alt="IEEE" className={styles.imageIEEE}/>
        <img src={IEEECS} alt="IEEE-CS" className={styles.imageIEEECS}/>
      </div>
    </div>
  );
}

export default OrganizerInfo;