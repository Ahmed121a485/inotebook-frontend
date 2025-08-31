import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
     

      if (json.success) {
        localStorage.setItem('token', json.JwtToken); // ✅ store token
        toast.success("Logged in successfully"); // ✅ toast instead of props.showAlert
        navigate("/home");
      } else {
        toast.error("Invalid credentials"); // ❌ wrong login
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later."); // ⚠️ error toast
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container my-5'>
      <h1 className='mb-4'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={credentials.email} 
            onChange={onChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={credentials.password} 
            onChange={onChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">Login</button>
      </form>
    </div>
  );
};

export default Login;
