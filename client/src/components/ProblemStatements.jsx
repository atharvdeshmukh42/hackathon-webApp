import styles from "../styles/ProblemStatements.module.css";
import { useState, useEffect } from "react";
import ProblemCard from "../UI/ProblemCard";
import {DomainDetailsJson} from '../data/DomainDetails.js'

function ProblemStatements() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const updateDots = () => {
      setDots((prevDots) => {
        switch (prevDots) {
          case "":
            return ".";
          case ".":
            return "..";
          case "..":
            return "...";
          default:
            return "";
        }
      });
    };

    const timer = setInterval(updateDots, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={styles.problemStatements}>
        <h2 className={styles.heading}>
          Exciting problems, Waiting for innovation{dots}
        </h2>
        <div className={styles.cardHolder}>
          {DomainDetailsJson.map((item) => (
            <ProblemCard key={item.head} {...item}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProblemStatements;
