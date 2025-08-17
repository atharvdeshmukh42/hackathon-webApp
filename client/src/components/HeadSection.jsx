import styles from "../styles/HeadSection.module.css";
import MainLogo from "../assets/Main_Logo.webp";
import { Link } from "react-router-dom";

function HeadSection() {
  const info = `{
    "Date": "27th March 2025"
  }`;

  const clgName = "Amrutvahini College of Engineering, Sangamner";
  const deptName = "Department of Computer Engineering";
  return (
    <>
      {/* <HeadBackground /> */}
      <div className={styles.HeadSection}>
        <div className={styles.clgInfo}>{clgName}</div>
        <div className={styles.info}>{deptName}</div>
        <div className={styles.info}>Organizes</div>
        <img src={MainLogo} alt="MainLogo" className={styles.MainLogo} />
        <div className={styles.line}></div>
        <div className={styles.dateInfo}>{info}</div>
        <div className={styles.headBtnDiv}>
          <Link className={`${styles.registerBtn} ${styles.Btn}`} to="/Result">
            Results
          </Link>
          <Link className={`${styles.problemStateBtn} ${styles.Btn}`} to="/Confirmation">
            Confirm Participation
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeadSection;
