import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "../styles/RegistrationField.module.css";
import background from "../assets/registrationBackground.webp";

const RegistrationField = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    collegeName: "",
    state: "",
    teamLeader: {
      name: "",
      email: "",
      phone: "",
    },
    mentor: {
      name: "",
      phone: "",
    },
    degree: "",
    yearOfStudy: "",
    problemId: "",
    teamSize: 4,
    members: Array(4)
      .fill()
      .map(() => ({
        name: "",
        email: "",
        phone: "",
      })),
    presentation: null,
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    return phone.match(/^\d{10}$/);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
    if (!formData.collegeName.trim())
      newErrors.collegeName = "College name is required";
    if (!formData.state) newErrors.state = "State selection is required";

    // Validate team leader
    if (!formData.teamLeader.name.trim())
      newErrors.leaderName = "Team leader name is required";
    if (!validateEmail(formData.teamLeader.email))
      newErrors.leaderEmail = "Invalid email format";
    if (!validatePhone(formData.teamLeader.phone))
      newErrors.leaderPhone = "Phone must be 10 digits";

    // Validate mentor details
    if (!formData.mentor.name.trim())
      newErrors.mentorName = "Mentor name is required";
    if (!validatePhone(formData.mentor.phone))
      newErrors.mentorPhone = "Mentor phone must be 10 digits";

    // Validate team members
    const memberErrors = [];
    formData.members.forEach((member, index) => {
      const memberError = {};
      if (!member.name.trim()) memberError.name = "Name is required";
      if (!validateEmail(member.email))
        memberError.email = "Invalid email format";
      if (!validatePhone(member.phone))
        memberError.phone = "Phone must be 10 digits";
      if (Object.keys(memberError).length > 0)
        memberErrors[index] = memberError;
    });
    if (memberErrors.length > 0) newErrors.members = memberErrors;

    // Validate presentation
    if (!formData.presentation) {
      newErrors.presentation = "Presentation file is required";
    } else {
      if (formData.presentation.size > 15 * 1024 * 1024) {
        newErrors.presentation = "File size must be less than 15MB";
      }
      if (!formData.presentation.type.includes("pdf")) {
        newErrors.presentation = "Only PDF files are allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        presentation: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTeamLeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      teamLeader: {
        ...prev.teamLeader,
        [name]: value,
      },
    }));
  };

  const handleMentorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      mentor: {
        ...prev.mentor,
        [name]: value,
      },
    }));
  };

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      teamSize: size,
      members: Array(size)
        .fill()
        .map((_, i) => prev.members[i] || { name: "", email: "", phone: "" }),
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: "", message: "" });
    setIsLoading(true);

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please correct the errors in the form",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("presentation", formData.presentation);
      const formDataWithoutFile = { ...formData };
      delete formDataWithoutFile.presentation;
      formDataToSend.append("data", JSON.stringify(formDataWithoutFile));

      const response = await fetch(
        "https://tech-pragyan-server-computer.el.r.appspot.com/submit",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setSubmitStatus({
        type: "success",
        message: data.message || "Registration submitted successfully!",
      });

      console.log(data.data);

      setTimeout(() => {
        window.location.href = "/Home";
      }, 10000);
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.message || "Failed to submit registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.RegistrationField}>
      <div className={styles.background}>
        <img
          src={background}
          className={styles.backgroundImage}
          alt="background"
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.container}>
        <h2 className={styles.heading}>Registration Form</h2>

        {submitStatus.message && (
          <div
            className={`${styles.statusMessage} ${
              submitStatus.type === "error"
                ? styles.errorMessage
                : styles.successMessage
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <input
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleInputChange}
          placeholder="Team Name"
          className={styles.input}
        />
        {errors.teamName && <p className={styles.error}>{errors.teamName}</p>}

        <input
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleInputChange}
          placeholder="College Name"
          className={styles.input}
        />
        {errors.collegeName && (
          <p className={styles.error}>{errors.collegeName}</p>
        )}

        <select
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          className={`${styles.input} ${styles.selectDrop}`}
        >
          <option value="">Select State/Union Territory</option>
          {[
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Jammu and Kashmir",
            "Ladakh",
            "Lakshadweep",
            "Puducherry",
          ].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <p className={styles.error}>{errors.state}</p>}

        <input
          type="text"
          name="name"
          value={formData.teamLeader.name}
          onChange={handleTeamLeaderChange}
          placeholder="Team Leader Name"
          className={styles.input}
        />
        {errors.leaderName && (
          <p className={styles.error}>{errors.leaderName}</p>
        )}

        <input
          type="email"
          name="email"
          value={formData.teamLeader.email}
          onChange={handleTeamLeaderChange}
          placeholder="Team Leader Email"
          className={styles.input}
        />
        {errors.leaderEmail && (
          <p className={styles.error}>{errors.leaderEmail}</p>
        )}

        <input
          type="tel"
          name="phone"
          value={formData.teamLeader.phone}
          onChange={handleTeamLeaderChange}
          placeholder="Team Leader Phone Number"
          className={styles.input}
        />
        {errors.leaderPhone && (
          <p className={styles.error}>{errors.leaderPhone}</p>
        )}

        <select
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
          className={`${styles.input} ${styles.selectDrop}`}
          required
        >
          <option value="">Select Degree Pursuing</option>
          <option value="BE">BE</option>
          <option value="B.Tech">B.Tech</option>
          <option value="ME">ME</option>
          <option value="M.Tech">M.Tech</option>
          <option value="BCS">BCS</option>
          <option value="MCS">MCS</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="yearOfStudy"
          value={formData.yearOfStudy}
          onChange={handleInputChange}
          placeholder="Current Year of Study"
          required
          className={styles.input}
        />

        <input
          type="text"
          name="problemId"
          value={formData.problemId}
          onChange={handleInputChange}
          placeholder="Problem statement number (For Open innovation enter 1000)"
          required
          className={styles.input}
        />

        
        <div className={styles.memberSection}>
          <h3 className={styles.label}>Mentor Details:</h3>
          <input
            type="text"
            name="name"
            value={formData.mentor.name}
            onChange={handleMentorChange}
            placeholder="Mentor Name"
            className={styles.input}
          />
          {errors.mentorName && (
            <p className={styles.error}>{errors.mentorName}</p>
          )}

          <input
            type="tel"
            name="phone"
            value={formData.mentor.phone}
            onChange={handleMentorChange}
            placeholder="Mentor Phone Number"
            className={styles.input}
          />
          {errors.mentorPhone && (
            <p className={styles.error}>{errors.mentorPhone}</p>
          )}
        </div>


        <h3 className={styles.label}>Select team size 4-6</h3>
        <select
          value={formData.teamSize}
          onChange={handleTeamSizeChange}
          className={`${styles.input} ${styles.selectDrop}`}
        >
          <option value="" disabled>
            Number of Team Members (4-6)
          </option>
          {[4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        {formData.members.map((member, index) => (
          <div key={index} className={styles.memberSection}>
            <h3 className={styles.label}>Member {index + 1} Details:</h3>

            <input
              type="text"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              placeholder="Name"
              className={styles.input}
            />
            {errors.members?.[index]?.name && (
              <p className={styles.error}>{errors.members[index].name}</p>
            )}

            <input
              type="email"
              value={member.email}
              onChange={(e) =>
                handleMemberChange(index, "email", e.target.value)
              }
              placeholder="Email"
              className={styles.input}
            />
            {errors.members?.[index]?.email && (
              <p className={styles.error}>{errors.members[index].email}</p>
            )}

            <input
              type="tel"
              value={member.phone}
              onChange={(e) =>
                handleMemberChange(index, "phone", e.target.value)
              }
              placeholder="Phone Number"
              className={styles.input}
            />
            {errors.members?.[index]?.phone && (
              <p className={styles.error}>{errors.members[index].phone}</p>
            )}
          </div>
        ))}

        <div className={styles.fileUpload}>
          <h3 className={styles.fileHint}>
            Upload PPT according to the official format provided by us in PDF
            format only
          </h3>
          <span className={styles.fileHint}>Max size: 15MB</span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleInputChange}
            className={styles.input}
          />
          {errors.presentation && (
            <p className={styles.error}>{errors.presentation}</p>
          )}
        </div>

        {submitStatus.message && (
          <div
            className={`${styles.statusMessage} ${
              submitStatus.type === "error"
                ? styles.errorMessage
                : styles.successMessage
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.loadingSpinner}>
              <FaSpinner className={styles.spinnerIcon} /> Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationField;
