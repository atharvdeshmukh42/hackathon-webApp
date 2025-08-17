import styles from "../styles/PSPage.module.css";
import { ProblemStatementListJson } from "../data/ProblemStatementList.js";
import PSCard from "../UI/PSCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from '../components/Footer';

const PSPage = () => {
  return (
    <div className={styles.PSPage}>
      <Navbar />
      <h1 className={styles.PSHeading}>Problem Statements</h1>
      <p className={styles.openInnovation}>* Open Innovation: In open innovation student can submit there own ideas (Problem Id for open innovation is 1000)</p>
      <div className={styles.PSList}>
        {ProblemStatementListJson.map((item) => (
          <PSCard key={item.ProblemId} {...item} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PSPage;
