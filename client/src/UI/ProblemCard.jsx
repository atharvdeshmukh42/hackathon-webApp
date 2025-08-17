import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../UI/UIStyles/ProblemCard.module.css';

function ProblemCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    if (props.head !== "Btn") {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (props.head !== "Btn") {
      setIsFlipped(false);
    }
  };

  if (props.head !== "Btn") {
    return (
      <div 
        className={styles.cardContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          {/* Front of card */}
          <div className={`${styles.cardFace} ${styles.cardFront}`}>
            <div className={styles.innerCard}>
              <h3 className={styles.subHeading}>{props.head}</h3>
              <img src={props.image} alt={props.head} className={styles.image}/>
              <div className={styles.separator}></div>
              <p className={styles.details}>{props.details}</p>
            </div>
          </div>
          
          {/* Back of card */}
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            <div className={styles.innerCard}>
              <p className={styles.additionalInfo}>{props.additionalInfo}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardFace}>
          <div className={styles.innerCard}>
            <Link className={`${styles.problemStateBtn} ${styles.Btn}`} to="/PS">
              Problem Statements
            </Link>
            <p className={styles.details}>{props.details}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemCard;