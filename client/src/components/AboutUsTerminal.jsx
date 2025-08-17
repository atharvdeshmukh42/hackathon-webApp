import React, { useState, useEffect } from "react";
import styles from "../styles/AboutUsTerminal.module.css";
import Terminal from "../UI/Terminal";

function AboutUsTerminal() {
  const aboutUsContent = `
{
    "about_us": "Tech Pragyan, is a 12-hour hackathon on March 27, 2025, at Amrutvahini College of Engineering, Sangamner. This event invites participants to tackle real-world challenges and develop innovative solutions using advanced technologies, fostering collaboration and skill application in a competitive environment."
}
  `.trim();

  const [displayedContent, setDisplayedContent] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  useEffect(() => {
    const words = aboutUsContent.match(/(\S+\s*)/g) || [];
    
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + words[currentWordIndex]);
        setCurrentWordIndex(prev => prev + 1);
      }, 250);
      
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex]);

  return (
    <div className={styles.AboutUs}>
      <h2 className={styles.heading}>About Us:</h2>
      <div className={styles.terminalHolder}>
        <Terminal code={displayedContent || " "} />
      </div>
    </div>
  );
}

export default AboutUsTerminal;