import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import Home from "../Components/Pages/Home";
import VeiculoCreate from "../Components/Pages/Veiculo/Create";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/vehicles/create" element={<VeiculoCreate />} />
            
        </Routes>
    );
}

export default RoutesApp