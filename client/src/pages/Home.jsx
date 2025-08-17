import Showtime from "../components/Showtime";
import AboutUsTerminal from "../components/AboutUsTerminal";
import HeadSection from "../components/HeadSection";
import ProblemStatements from "../components/ProblemStatements";
import FAQSection from "../components/FAQSection";
import Schedule from "../components/Schedule";
import Footer from "../components/Footer";
import DisplayDetails from "../components/DisplayDetails";
import Prizes from "../components/Prizes";
import DisplayMap from "../components/DisplayMap";
import Navbar from "../components/Navbar";
import OrganizerInfo from "../components/OrganizerInfo";
import ImportantInfo from "../components/ImportantInfo";
import styles from "../styles/Home.module.css";
import HeadBackground from "../components/HeadBackground"
import Sponsor from "../components/Sponsor"
import Notification from "../components/Notification";

function Home() {
  return (
    <>
      <HeadBackground />
      <div className={styles.homePage}>
        <Navbar />
        <HeadSection />
        <Showtime />
        <OrganizerInfo />
        <AboutUsTerminal />
        <ImportantInfo />
        <Prizes />
        <Sponsor />
        <DisplayDetails />
        <ProblemStatements />
        <Schedule />
        <DisplayMap />
        <FAQSection />
        <Footer />
        <Notification />
      </div>
    </>
  );
}

export default Home;
