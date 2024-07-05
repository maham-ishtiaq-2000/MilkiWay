import React, { useEffect, useState } from 'react';
import SideBar from '../Layouts/SideBar';

const DeliveryBoyPage = () => {
    const [acceptedOrders, setAcceptedOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders/');
                const data = await response.json();
                const filteredOrders = data.filter(order => order.status === 'accepted');
                setAcceptedOrders(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const acceptOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}/accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setAcceptedOrders(prevOrders => prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: 'accepted' } : order
                ));
            } else {
                console.error('Error accepting order:', data);
            }
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            <SideBar />
            <div className="flex justify-center w-full p-4">
                <div className="w-4/5 flex bg-offWhite flex-col p-4 mt-10" style={{ height: "80%" }}>
                    <h1>Contact Us at 03345678240</h1>
                    {acceptedOrders.map((order, index) => (
                        <div key={index} className="w-full flex mb-4 bg-white p-4 shadow">
                            <div className="w-1/2 p-2 flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center" style={{ height: "50%" }}>
                                    <h2 className="font-bold mb-2 mt-2">Order Number {index + 1}</h2>
                                    <p className='mt-2'>{order.deliveryAddress}</p>
                                </div>
                            </div>
                            <div className="w-1/2 p-2 flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center" style={{ height: "50%" }}>
                                    <button 
                                        className='bg-pink text-white w-70 p-3'
                                        onClick={() => acceptOrder(order._id)}
                                        disabled={order.status === 'accepted'}
                                    >
                                        {order.status === 'accepted' ? 'Accepted' : 'Accept'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeliveryBoyPage;
