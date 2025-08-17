import styles from "../styles/RulesAndInfo.module.css";
import { RulesAndInfoJson } from "../data/RulesAndInfo";
import RulesBlock from "../UI/RulesBlock";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const RulesAndInfo = () => {
  return (
    <div className={styles.rulesPage}>
      <Navbar />
      <h1 className={styles.heading}>Rules and Info</h1>
      {RulesAndInfoJson.map((item) => (
        <RulesBlock key={item.heading} {...item} />
      ))}
      <Footer />
    </div>
  );
};

export default RulesAndInfo;
