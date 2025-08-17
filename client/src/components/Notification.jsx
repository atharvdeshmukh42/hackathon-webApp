import React, { useState, useEffect } from 'react';
import styles from "../styles/Notification.module.css";

function Notification ({ delay = 2000 }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
        setHasShown(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, hasShown]);

  if (!showOverlay) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.emoji}>🥳</h1>
        <h3 className={styles.title}>Results are out now !</h3>
        <h3 className={styles.subtitle}>Confirm your participation before 17th March 2025</h3>
        <button 
          onClick={() => setShowOverlay(false)}
          className={styles.closeButton}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Notification;