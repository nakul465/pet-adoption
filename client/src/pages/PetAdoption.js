import React from "react";
import { useLocation } from "react-router-dom";
import "./PetAdoption.css";

const PetAdoption = () => {
  const location = useLocation();
  const pet = location.state?.pet;

  return (
    <div className="pet-adoption-container">
      <h1 className="adoption-heading">Pet Adoption Application</h1>
      
      {/* Pet Info Box */}
      <div className="pet-info-box">
        <h2>{pet?.petName}</h2>
        <p><strong>Age:</strong> {pet?.age}</p>
        <p><strong>Area:</strong> {pet?.area}</p>
        <p><strong>Justification:</strong> {pet?.justification}</p>
        <p><strong>Pet Type:</strong> {pet?.petType}</p>
      </div>
      
      {/* Adoption Form */}
      <form className="adoption-form">
        <label>Email:</label>
        <input type="email" name="email" required />
        
        <label>Phone No.:</label>
        <input type="tel" name="phone" required />
        
        <label>Pet Living Situation:</label>
        <textarea name="livingSituation" required></textarea>
        
        <label>Previous Pet Experience:</label>
        <textarea name="experience" required></textarea>
        
        <label>Any Other Pets:</label>
        <textarea name="otherPets" required></textarea>
        
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PetAdoption;
