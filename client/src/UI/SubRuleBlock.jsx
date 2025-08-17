import styles from "../UI/UIStyles/SubRuleBlock.module.css";

function SubRuleBlock(props) {
  return (
    <div className={styles.subRuleBlock}>
      <h3 className={styles.subHeading}>{props.subHeading}</h3>
      {props.subItems.map((item) => (
        <div className={styles.subItem}>{item}</div>
      ))}
    </div>
  );
}

export default SubRuleBlock;