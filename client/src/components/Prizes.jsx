import styles from "../styles/Prizes.module.css";
import PrizesImage from "../assets/Prizes_Logo.webp";
import { PrizesDetailJSON } from "../data/PrizesDetail";
import IndividualPrize from "../UI/individualPrize";

function Prizes() {
  return (
    <div className={styles.prizes}>
      <img src={PrizesImage} alt="Prizes" className={styles.image} />
      <h3 className={styles.prizesHeading}>Exciting Prizes...</h3>
      <div className={styles.displayPrizes}>
        {PrizesDetailJSON.map((item) => (
          <IndividualPrize key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Prizes;
