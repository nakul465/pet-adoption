import React, { useState } from 'react';
import './PostPet.css';
import image from '../images/1.jpeg'; // Importing the image

const PostPet = () => {
  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    area: '',
    justification: '',
    email: '',
    phone: '',
    petType: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5001/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Pet posted for adoption successfully!');
      setFormData({
        petName: '',
        age: '',
        area: '',
        justification: '',
        email: '',
        phone: '',
        petType: ''
      });
    } else {
      alert('Failed to post pet. Please try again.');
    }
  };

  return (
    <div className="post-pet-container">
      {/* Left: Image */}
      <div className="image-container">
        <img src={image} alt="Pet Adoption" className="post-pet-image" />
      </div>

      {/* Right: Form */}
      <div className="form-container">
        <h2>Post a Pet for Adoption</h2>
        <form onSubmit={handleSubmit} className="post-pet-form">
          <label>Pet Name:</label>
          <input type="text" name="petName" value={formData.petName} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />

          <label>Area:</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} required />

          <label>Justification:</label>
          <textarea name="justification" value={formData.justification} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Pet Type:</label>
          <select name="petType" value={formData.petType} onChange={handleChange} required>
            <option value="">Select Pet Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>

          <button type="submit">Post Pet</button>
        </form>
      </div>
    </div>
  );
};

export default PostPet;
