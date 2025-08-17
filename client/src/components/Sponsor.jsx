import styles from "../styles/Prizes.module.css";
import { SponsorJSON, PlatinumSpsonsorJSON } from "../data/Sponsor";
import SponsorCard from "../UI/SponsorCard";

function Sponsor() {
  return (
    <div className={styles.prizes}>
      <h1 className={styles.heading}>Our Sponsors</h1>
      <h3 className={styles.prizesHeading}>Our Platinum sponsor who sponsored all prizes worth Rs.1,10,000/-</h3>
      <div className={styles.displayPrizes}>
          <SponsorCard key={PlatinumSpsonsorJSON[0].name} {...PlatinumSpsonsorJSON[0]} />
      </div>
      <h3 className={styles.prizesHeading}>Other Sponsors</h3>
      <div className={styles.displayPrizes}>
        {SponsorJSON.map((item) => (
          <SponsorCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Sponsor;
