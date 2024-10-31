import React from "react";
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
    return(
        <Router >
            <Header/>
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