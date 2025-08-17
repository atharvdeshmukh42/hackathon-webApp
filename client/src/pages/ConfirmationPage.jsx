import { useState, useEffect, useRef } from "react";
import styles from "../styles/ConfirmationPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSpinner, FaDownload } from "react-icons/fa"; // Add FaDownload
import { SelectedTeams } from "../data/SelectedTeams"; // Import the real team data
import QR from "../assets/PaymentQR.jpg";
import NOCTemplate from "../assets/NOC_Template.doc"; // Import the NOC template

const ConfirmationPage = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    accommodation: "",
    accommodationDays: [],
  });
  const [teamDetails, setTeamDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  // Add error state for error notifications
  const [error, setError] = useState(null);
  
  // Use real team data from SelectedTeams.js
  const [teams, setTeams] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [teamLeaderMap, setTeamLeaderMap] = useState({});
  
  // Add these new state variables
  const [nocFile, setNocFile] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Add refs for form elements
  const nocInputRef = useRef(null);
  const receiptInputRef = useRef(null);
  const transactionInputRef = useRef(null);
  
  // Add these new refs at the top of the component with your other refs
  const successNotificationRef = useRef(null);
  const errorNotificationRef = useRef(null);
  // Add this with your other refs
  const submitErrorNotificationRef = useRef(null);
  
  // Initialize teams and leaders from the real data
  useEffect(() => {
    // Extract unique team names and leader names
    const extractedTeams = SelectedTeams.map(team => team.tName);
    const extractedLeaders = SelectedTeams.map(team => team.tLeaderName);
    
    // Create a mapping from team name to leader name
    const leaderMap = {};
    SelectedTeams.forEach(team => {
      leaderMap[team.tName] = team.tLeaderName;
    });
    
    setTeams(extractedTeams);
    setTeamLeaders(extractedLeaders);
    setTeamLeaderMap(leaderMap);
  }, []);
  
  // Accommodation options
  const accommodationOptions = [
    { value: "", label: "No accommodation needed" },
    { value: "March 26, 2025", label: "Need accommodation until March 26, 2025" },
    { value: "March 27, 2025", label: "Need accommodation until March 27, 2025" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "teamName") {
      // When team name changes, automatically set the corresponding team leader
      setFormData({
        ...formData,
        teamName: value,
        teamLeaderName: teamLeaderMap[value] || ""  // Set the matching team leader
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAccommodationChange = (e) => {
    const { name, value } = e.target;
    
    // Update formData without resetting teamDetails
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Update teamDetails with new accommodation info
    if (teamDetails) {
      setTeamDetails(prevDetails => ({
        ...prevDetails,
        accommodation: value ? "Required" : "Not Required",
        checkoutDate: value || "N/A"
      }));
    }
  };

  const handleGetDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Clear any previous errors
    setError(null);

    try {
      // API URL - adjust if your backend is running on a different port/host
      const apiUrl = "https://tech-pragyan-server-computer.el.r.appspot.com/getTeamDetails";
      
      // Make API call to backend to fetch team details
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: formData.teamName,
          teamLeaderName: formData.teamLeaderName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to retrieve team details');
      }

      const { data } = await response.json();
      console.log("Retrieved team data:", data);

      // Transform the data from Firestore format to the format expected by the UI
      const transformedData = {
        teamName: data.teamName,
        teamLeaderName: formData.teamLeaderName,
        teamSize: data.members?.length || 0,
        accommodation: formData.accommodation ? "Required" : "Not Required",
        accommodationDays: formData.accommodationDays,
        checkoutDate: formData.accommodation || "N/A",
        registrationStatus: "Confirmed",
        registrationId: data.id || `REG-${Math.floor(Math.random() * 10000)}`,
        members: data.members.map((member) => ({
          name: member.name,
          email: member.email,
          phone: member.phone,
          role: member.name === formData.teamLeaderName ? "Team Lead" : "Member"
        })),
        registrationDate: data.timestamp ? 
          new Date(data.timestamp.split('_')[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString() : 
          new Date().toLocaleDateString(),
        collegeName: data.collegeName,
        degree: data.degree,
        mentor: data.mentor,
        // Important: Preserve the teamLeader object from the API response
        teamLeader: data.teamLeader || 
          data.members.find(member => member.name === formData.teamLeaderName) || 
          { name: formData.teamLeaderName, email: "", phone: "" }
      };

      setTeamDetails(transformedData);
    } catch (err) {
      console.error("Error fetching team data:", err);
      // Set error state instead of using alert
      setError(`Failed to retrieve team details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add file handling functions
  const handleNocFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("NOC file exceeds the 5MB size limit");
        nocInputRef.current.value = "";
        return;
      }
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setError("NOC file must be in PDF format");
        nocInputRef.current.value = "";
        return;
      }
      setNocFile(file);
    }
  };
  
  const handleReceiptFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Receipt file exceeds the 5MB size limit");
        receiptInputRef.current.value = "";
        return;
      }
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setError("Receipt must be in JPG, JPEG, or PNG format");
        receiptInputRef.current.value = "";
        return;
      }
      setReceiptFile(file);
    }
  };
  
  // Update the handleSubmitConfirmation function to include team leader email
const handleSubmitConfirmation = async (e) => {
  e.preventDefault();
  
  // Validate all inputs
  if (!teamDetails) {
    setError("Please retrieve your team details first");
    return;
  }
  
  if (!nocFile || nocFile.size === 0) {
    setError("Please upload a valid college NOC document");
    return;
  }
  
  if (!receiptFile || receiptFile.size === 0) {
    setError("Please upload a valid payment receipt");
    return;
  }
  
  if (!transactionId || transactionId.trim() === "") {
    setError("Please enter your transaction reference ID");
    return;
  }
  
  setError(null);
  setSubmitting(true);
  
  try {
    // Calculate total amount
    const registrationFee = 1500;
    const accommodationFee = teamDetails.accommodation === "Required" ? 
      teamDetails.teamSize * ((teamDetails.accommodationDays?.length || 0) * 100) : 0;
    const totalAmount = registrationFee + accommodationFee;
    
    // Get team leader's email from team details
    const teamLeaderEmail = teamDetails.teamLeader?.email || "";
    const teamLeaderPhone = teamDetails.teamLeader?.phone || "";
    
    // Prepare form data for submission
    const formData = new FormData();
    const confirmationData = {
      teamName: teamDetails.teamName,
      teamLeaderName: teamDetails.teamLeaderName,
      teamLeaderEmail: teamLeaderEmail, // Add team leader's email
      teamLeaderPhone: teamLeaderPhone, // Add team leader's phone
      transactionId: transactionId,
      totalAmount: totalAmount,
      registrationFee: registrationFee,
      accommodationFee: accommodationFee,
      accommodation: teamDetails.accommodation,
      accommodationDays: teamDetails.accommodationDays || [],
      teamSize: teamDetails.teamSize,
      registrationId: teamDetails.registrationId
    };
    
    formData.append("data", JSON.stringify(confirmationData));
    formData.append("nocFile", nocFile);
    formData.append("receiptFile", receiptFile);
    
    // Send data to backend
    const response = await fetch("https://tech-pragyan-server-computer.el.r.appspot.com/submitConfirmation", {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit confirmation data');
    }
    
    // Handle successful response
    const responseData = await response.json();
    console.log("Confirmation response:", responseData);
    setSubmitSuccess(true);
    setSubmitError(null);
    
    // Optionally, reset form fields
    setTransactionId("");
    setNocFile(null);
    setReceiptFile(null);
    if (nocInputRef.current) nocInputRef.current.value = "";
    if (receiptInputRef.current) receiptInputRef.current.value = "";
    if (transactionInputRef.current) transactionInputRef.current.value = "";
    
    // Scroll to success notification
    setTimeout(() => {
      if (successNotificationRef.current) {
        successNotificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
  } catch (err) {
    console.error("Error submitting confirmation:", err);
    setSubmitError(err.message || "Failed to submit confirmation data");
    setSubmitSuccess(false);
    
    // Scroll to error notification
    setTimeout(() => {
      if (submitErrorNotificationRef.current) {
        submitErrorNotificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  } finally {
    setSubmitting(false);
  }
};

// Add these helper functions inside your component but before the return statement

// Updates both formData and teamDetails for accommodation changes
const updateAccommodationState = (isRequired, selectedDays = []) => {
  // Update formData
  setFormData(prev => ({
    ...prev,
    accommodation: selectedDays.length > 0 ? selectedDays[selectedDays.length - 1] : "",
    accommodationDays: selectedDays,
  }));
  
  // Update teamDetails if it exists
  if (teamDetails) {
    setTeamDetails(prevDetails => ({
      ...prevDetails,
      accommodation: isRequired ? "Required" : "Not Required",
      accommodationDays: selectedDays,
      checkoutDate: calculateCheckoutDate(selectedDays)
    }));
  }
};

// Calculate checkout date based on selected days
const calculateCheckoutDate = (days) => {
  if (!days || days.length === 0) return "N/A";
  
  return days.includes("March 27, 2025") ? 
    "March 28, 2025" : "March 27, 2025";
};

// Handle day selection checkbox changes
const handleDaySelection = (day, isChecked) => {
  let newDays = [...(formData.accommodationDays || [])];
  
  if (isChecked && !newDays.includes(day)) {
    newDays.push(day);
  } else if (!isChecked) {
    newDays = newDays.filter(d => d !== day);
  }
  
  // If no days selected, set accommodation to not required
  if (newDays.length === 0) {
    updateAccommodationState(false, []);
    return;
  }
  
  updateAccommodationState(true, newDays);
};

  return (
    <div className={styles.confirmationContainer}>
      <Navbar />
      <h1 className={styles.heading}>Registration Confirmation</h1>
      
      {/* Error notification component */}
      {error && (
        <div className={styles.notificationWrapper} ref={errorNotificationRef}>
          <div className={styles.errorNotification}>
            <div className={styles.notificationIcon}>
              <svg viewBox="0 0 24 24" className={styles.errorIcon}>
                <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm1 18h-2v-2h2zm0-4h-2V6h2z"></path>
              </svg>
            </div>
            <div className={styles.notificationContent}>
              <h3 className={styles.notificationTitle}>Error</h3>
              <p className={styles.notificationMessage}>{error}</p>
            </div>
            <button 
              className={styles.notificationClose}
              onClick={() => setError(null)}
              aria-label="Close notification"
            >
              <svg viewBox="0 0 24 24">
                <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Success message */}
      {submitSuccess && (
        <div className={styles.notificationWrapper} ref={successNotificationRef}>
          <div className={styles.successNotification}>
            <div className={styles.notificationIcon}>
              <svg viewBox="0 0 24 24" className={styles.successIcon}>
                <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm6.93 8.2l-8.15 8.15-3.7-3.7a1 1 0 00-1.41 1.41l4.4 4.4a1 1 0 001.41 0l8.85-8.85a1 1 0 00-1.4-1.41z"></path>
              </svg>
            </div>
            <div className={styles.notificationContent}>
              <h3 className={styles.notificationTitle}>Payment Details Submitted!</h3>
              <p className={styles.notificationMessage}>
                Your payment and documents have been received and are pending verification. 
                You will receive a confirmation email soon.
              </p>
            </div>
            <button 
              className={styles.notificationClose}
              onClick={() => setSubmitSuccess(false)}
              aria-label="Close notification"
            >
              <svg viewBox="0 0 24 24">
                <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className={styles.container}>
        <form onSubmit={handleGetDetails}>
          <div className={styles.section}>
            <label className={styles.label}>Team Name:</label>
            <select
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              className={`${styles.input} ${styles.selectDrop}`}
              required
            >
              <option value="">Select your team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <label className={styles.label}>Team Leader Name:</label>
            <select
              name="teamLeaderName"
              value={formData.teamLeaderName}
              onChange={handleChange}
              className={`${styles.input} ${styles.selectDrop}`}
              required
            >
              <option value="">Select team leader</option>
              {teamLeaders.map((leader, index) => (
                <option key={index} value={leader}>
                  {leader}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <span className={styles.loadingSpinner}>
                <FaSpinner className={styles.spinnerIcon} /> Loading...
              </span>
            ) : (
              "Get Details"
            )}
          </button>
        </form>
      </div>

      {/* Team Details Container */}
      {teamDetails && (
        <div className={`${styles.container} ${styles.detailsContainer}`}>
          <h2 className={styles.detailsHeading}>Team Details</h2>

          <div className={styles.teamDetailsContainer}>
            <div className={styles.teamInfoSection}>
              <h3 className={styles.infoSectionHeading}>Registration Information</h3>
              <p className={styles.detailsText}>
                <strong>Team Name:</strong> {teamDetails.teamName}
              </p>
              <p className={styles.detailsText}>
                <strong>Status:</strong> {teamDetails.registrationStatus}
              </p>
              <p className={styles.detailsText}>
                <strong>Registration Date:</strong> {teamDetails.registrationDate}
              </p>
            </div>

            <div className={styles.teamInfoSection}>
              <h3 className={styles.infoSectionHeading}>College Information</h3>
              <p className={styles.detailsText}>
                <strong>College/Institution:</strong> {teamDetails.collegeName}
              </p>
              <p className={styles.detailsText}>
                <strong>Degree:</strong> {teamDetails.degree}
              </p>
            </div>

            <div className={styles.teamInfoSection}>
              <h3 className={styles.infoSectionHeading}>Team Information</h3>
              <p className={styles.detailsText}>
                <strong>Team Leader:</strong> {teamDetails.teamLeaderName}
              </p>
              <p className={styles.detailsText}>
                <strong>Team Size:</strong> {teamDetails.teamSize} members
              </p>
              
              {teamDetails.mentor && (
                <div className={styles.mentorInfo}>
                  <p className={styles.detailsText}>
                    <strong>Mentor Name:</strong> {teamDetails.mentor?.name || "Not specified"}
                  </p>
                  <p className={styles.detailsText}>
                    <strong>Mentor Contact:</strong> {teamDetails.mentor?.phone || "Not specified"}
                  </p>
                </div>
              )}
            </div>

            <div className={styles.teamMembersSection}>
              <h3 className={styles.infoSectionHeading}>Team Members</h3>
              <div className={styles.membersGrid}>
                {teamDetails.members.map((member, index) => (
                  <div key={index} className={styles.memberCard}>
                    <div className={styles.memberHeader}>
                      <span className={styles.memberName}>{member.name}</span>
                      <span className={styles.memberRole}>{member.role}</span>
                    </div>
                    <p className={styles.memberDetail}>
                      <strong>Email:</strong> {member.email}
                    </p>
                    {member.phone && (
                      <p className={styles.memberDetail}>
                        <strong>Phone:</strong> {member.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accommodation Details Container */}
      {teamDetails && (
        <div className={`${styles.container} ${styles.accommodationContainer}`}>
          <h2 className={styles.detailsHeading}>Accommodation Details</h2>
          
          <div className={styles.accommodationDetailsContainer}>
            {/* Selection Section */}
            <div className={styles.section}>
              <p className={styles.accommodationInfo}>
                <strong>Note:</strong> Accommodation costs ₹100 per day per team member.
              </p>
              
              <div className={styles.radioGroup}>
                <p className={styles.radioLabel}>Do you need accommodation?</p>
                
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="accommodation-yes"
                    name="needAccommodation"
                    checked={formData.accommodation !== ""}
                    onChange={() => {
                      const defaultDays = ["March 26, 2025"];
                      updateAccommodationState(true, defaultDays);
                    }}
                  />
                  <label htmlFor="accommodation-yes">Yes, we need accommodation</label>
                </div>
                
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="accommodation-no"
                    name="needAccommodation"
                    checked={formData.accommodation === ""}
                    onChange={() => updateAccommodationState(false, [])}
                  />
                  <label htmlFor="accommodation-no">No, we don't need accommodation</label>
                </div>
              </div>
              
              {/* Day selection checkboxes */}
              {formData.accommodation !== "" && (
                <div className={styles.checkboxGroup}>
                  <p className={styles.checkboxLabel}>Select days for accommodation:</p>
                  
                  <div className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      id="day-26"
                      name="day-26"
                      checked={formData.accommodationDays?.includes("March 26, 2025") || false}
                      onChange={(e) => handleDaySelection("March 26, 2025", e.target.checked)}
                    />
                    <label htmlFor="day-26">March 26, 2025 (₹100 per person)</label>
                  </div>
                  
                  <div className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      id="day-27"
                      name="day-27"
                      checked={formData.accommodationDays?.includes("March 27, 2025") || false}
                      onChange={(e) => handleDaySelection("March 27, 2025", e.target.checked)}
                    />
                    <label htmlFor="day-27">March 27, 2025 (₹100 per person)</label>
                  </div>
                </div>
              )}

              {formData.accommodation !== "" && teamDetails && (
                <div className={styles.priceSummary}>
                  <p>
                    <strong>Total Cost Estimate:</strong> ₹{
                      teamDetails.teamSize * 
                      ((formData.accommodationDays?.length || 0) * 100)
                    } for {teamDetails.teamSize} team members
                    {formData.accommodationDays?.length > 0 && ` (${formData.accommodationDays.length} day${formData.accommodationDays.length > 1 ? 's' : ''})`}
                  </p>
                </div>
              )}
            </div>

            <hr className={styles.divider} />
            
            <div className={styles.section}>
              <h3 className={styles.memberHeading}>Current Selection</h3>
              
              <p>
                <strong>Accommodation Status:</strong> {teamDetails.accommodation}
              </p>
              
              {teamDetails.accommodation === "Required" && (
                <>
                  <p>
                    <strong>Days Selected:</strong> {
                      teamDetails.accommodationDays?.join(", ") || teamDetails.checkoutDate
                    }
                  </p>
                  <p>
                    <strong>Duration:</strong> {
                      teamDetails.accommodationDays?.length || 
                      (teamDetails.checkoutDate === "March 26, 2025" ? 1 : 
                      teamDetails.checkoutDate === "March 27, 2025" ? 1 : 
                      teamDetails.checkoutDate === "March 28, 2025" ? 2 : 0)
                    } day(s)
                  </p>
                  <p>
                    <strong>Total Cost:</strong> ₹{
                      teamDetails.teamSize * 
                      ((teamDetails.accommodationDays?.length || 
                        (teamDetails.checkoutDate === "March 26, 2025" ? 1 : 
                        teamDetails.checkoutDate === "March 27, 2025" ? 1 : 
                        teamDetails.checkoutDate === "March 28, 2025" ? 2 : 0)) * 100)
                    } (₹100 per person per day)
                  </p>
                </>
              )}
              
              {teamDetails.accommodation !== "Required" && (
                <p>
                  <strong>Note:</strong> No accommodation has been requested for this team.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {teamDetails && (
        <div className={`${styles.container} ${styles.feeSummaryContainer}`}>
          <h2 className={styles.detailsHeading}>Total Applicable Fees</h2>
          
          <div className={styles.feeSummaryContent}>
            <div className={styles.feeBreakdown}>
              <div className={styles.feeItem}>
                <p className={styles.feeLabel}>Team Registration Fee:</p>
                <p className={styles.feeAmount}>₹1,500</p>
              </div>
              
              <div className={styles.feeItem}>
                <p className={styles.feeLabel}>
                  Accommodation Fee 
                  {teamDetails.accommodation === "Required" && 
                    ` (${teamDetails.accommodationDays?.length || 
                      (teamDetails.checkoutDate === "March 26, 2025" ? 1 : 
                      teamDetails.checkoutDate === "March 27, 2025" ? 1 : 
                      teamDetails.checkoutDate === "March 28, 2025" ? 2 : 0)} days × ${teamDetails.teamSize} members × ₹100)`}:
                </p>
                <p className={styles.feeAmount}>
                  {teamDetails.accommodation === "Required" ? 
                    `₹${teamDetails.teamSize * 
                      ((teamDetails.accommodationDays?.length || 
                        (teamDetails.checkoutDate === "March 26, 2025" ? 1 : 
                        teamDetails.checkoutDate === "March 27, 2025" ? 1 : 
                        teamDetails.checkoutDate === "March 28, 2025" ? 2 : 0)) * 100)}` : 
                    "₹0"
                  }
                </p>
              </div>
              
              <hr className={styles.feeDivider} />
              
              <div className={`${styles.feeItem} ${styles.feeTotal}`}>
                <p className={styles.feeLabel}>Total Amount Due:</p>
                <p className={styles.feeAmount}>
                  ₹{1500 + (
                    teamDetails.accommodation === "Required" ?
                      teamDetails.teamSize * 
                      ((teamDetails.accommodationDays?.length || 
                        (teamDetails.checkoutDate === "March 26, 2025" ? 1 : 
                        teamDetails.checkoutDate === "March 27, 2025" ? 1 : 
                        teamDetails.checkoutDate === "March 28, 2025" ? 2 : 0)) * 100) : 
                      0
                  )}
                </p>
              </div>
            </div>
            
            <div className={styles.feeNote}>
              <p>
                <strong>Note:</strong> Team registration fee is fixed at ₹1,500 per team, regardless of team size. 
                Accommodation fee is calculated at the rate of ₹100 per person per day.
              </p>
            </div>
          </div>
        </div>
      )}

      {teamDetails && (
        <div className={`${styles.container} ${styles.paymentDetailsContainer}`}>
          <h2 className={styles.detailsHeading}>Payment Details</h2>
          
          <div className={styles.paymentContent}>
            <form onSubmit={handleSubmitConfirmation}>
              <div className={styles.paymentSection}>
                <h3 className={styles.paymentSectionTitle}>Step 1: Upload College NOC</h3>
                
                <div className={styles.uploadContainer}>
                  <div className={styles.uploadHeader}>
                    <label htmlFor="noc-upload" className={styles.uploadLabel}>
                      Upload College NOC (PDF only)
                      <span className={styles.requiredIndicator}>*</span>
                    </label>
                    
                    <a 
                      href={NOCTemplate} 
                      download="NOC_Template.doc"
                      className={styles.downloadButton}
                      title="Download NOC Template"
                    >
                      <FaDownload /> Download NOC Template
                    </a>
                  </div>
                  
                  <input 
                    type="file" 
                    id="noc-upload" 
                    className={styles.uploadInput}
                    accept=".pdf"
                    ref={nocInputRef}
                    onChange={handleNocFileChange}
                  />
                  <p className={styles.uploadHelper}>
                    <strong>Step 1:</strong> Download the NOC template using the button above
                  </p>
                  <p className={styles.uploadHelper}>
                    <strong>Step 2:</strong> Get it signed by your college authorities
                  </p>
                  <p className={styles.uploadHelper}>
                    <strong>Step 3:</strong> If team is inter-college then merge all NOCs into a single PDF file
                  </p>
                  <p className={styles.uploadHelper}>
                    Maximum file size: 5MB. Only PDF files are accepted.
                  </p>
                </div>
              </div>
              
              <div className={styles.paymentSection}>
                <h3 className={styles.paymentSectionTitle}>Step 2: Make Payment</h3>
                
                <div className={styles.qrCodeContainer}>
                  <img 
                    src={QR} 
                    alt="Payment QR Code" 
                    className={styles.qrCodeImage}
                  />
                  
                  <div className={styles.qrInstructions}>
                    <p>
                      <strong>Scan the QR code above to make your payment</strong>
                    </p>
                    <p>
                      Amount to Pay: ₹{1500 + (
                        teamDetails.accommodation === "Required" ?
                          teamDetails.teamSize * 
                          ((teamDetails.accommodationDays?.length || 
                            (teamDetails.checkoutDate === "March 26, 2025" ? 1 : 
                            teamDetails.checkoutDate === "March 27, 2025" ? 1 : 
                            teamDetails.checkoutDate === "March 28, 2025" ? 2 : 0)) * 100) : 
                          0
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={styles.paymentSection}>
                <h3 className={styles.paymentSectionTitle}>Step 3: Enter Transaction Details</h3>
                
                <div className={styles.transactionForm}>
                  <label htmlFor="transaction-id" className={styles.transactionLabel}>
                    Unique Transaction Reference (UTR) ID
                    <span className={styles.requiredIndicator}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="transaction-id" 
                    className={styles.transactionInput}
                    placeholder="Enter UTR number"
                    ref={transactionInputRef}
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  <p className={styles.transactionHelper}>
                    This can be found in your UPI payment app history or bank statement
                  </p>
                </div>
              </div>

              <div className={styles.paymentSection}>
                <h3 className={styles.paymentSectionTitle}>Step 4: Upload Payment Receipt</h3>
                
                <div className={styles.uploadContainer}>
                  <label htmlFor="receipt-upload" className={styles.uploadLabel}>
                    Upload Payment Receipt Screenshot/Image
                    <span className={styles.requiredIndicator}>*</span>
                  </label>
                  
                  <input 
                    type="file" 
                    id="receipt-upload" 
                    className={styles.uploadInput}
                    accept="image/png, image/jpeg, image/jpg"
                    ref={receiptInputRef}
                    onChange={handleReceiptFileChange}
                  />
                  <p className={styles.uploadHelper}>
                    Maximum file size: 5MB. Accepted formats: JPG, JPEG, PNG
                  </p>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className={styles.loadingSpinner}>
                        <FaSpinner className={styles.spinnerIcon} /> Processing...
                      </span>
                    ) : (
                      "Submit Payment Details"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Update the error notification in the payment details section */}
          {submitError && (
            <div className={styles.notificationWrapper} ref={submitErrorNotificationRef}>
              <div className={styles.errorNotification}>
                <div className={styles.notificationIcon}>
                  <svg viewBox="0 0 24 24" className={styles.errorIcon}>
                    <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm1 18h-2v-2h2zm0-4h-2V6h2z"></path>
                  </svg>
                </div>
                <div className={styles.notificationContent}>
                  <h3 className={styles.notificationTitle}>Error</h3>
                  <p className={styles.notificationMessage}>{submitError}</p>
                </div>
                <button 
                  className={styles.notificationClose}
                  onClick={() => setSubmitError(null)}
                  aria-label="Close notification"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          <div className={styles.paymentNote}>
            <p>
              <strong>Important:</strong> Your registration will only be confirmed after verification of both the College NOC and successful payment.
            </p>
            <p>
              For payment issues, contact us at techpragyandev@gmail.com or Contact Tech Support.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
