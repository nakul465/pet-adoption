import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PendingApplications.css";

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/pending");
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const buildPetId = (petDetails) => {
    return `${petDetails.petName.toLowerCase()}-${petDetails.petType.toLowerCase()}-${petDetails.age}-${petDetails.area.toLowerCase()}`;
  };

  const handleDecision = async (index, decision, petDetails, applicantEmail) => {
    try {
      const endpoint =
        decision === "approve"
          ? "http://localhost:5001/api/approve"
          : "http://localhost:5001/api/reject";

      const payload = {
        petId: buildPetId(petDetails),
        applicantEmail,
      };

      await axios.post(endpoint, payload);

      // Update local UI
      setApplications((prev) => {
        const updated = [...prev];
        updated[index].status = decision === "approve" ? "approved" : "rejected";
        return updated;
      });

      setMessage(`Application ${decision}d successfully.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(`Error during ${decision}:`, err);
      setMessage(`Failed to ${decision} application.`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="pending-container">
      <h1 className="pending-heading">Pending Adoption Applications</h1>
      {message && <div className="status-message">{message}</div>}

      <div className="pending-grid">
        {applications.map((app, index) => (
          <div key={index} className="pending-card">
            <h2 className="pending-name">
              {app.petDetails?.petName} ({app.petDetails?.petType})
            </h2>
            <div className="pending-details">
              <p><strong>Pet Age:</strong> {app.petDetails?.age} years</p>
              <p><strong>Location:</strong> {app.petDetails?.area}</p>
              <p><strong>Pet Email:</strong> {app.petDetails?.email}</p>
              <p><strong>Pet Phone:</strong> {app.petDetails?.phone}</p>
            </div>

            <div className="pending-details">
              <p><strong>User Email:</strong> {app.userEmail}</p>
              <p><strong>User Phone:</strong> {app.userPhone}</p>
              <p><strong>Living Situation:</strong> {app.livingSituation}</p>
              <p><strong>Experience:</strong> {app.experience}</p>
              <p><strong>Other Pets:</strong> {app.otherPets}</p>
            </div>

            <div className="pending-actions">
              {app.status === "approved" ? (
                <span className="status-approved">Approved</span>
              ) : app.status === "rejected" ? (
                <span className="status-rejected">Rejected</span>
              ) : (
                <>
                  <button
                    className="approve-btn"
                    onClick={() =>
                      handleDecision(index, "approve", app.petDetails, app.userEmail)
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() =>
                      handleDecision(index, "reject", app.petDetails, app.userEmail)
                    }
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApplications;
