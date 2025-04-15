import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PendingApplications.css";

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/pending-applications")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);

  const handleDecision = async (index, decision, petId, applicantEmail) => {
    try {
      const endpoint =
        decision === "approve"
          ? "http://localhost:5001/api/approve-application"
          : "http://localhost:5001/api/reject-application";

      await axios.post(endpoint, {
        petId,
        applicantEmail,
      });

      // Remove the handled application from UI
      setApplications((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };

  return (
    <div className="pending-container">
      <h1 className="pending-heading">Pending Adoption Applications</h1>
      <div className="pending-grid">
        {applications.map((app, index) => (
          <div key={index} className="pending-card">
            <h2 className="pending-name">
              {app.petDetails.petName} ({app.petDetails.petType})
            </h2>
            <div className="pending-details">
              <p><strong>Pet Age:</strong> {app.petDetails.age} years</p>
              <p><strong>Location:</strong> {app.petDetails.area}</p>
              <p><strong>Contact (Email):</strong> {app.petDetails.email}</p>
              <p><strong>Contact (Phone):</strong> {app.petDetails.phone}</p>
            </div>

            <div className="pending-details">
              <p><strong>User Email:</strong> {app.userEmail}</p>
              <p><strong>User Phone No.:</strong> {app.userPhone}</p>
              <p><strong>Pet Living Situation:</strong> {app.livingSituation}</p>
              <p><strong>Previous Pet Experience:</strong> {app.experience}</p>
              <p><strong>Any Other Pets?</strong> {app.otherPets}</p>
            </div>

            <div className="pending-actions">
              <button
                onClick={() =>
                  handleDecision(index, "approve", app.petDetails.petId, app.userEmail)
                }
                className="approve-btn"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleDecision(index, "reject", app.petDetails.petId, app.userEmail)
                }
                className="reject-btn"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApplications;
