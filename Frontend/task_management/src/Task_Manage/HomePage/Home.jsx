import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import AllPage from "../AllPage";

const Home = () =>{
    return(
        <Router >
            <Header/>
            <Routes>
                <Route path="/" element={< Body/>}/>
                <Route path="/about" element={<Body/>}/>
                <Route path="/contact" element={<Body/>}/>
                <Route path="/signup" element={<AllPage/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default Home