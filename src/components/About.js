// src/components/AboutUs.js
import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">📒 About iNotebook</h1>
        <p className="lead text-muted">
          A secure, simple, and stylish way to keep all your notes online.
        </p>
        <hr className="w-25 mx-auto border-3 border-primary" />
      </div>

      {/* About Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            className="img-fluid rounded-4 shadow-lg border border-3 border-primary"
            alt="iNotebook"
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold text-dark">✨ What is iNotebook?</h2>
          <p className="text-secondary fs-5">
            iNotebook is your <strong>personal online notebook</strong> where you can 
            <span className="text-primary fw-semibold"> create, edit, and delete</span> 
            your notes securely. All your notes are linked to your account — so you can 
            access them anytime, anywhere by logging in with your email.
          </p>
          <p className="text-secondary fs-5">
            Whether it's study notes, work ideas, or personal reminders, iNotebook 
            makes note‑taking <span className="fw-semibold">fast, simple, and safe.</span>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="row text-center g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 feature-card">
            <div className="card-body">
              <h3 className="fw-bold text-primary">🔒 Secure</h3>
              <p className="text-muted">
                Your notes are private & protected — only you can access them using 
                your login credentials.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 feature-card">
            <div className="card-body">
              <h3 className="fw-bold text-success">📝 Easy to Use</h3>
              <p className="text-muted">
                Add, edit, or delete notes with just a few clicks in a clean and 
                minimal interface.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 rounded-4 feature-card">
            <div className="card-body">
              <h3 className="fw-bold text-warning">🌍 Accessible</h3>
              <p className="text-muted">
                Access your notes anytime, from any device, by simply logging in to 
                your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5">
        <h2 className="fw-bold text-dark">🚀 Ready to get started?</h2>
        <p className="text-muted fs-5">
          Sign up today and keep your thoughts safe, organized, and accessible everywhere.
        </p>
        <a href="/Signup" className="btn btn-lg btn-primary rounded-pill shadow">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default About;
