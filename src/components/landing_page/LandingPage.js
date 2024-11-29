import React, { useState } from "react";
import "./css/bootstrap.min.css";
import "./css/themify-icons.css";
import "./css/style.css";

import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState({
    personalized: false,
    progressTracking: false,
    centralizedDashboard: false,
  });

  const toggleDropdown = (feature) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [feature]: !prevState[feature],
    }));
  };

  return (
    <div>
      {/* Fixed Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container" style={{ backgroundColor: '#343c44'}}>
          <a className="navbar-brand" href="#home" style = {{color:'#343c44'}}>
            . . . VPS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="btn btn-outline-dark" href="#features" style = {{color: '#ffffff'}}>
                  FEATURES
                </a>
              </li>
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-dark" style = {{color: '#ffffff'}}>
                  LOGIN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>

          <h1 className="display-3" style = {{color:'#99bee3'}}>VPS</h1>

          <h1> VPS </h1>
          <p className="lead">
            Virtual Placement Support: The one-stop solution for College Placements
          </p>
        </div>
      </header>

      {/* Features Section */}
      <div className="section light-bg" id="features">
        <div className="container">
          <div className="section-title">
            <h3>Features for the student in you</h3>
          </div>
          <div className="row" style={{color : 'black'}}>
            {[
              {
                icon: "ti-face-smile",
                title: "Personalized",
                text: "Tailored success plans based on individual student profiles, skill levels, and career goals.",
                featureKey: "personalized",
              },
              {
                icon: "ti-settings",
                title: "Progress Tracking",
                text: "Monitor your journey with real-time updates and insights on your placement preparation progress.",
                featureKey: "progressTracking",
              },
              {
                icon: "ti-lock",
                title: "Centralized Dashboard",
                text: "Manage job applications, deadlines, and updates for internships and placement opportunities.",
                featureKey: "centralizedDashboard",
              },
            ].map((feature, idx) => (
              <div className="col-lg-4" key={idx}>
                <div className="card features">
                  <div className="card-body">
                    <div className="media">
                      <span className={`${feature.icon} gradient-fill ti-3x mr-3`}></span>
                      <div className="media-body">
                        <h4 className="card-title">
                          {feature.title}
                          <button
                            className="btn btn-link"
                            onClick={() => toggleDropdown(feature.featureKey)}
                            aria-expanded={isOpen[feature.featureKey]}
                          >
                            {isOpen[feature.featureKey] ? "Hide" : "Show"} Details
                          </button>
                        </h4>
                        <div
                          className={`collapse ${
                            isOpen[feature.featureKey] ? "show" : ""
                          }`}
                        >
                          <p style={{ color: 'black' }}>{feature.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
