import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import Home from "../Components/Pages/Home";
import VeiculoCreate from "../Components/Pages/Veiculo";
import Profile from "../Components/Pages/Profile";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/" element={<Navigate to={'/dashboard'} />} />
            <Route path="/vehicles/create" element={<VeiculoCreate />} />
            <Route path="/vehicles/:id" element={<VeiculoCreate />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default RoutesApp