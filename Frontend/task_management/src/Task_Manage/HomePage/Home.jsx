import React,{useState,useEffect} from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import AllPage from "../AllPage";
import Signup from "../SignUo";
import Login from "../Login";
import TaskList from "../TaskList";
import CategoryList from "../categorie";

const Home = () =>{
const [loggedIn,setIsLoggedIn] = useState(true)
    useEffect(() => {  
        const loggedInUser = localStorage.getItem("access_token");
        if(loggedInUser){
            setIsLoggedIn(false)
            console.log('hello')
        }

        // if (loggedInUser === 'true') {  
        //     setIsLoggedIn(true);  
        //     console.log('yes')
        // } else {  
        //     setIsLoggedIn(false);  
        //     console.log('no')
        // }  
    }, []);  
    return(
        <Router >
            {loggedIn && <Header/>}
            
            <Routes>
                <Route path="/" element={< Body/>}/>
                <Route path="/about" element={<Body/>}/>
                <Route path="/contact" element={<Body/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tasks" element={<TaskList/>}/>
                <Route path="/categorylist" element={<CategoryList/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default Home