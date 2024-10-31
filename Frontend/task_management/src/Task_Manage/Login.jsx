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
import { Link } from "react-router-dom";
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
    <div  className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg
    shadow-lg mb-24">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
       Login
      </h2>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"

           />  
        </div>
        <div>
          <label  className="block text-gray-600 font-medium mb-1" >Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
        </div>
        <button type="submit" 
         className="w-full bg-slate-300 text-black hover:text-white hover:bg-slate-600 py-2 rounded-md font-semibold  transition duration-200 
         mt-16"
     
        >Login</button>
        <p className="text-center text-gray-600 mt-4">
       did't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          signup
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Login;