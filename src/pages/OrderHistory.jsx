import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../Layouts/SideBar';
import { useNavigate } from 'react-router-dom';
import EggsImage from '../assets/Egg.png';
import YogurtImage from '../assets/yogurt.png';
import MilkImage from '../assets/Milk.png';
import AllProductsImage from '../assets/allProducts.png';
import { CartContext } from '../context/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderHistory = () => {
    const { cartItems } = useContext(CartContext); // Assuming cartItems are not used here
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const customerId = localStorage.getItem('userId');
            if (!customerId) {
                toast.error("No customer ID found. Please log in.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/orders/customer/${customerId}`);
                const productsArray = response.data.flatMap(order => 
                    order.products.map(product => ({
                        ...product.product,
                        quantity: product.quantity,
                        status: order.status // Include the status of the order with each product
                    })).filter(product => product !== null)
                );
                setAllProducts(productsArray);
            } catch (error) {
                console.error('Failed to fetch order history:', error);
                toast.error("Failed to fetch order history.");
            }
        };

        fetchOrderHistory();
    }, []);

    const getImageSrc = (description) => {
        if (!description) return AllProductsImage; // Default if no description
        const desc = description.toLowerCase();
        if (desc.includes("egg")) {
            return EggsImage;
        } else if (desc.includes("yogurt")) {
            return YogurtImage;
        } else if (desc.includes("milk")) {
            return MilkImage;
        } else {
            return AllProductsImage; // Default image if no specific keyword is found
        }
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="flex flex-col md:flex-row h-screen bg-white">
                <SideBar />
                <div className="flex-1 overflow-hidden" style={{ marginLeft: '200px' }}>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-pink mt-7 mb-7 mx-auto">
                        ORDER HISTORY
                    </h1>
                    <div className="container mx-auto px-4 bg-offWhite" style={{ maxWidth: "60%", height: "85vh" }}>
                        <div className="flex flex-col overflow-auto" style={{ height: "100%" }}>
                            {allProducts.map((item, index) => (
                                <div key={index} className="flex justify-between items-center mt-10">
                                    <div className="bg-blue-500 text-black p-4 flex flex-1">
                                        <div className="flex flex-col md:flex-row w-full">
                                            {/* Ensure each section gets equal width using flex-grow */}
                                            <div className="flex-1 bg-blue-500 text-white p-4 mt-5 text-center">
                                                <img className="w-30 h-30" src={getImageSrc(item.description)} alt={item.name} />
                                            </div>
                                            <div className="flex-1 bg-red-500 text-pink p-4 text-center mb-5">
                                                <p className='mt-10 text-xl'>{item.name}</p>
                                                <p className='text-xl'>{item.description}</p>
                                            </div>
                                            <div className="flex-1 bg-red-500 text-pink p-4 text-center mb-5" style={{"marginTop" : "7%"}}>
                                                <p className='text-xl'>Rs. {item.price}/-</p>
                                            </div>
                                            <div className="flex-1 bg-red-500 text-pink p-4 text-center mb-5" style={{"marginTop" : "7%"}}>
                                                <p className='text-xl'>Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="flex-1 bg-pink text-white text-center h-10 pt-1" style={{"marginTop" : "8%"}}>
                                                <p className='text-xl'>{item.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default OrderHistory;
