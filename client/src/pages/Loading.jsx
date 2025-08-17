import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const navigate = useNavigate();

  const lines = [
    "Initializing Hackathon Environment...",
    "Connecting to creativity servers...",
    "Fetching ideas from the cloud ☁️ ...",
    "Compiling excitement package 📦 ...",
  ];

  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      document.querySelector(".cursor").classList.toggle("active");
    }, 300);

    return () => clearInterval(cursorBlinkInterval);
  }, []);

  useEffect(() => {
    if (lineIndex < lines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + lines[lineIndex][currentLine.length]);
        if (currentLine.length === lines[lineIndex].length - 1) {
          setLineIndex(lineIndex + 1);
          setCurrentLine("");
        }
      }, 50);

      return () => clearTimeout(timeout);
    } else {
      setShowProgressBar(true);
      const redirectTimeout = setTimeout(() => {
        navigate("/home");
      }, 2000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [lineIndex, currentLine, navigate]);

  return (
    <div className={styles.loadingBody}>
      <div className={styles.loadingScreen}>
        <div className={styles.console}>
          {lines.slice(0, lineIndex).map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
          <p>
            {currentLine}
            <span className={styles.cursor}>|</span>
          </p>
        </div>
        {showProgressBar && (
          <div className={styles.progressBar}>
            <div className={styles.progressBarInner}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
