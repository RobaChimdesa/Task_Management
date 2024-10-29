// import React, {useState} from "react";
// import axios from 'axios'
// // import {useNavigate} from 'react-router-dom';
// import { useNavigate } from "react-router-dom";



// const Login = () =>{
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         axios.post('http://localhost:8000/api/login/',{
//             username,
//             password,
//         })
//         .then((response) => {
//             localStorage.setItem('token', response.data.access);
//             navigate('/tasks');
//             console.log('success')
//         })
//         .catch(()=>{
//             setError("Invalid username or password");
//             console.log('no login')
//         })
//     };


//     return (
//         <div>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </div>

//     );


// }

// export default Login
// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/login/", formData)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        navigate("/tasks"); // Redirect to tasks after successful login
      })
      .catch((error) => {
        setError("Invalid username or password.");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;