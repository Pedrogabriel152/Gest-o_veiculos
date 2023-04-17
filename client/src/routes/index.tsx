import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "../Components/Pages/Login";

const RoutesApp = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default RoutesApp