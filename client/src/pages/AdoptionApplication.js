import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./AdoptionApplication.css";

const AdoptionApplication = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const petDetails = {
    petName: params.get("name"),
    age: params.get("age"),
    area: params.get("area"),
    petType: params.get("type"),
    email: params.get("email"),
    phone: params.get("phone"),
  };

  const [formData, setFormData] = useState({
    userEmail: "",
    userPhone: "",
    livingSituation: "",
    experience: "",
    otherPets: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      petDetails,
      userEmail: formData.userEmail,
      userPhone: formData.userPhone,
      livingSituation: formData.livingSituation,
      experience: formData.experience,
      otherPets: formData.otherPets,
    };

    try {
      const response = await fetch("http://localhost:5001/api/adoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert("Adoption application submitted successfully!");
        setFormData({
          userEmail: "",
          userPhone: "",
          livingSituation: "",
          experience: "",
          otherPets: "",
        });
      } else {
        alert("Error submitting application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting adoption application:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="adoption-container">
      <h1 className="adoption-heading">Pet Adoption Application</h1>

      {/* Pet Details Box */}
      <div className="pet-details-box">
        <h2>{petDetails.petName}</h2>
        <p><strong>Age:</strong> {petDetails.age} years</p>
        <p><strong>Location:</strong> {petDetails.area}</p>
        <p><strong>Type:</strong> {petDetails.petType}</p>
        <p><strong>Contact:</strong> {petDetails.email} | {petDetails.phone}</p>
      </div>

      {/* Adoption Form */}
      <form className="adoption-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />

        <label>Phone No.:</label>
        <input
          type="tel"
          name="userPhone"
          value={formData.userPhone}
          onChange={handleChange}
          required
        />

        <label>Pet Living Situation:</label>
        <textarea
          name="livingSituation"
          value={formData.livingSituation}
          onChange={handleChange}
          required
        ></textarea>

        <label>Previous Pet Experience:</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        ></textarea>

        <label>Any Other Pets?</label>
        <input
          type="text"
          name="otherPets"
          value={formData.otherPets}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdoptionApplication;
