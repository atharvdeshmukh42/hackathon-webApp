import styles from "../UI/UIStyles/DisplayDiv.module.css";

function DisplayDiv(props) {
  const formatValue = (val) => {
    return val < 10 ? `0${val}` : val;
  };
  return (
    <>
      <div className={styles.displayDiv}>
        <div className={styles.contentHolder}>
          <div className={styles.name}>{props.name}</div>
          <div className={styles.time}>{formatValue(props.time)}</div>
        </div>
      </div>
    </>
  );
}

export default DisplayDiv;
