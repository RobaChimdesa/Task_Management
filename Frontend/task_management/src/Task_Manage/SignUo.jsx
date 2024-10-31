// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        setSuccessMessage(
          "User registered successfully! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // Set errors returned by the API
        } else {
          setErrors({ detail: "Something went wrong. Please try again." });
        }
      });
  };

  return (
    <div
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg
    shadow-lg" 
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1" >{errors.username}</p>}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Confirm Password:
          </label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password2 && (
            <p className="text-red-500 text-sm mt-1">{errors.password2}</p>
          )}
        </div>

        <button type="submit"
         className="w-full bg-slate-300 text-black hover:text-white hover:bg-slate-600 py-2 rounded-md font-semibold  transition duration-200"
     
         >Sign Up</button>
         <p className="text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p> 
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
    </div>
  );
};

export default Signup;
