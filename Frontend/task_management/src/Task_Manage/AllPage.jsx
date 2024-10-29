import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./Login";
import TaskList from "./TaskList";
import ProtectedRoute from "./ProtectedRoute";


function AllPage(){
    return (
        <Router>
           <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/home" element={<ProtectedRoute />} /> */}
            <Route
               path="/tasks" element={
                <ProtectedRoute>
                    <TaskList />
                </ProtectedRoute>
               }
            
            />
            
           </Routes>

        </Router>
    )

}
export default AllPage;