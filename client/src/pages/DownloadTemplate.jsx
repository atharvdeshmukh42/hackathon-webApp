import React, { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DownloadTemplate.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import templateFile from "../assets/TechPragyan Template.pptx";
import brochureFile from "../assets/TechPragyan_Brochure_2025.pdf";

const DownloadTemplate = () => {
  const navigate = useNavigate();
  const hasDownloaded = useRef(false);

  const downloadFile = useCallback(() => {
    const link = document.createElement("a");
    link.href = templateFile;
    link.download = "TechPragyan Template.pptx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const downloadBrochure = useCallback(() => {
    const link = document.createElement("a");
    link.href = brochureFile;
    link.download = "TechPragyan_Brochure_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    if (!hasDownloaded.current) {
      hasDownloaded.current = true;
      downloadFile();
    }
  }, [downloadFile]);

  const handleDownloadAgain = () => {
    downloadFile();
  };

  const handleGoHome = () => {
    navigate("/Home");
  };

  return (
    <div className={styles.downloadTemplate}>
      <Navbar />
      <div className={styles.downloadTemplateContent}>
        <p className={styles.text}>Downloading file...</p>
        <div className={styles.btnHolder}>
          <button
            onClick={handleDownloadAgain}
            className={`${styles.downloadBtn} ${styles.Btn}`}
          >
            Download Template
          </button>
          <button
            onClick={downloadBrochure}
            className={`${styles.brochureBtn} ${styles.Btn}`}
          >
            Download Brochure
          </button>
          <button
            onClick={handleGoHome}
            className={`${styles.homeBtn} ${styles.Btn}`}
          >
            Go to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DownloadTemplate;
