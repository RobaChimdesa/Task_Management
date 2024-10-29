// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors and success message
    setErrors({});
    setSuccessMessage("");

    // Post the data to the Django API
    axios
      .post("http://localhost:8000/api/register/", formData)
      .then((response) => {
        setSuccessMessage("User registered successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);  // Set errors returned by the API
        } else {
          setErrors({ detail: "Something went wrong. Please try again." });
        }
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          {errors.password2 && <p style={{ color: "red" }}>{errors.password2}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
    </div>
  );
};

export default Signup;