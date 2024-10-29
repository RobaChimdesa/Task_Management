// api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/", //  Django backend URL
});

// Add a request interceptor to include JWT token if it's available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // Get JWT token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;