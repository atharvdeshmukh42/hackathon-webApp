import React from "react";
import { SelectedTeams } from "../data/SelectedTeams";
import styles from "../styles/ResultTable.module.css";

const ResultTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Team Name</th>
              <th>Team Leader</th>
            </tr>
          </thead>
          <tbody>
            {SelectedTeams.length > 0 ? (
              SelectedTeams.map((team, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>{index + 1}</td>
                  <td>{team.tName || "Not provided"}</td>
                  <td>{team.tLeaderName || "Not provided"}</td>
                </tr>
              ))
            ) : (
              <tr className={styles.emptyRow}>
                <td colSpan="3">No teams have been selected yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;