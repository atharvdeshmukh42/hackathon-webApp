import styles from "../styles/DisplayMap.module.css";

function DisplayMap() {
  return (
    <div className={styles.displayMap}>
      <h2 className={styles.heading}>Location</h2>
      <div className={styles.contentHolder}>
        <iframe
        className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7516.606496004372!2d74.17865992832198!3d19.614329112022947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd0076d434b36b%3A0x27c0e7279f88a409!2sAmrutvahini%20College%20Of%20Engineering%20Cricket%20Ground!5e0!3m2!1sen!2sin!4v1736778663504!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <h5 className={styles.infoText}>
          Amrutvahini College of Engineering,<br /> Sangamner <br /> 422608
        </h5>
      </div>
    </div>
  );
}

export default DisplayMap;
