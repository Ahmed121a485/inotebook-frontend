import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { name, email, password } = formData;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const text = await response.text();
      console.log("Signup request URL:", `${process.env.REACT_APP_API_URL}/api/auth/createuser`);

console.log("Raw response:", text);
let json;
try {
  json = JSON.parse(text);
} catch {
  console.error("Response was not JSON:", text);
  toast.error("Backend did not return JSON.");
  return;
}

      

      if (json.success) {
        // ✅ Save token and redirect
        localStorage.setItem('token', json.JwtToken);
        toast.success("Account created successfully");
        navigate("/home");
      } else {
        toast.error("Invalid details");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
