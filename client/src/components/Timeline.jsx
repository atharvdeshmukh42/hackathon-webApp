import styles from "../styles/Timeline.module.css";
import ShowEvent from "../UI/ShowEvent";
import { ScheduleDataJson } from "../data/ScheduleData.js";
import finalEvent from "../assets/Final_Event.webp";

function Timeline() {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        <div className={styles.verticalLine}></div>
        <div className={styles.timelineHolder}>
          {ScheduleDataJson.map((item) => (
            <div key={item.sequenceNumber} className={styles.eventHolder}>
              <div className={styles.horizontalLine}></div>
              <ShowEvent {...item} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.finalEventHolder}>
        <h3 className={styles.finalEventText}>Hackathon</h3>
        <h3 className={styles.finalEventText}>On 27th March 2025</h3>
        <img
          src={finalEvent}
          alt="hackathon on 27th"
          className={styles.finalImage}
        />
      </div>
    </div>
  );
}

export default Timeline;
