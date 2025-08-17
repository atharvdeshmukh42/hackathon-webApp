import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResultTable from "../components/ResultTable";
import styles from "../styles/Result.module.css";

const Result = () => {
  return (
    <>
      <Navbar />
      <h1 className={styles.heading}>Results</h1>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Selected Teams</h1>
          <p className={styles.subtitle}>
            The following teams have been selected for final round amongst 200+
            teams.
          </p>
          <p className={styles.subtitle}>
            Congratulations to all the selected teams. Confirm your participation before 17th March 2025
          </p>
          <Link className={styles.btn} to="/confirmation">
            Confirm Participation
          </Link>
          <div className={styles.divider}></div>
        </div>
        <ResultTable />
        <div className={styles.footer}>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            The above teams must confirm their participation before 17th March 2025 by paying
            registeration fees.
          </p>
          <Link className={styles.btn} to="/confirmation">
            Confirm Participation
          </Link>
        </div>
      </div>
    </>
  );
};

export default Result;
