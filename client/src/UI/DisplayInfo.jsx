import { Link } from "react-router-dom";
import styles from "../UI/UIStyles/DisplayInfo.module.css";

function DisplayInfo(props) {
  return (
    <div className={styles.displayInfo}>
      <h2 className={styles.heading}>{props.heading}</h2>
      <p className={styles.info}>{props.info}</p>
      <Link to={props.link} className={styles.link}>
      {props.linkName}
      </Link>
    </div>
  );
}

export default DisplayInfo