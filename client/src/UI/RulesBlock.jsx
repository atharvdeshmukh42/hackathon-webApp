import styles from "../UI/UIStyles/RulesBlock.module.css";
import SubRuleBlock from "./SubRuleBlock";
function RulesBlock(props) {
  return (
    <div className={styles.rulesBlock}>
      <img src={props.image} alt={props.heading} className={styles.image}/>
      <h2 className={styles.heading}>{props.heading}</h2>
      {props.details.map((item) => (
        <SubRuleBlock key={item.subHeading} {...item}/>
      ))}
    </div>
  );
}

export default RulesBlock;