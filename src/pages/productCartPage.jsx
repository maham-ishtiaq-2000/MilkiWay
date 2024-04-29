import React, { useContext,useEffect } from 'react';
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

const ProductCartPage = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, totalAmount } = useContext(CartContext);
    console.log(cartItems)
    
    const navigate = useNavigate();

    const navigateToPayment = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty. Add items before checking out.");
            return;
        }
    
        // Retrieve customer ID from local storage
        const customerId = localStorage.getItem('userId');
        if (!customerId) {
            toast.error("Customer ID is missing. Please log in again.");
            return;
        }
    
        const orderData = {
            customer: customerId, // Use the retrieved customer ID
            products: cartItems.map(item => ({
                product: item._id,
                quantity: item.quantity
            })),
            status: "pending"
        };
    
        try {
            const response = await axios.post('http://localhost:3000/orders/', orderData);
            console.log('Order response:', response.data); // Log or handle response data as needed
            alert("Order successfully created!");
            navigate("/paymentPage");
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("Failed to create order. Please try again.");
        }
    };
    

    const getImageSrc = (description) => {
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
                <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-pink mt-7 mb-7 mx-auto">
                        YOUR CART
                    </h1>
                    <div className="container mx-auto px-4 bg-offWhite" style={{ maxWidth: "60%", height: "70vh" }}>
                        <div className="flex flex-col overflow-auto" style={{ height: "100%" }}>
                        {cartItems.map((item, index) => (
                            <div key={item._id} className="flex justify-between items-center mt-10">
                            <div className="bg-blue-500 text-black p-4 w-3/5">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/2 w-full bg-blue-500 text-white p-4 mt-5 text-center">
                                        <img className="w-20 h-25" src={getImageSrc(item.description)} alt={item.name} />
                                    </div>
                                    <div className="md:w-1/2 w-full bg-red-500 text-pink p-4 text-center mb-5">
                                        <p className='mt-3 text-xl'>{item.name}</p>
                                        <p className='text-xl'>{item.description}</p>
                                        <p className='text-xl'>Rs. {item.price}/-</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-500 text-black p-4 w-full md:w-2/5 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                <button onClick={() => decreaseQuantity(item._id)} className="text-xl p-2 text-red-500 transition duration-150 ease-in-out">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input
                                    type="text"
                                    className="order-1 sm:order-none w-16 text-center text-xl rounded border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(e, item._id)}
                                />
                                <button onClick={() => increaseQuantity(item._id)} className="text-xl p-2 text-red-500 transition duration-150 ease-in-out">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button onClick={() => removeFromCart(item._id)} className="text-3xl p-2 text-pink ml-20 transition duration-150 ease-in-out">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                        
                        ))}

                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-darkGray p-4 mx-auto px-10" style={{ maxWidth: "60%", maxHeight: "10vh" }}>
                        <div className="text-lg text-white font-bold">Total Payment</div>
                        <div className="text-lg text-white font-bold">Rs {totalAmount}/-</div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center bg-darkGray p-4 mx-auto rounded-bl-lg rounded-br-lg" style={{ maxWidth: "60%", maxHeight: "10vh" }}>
                        <button className="bg-pink w-80 hover:bg-slightlyDarkPink text-white font-bold text-lg py-4 px-10 rounded" onClick={navigateToPayment}>
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCartPage;
