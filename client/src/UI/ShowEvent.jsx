import styles from "../UI/UIStyles/ShowEvent.module.css";

function ShowEvent(props) {
  return (
    <div className={styles.event}>
      <div className={styles.left}>
        <div className={styles.date}>{props.date}</div>
        <img src={props.image} alt={props.head} className={styles.logo}/>
      </div>
      <div className={styles.right}>
        <h4 className={styles.head}>{props.head}</h4>
        <div className={styles.description}>{props.description}</div>
      </div>
    </div>
  );
}

export default ShowEvent;
