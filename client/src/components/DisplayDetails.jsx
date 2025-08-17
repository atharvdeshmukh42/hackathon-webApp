import { EventDetailsJson } from "../data/EventDetails";
import EventDetail from "../UI/eventDetail";
import styles from "../styles/DisplayDetails.module.css";

function DisplayDetails() {
  return (
    <div className={styles.DisplayDetails}>
      <h2 className={styles.heading}>Event Details</h2>
      <div className={styles.cardHolder}>
        {EventDetailsJson.map((item) => (
          <EventDetail key={item.heading} {...item} />
        ))}
      </div>
      <p className={styles.info}>* Registration fees must be paid by team only once their idea has been selected</p>
    </div>
  );
}

export default DisplayDetails;
