import Timeline from "./Timeline";
import styles from "../styles/Schedule.module.css";
function Schedule() {
  return (
    <div className={styles.schedule}>
      <h2 className={styles.heading}>Important Dates</h2>
      <Timeline />
    </div>
  );
}

export default Schedule;