import styles from "../styles/HeadBackground.module.css";
// import bg4 from "../assets/Head_Logo_4.svg";
import bg2 from "../assets/Head_Logo_2.webp";
import bg3 from "../assets/Head_Logo_3.webp";
import bg1 from "../assets/Head_Logo_1.webp";

function HeadBackground() {
  return (
    <div className={styles.headBackground}>
      <img src={bg2} className={styles.bg2} />
      <img src={bg1} className={styles.bg1} />
      <img src={bg3} className={styles.bg3} />
    </div>
  );
}

export default HeadBackground;
