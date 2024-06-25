import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Products from './pages/Products';
import ProductCartPage from "./pages/productCartPage";
import PaymentPage from "./pages/PaymentPage";
import OrderHistory from "./pages/OrderHistory";
import OrderHistoryFarmer from "./pages/OrderHistoryFarmer";
import SettingsPage from "./pages/SettingsPage";
import AddProduct from './pages/ProductsManagement/AddProduct';
import AllProduct from "./pages/ProductsManagement/AllProduct";

const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />}></Route>
            <Route path="/homePage" element={<HomePage />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/productCartPage" element={<ProductCartPage />}></Route>
            <Route path="/paymentPage" element={<PaymentPage />}></Route>
            <Route path="/orderHistory" element={<OrderHistory />}></Route>
            <Route path="/orderHistoryFarmer" element={<OrderHistoryFarmer />}></Route>
            <Route path="/settingsPage" element={<SettingsPage />}></Route>
            <Route path="/addProduct" element={<AddProduct />}></Route>
            <Route path="/allFarmerProduct" element={<AllProduct />}></Route>
        </Routes> 
    );
};

export default AppRoutes;
