import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout= () =>{
 const navigate = useNavigate();
 
 useEffect(() =>{
localStorage.removeItem("acces_token");

localStorage.removeItem("refresh_token");
localStorage.removeItem("user_id");
navigate("/login");

},[navigate]);

 return <div>Logging you aout...</div>

}
export default Logout