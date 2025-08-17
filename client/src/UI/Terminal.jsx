import styles from "./UIStyles/Terminal.module.css";

function Terminal(props) {
  let str = props.code;
  if (str.indexOf("undefined") == -1) {
    str = str;
} else {
    str = str.substring(0, (str.length - 9))
}
let codeArray = str.split("\n");
  return (
    <div className={styles.Terminal}>
      <div className={styles.taskBar}>
        <div className={styles.option1}></div>
        <div className={styles.option2}></div>
        <div className={styles.option3}></div>
      </div>
      <div className={styles.textContainer}>
        {codeArray.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default Terminal;
