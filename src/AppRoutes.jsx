import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Products from './pages/Products';
import ProductCartPage from "./pages/productCartPage";
import PaymentPage from "./pages/PaymentPage";

const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />}></Route>
            <Route path="/homePage" element={<HomePage />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/productCartPage" element={<ProductCartPage />}></Route>
            <Route path="/paymentPage" element={<PaymentPage />}></Route>
        </Routes>
    );
};

export default AppRoutes;
