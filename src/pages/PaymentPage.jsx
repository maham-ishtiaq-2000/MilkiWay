import React, { useState } from 'react';
import SideBar from '../Layouts/SideBar';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './PaymentPage.css';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const navigate = useNavigate()
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (paymentMethod === 'card') {
            toast.success('Processing card payment...');
        } else {
            toast.success('Order placed. Payment will be made upon delivery.');
        }
        navigate("/homePage")
    };

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen bg-white">
                <SideBar />
                <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
                    <div className="payment-page-container bg-offWhite">
                        <form onSubmit={handleSubmit}>
                            <h2 className='mb-10 text-center text-pink text-3xl font-semibold'>Select Payment Method</h2>
                            <div className='mb-2'>
                                <input
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="card">Credit/Debit Card</label>
                            </div>
                            <div className='mb-2'>
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="cod">Cash on Delivery</label>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className='mt-10'>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number:</label>
                                        <input type="text" id="cardNumber" name="cardNumber" placeholder='Enter Card Number'required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expiryDate">Expiry Date:</label>
                                        <input type="text" id="expiryDate" name="expiryDate" required placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV:</label>
                                        <input type="text" id="cvv" name="cvv" placeholder='Enter CVV' required />
                                    </div>
                                </div>
                            )}

                            <button type="submit" className='bg-pink text-white font-semibold'>Confirm Payment</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
