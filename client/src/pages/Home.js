import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import mainImage from "../images/2.jpeg"; // The main circular image

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-text">
          Your Pets
          <br /> Are Our
          <br /> Priority
        </h1>
        <p className="hero-subtext">
          Ensure you are fully prepared to provide proper care and attention to your pet
          before welcoming them into your home.
        </p>
        <Link to="/pets" className="adopt-pet-button">
          Adopt a Pet 🐾
        </Link>
        {/* <button className="adopt-button">Adopt a Pet 🐾</button> */}
      </div>
      <div className="image-container">
        <img src={mainImage} alt="Pet Adoption" className="main-image" />
      </div>
    </div>
  );
};

export default Home;
