import styles from "../styles/RegistrationForm.module.css";
import RegistrationField from "../components/RegistrationField";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const RegistrationForm = () => {
  return (
    <div className={styles.registrationForm}>
      <Navbar />
      <h1 className={styles.msg}>Registrations are closed</h1>
      <Footer />
    </div>
  );
};

export default RegistrationForm;
