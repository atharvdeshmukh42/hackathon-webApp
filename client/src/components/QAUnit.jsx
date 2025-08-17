import { useState } from "react";
import styles from "../styles/QAUnit.module.css";

const QAUnit = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div
        className={styles.QAUnit}
        style={{ height: isOpen ? "auto" : "60px" }}
      >
        <div className={styles.innerDiv} onClick={() => setIsOpen(!isOpen)}>
          <h4 className={styles.question}>{question}</h4>
          <div
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
          >
            <svg
              //   xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>
      <div
      
        style={{
          maxHeight: isOpen ? "500px" : "0",
          opacity: isOpen ? "1" : "0",
          overflow: "hidden",
          transition: "all 0.3s ease",
          width: "100%",
          color: "white",
          fontFamily: "'Courier New', Courier, monospace",
          padding: isOpen ? "15px" : "0 15px",
          background: "#20043d"
        }}
      >
        "answer": "{answer}"
      </div>
    </div>
  );
};

export default QAUnit;
