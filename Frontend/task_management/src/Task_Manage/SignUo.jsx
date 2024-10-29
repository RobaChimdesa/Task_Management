import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () =>{
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
        password2:""
    });

    
}