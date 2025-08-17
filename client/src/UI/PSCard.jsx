import styles from "../UI/UIStyles/PSCard.module.css";

function PSCard(props) {
  return (
    <div className={styles.PSCard}>
      <div className={styles.PSId}>
        <h4 className={`${styles.IdLabel} ${styles.label}`}>Problem ID</h4>
        <h6 className={`${styles.IdValue} ${styles.value}`}>{props.ProblemId}</h6>
      </div>
      <div className={styles.PSTheme}>
        <h4 className={`${styles.themeLabel} ${styles.label}`}>Theme</h4>
        <h6 className={`${styles.themeValue} ${styles.value}`}>{props.Theme}</h6>
      </div>
      <div className={styles.PSTitle}>
        <h4 className={`${styles.titleLabel} ${styles.label}`}>Title</h4>
        <h6 className={`${styles.titleValue} ${styles.value}`}>{props.Title}</h6>
      </div>
      <div className={styles.PSDescription}>
        <h4 className={`${styles.descriptionLabel} ${styles.label}`}>Description</h4>
        <h6 className={`${styles.descriptionValue} ${styles.value}`}>{props.Description}</h6>
      </div>
    </div>
  );
}

export default PSCard;