import styles from "../UI/UIStyles/AboutUsCard.module.css";

function AboutUsCard(props) {
  return (
    <div className={styles.aboutUsCard}>
      <h2 className={styles.heading}>{props.heading}</h2>
      <p className={styles.content}>{props.info}</p>
    </div>
  );
}

export default AboutUsCard;
