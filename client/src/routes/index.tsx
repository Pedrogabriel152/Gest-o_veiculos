import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import Home from "../Components/Pages/Home";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Home />} />
        </Routes>
    );
}

export default RoutesApp