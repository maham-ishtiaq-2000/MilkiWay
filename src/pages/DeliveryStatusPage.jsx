import React, { useEffect, useState } from 'react';
import SideBar from '../Layouts/SideBar';

const DeliveryStatusPage = () => {
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/orders/');
                const data = await response.json();
                const filteredOrders = data.filter(order => order.status === 'delivered');
                setDeliveredOrders(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            <SideBar />
            <div className="flex justify-center w-full p-4">
                <div className="w-4/5 flex flex-col bg-offWhite p-4 mt-10" style={{ height: "80%" }}>
                    {deliveredOrders.map((order, index) => (
                        <div key={index} className="flex mb-4 bg-white p-4 shadow">
                            <div className="w-1/2 p-2 flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center" style={{ height: "50%" }}>
                                    <h2 className="font-bold mb-2">Order Number {index + 1}</h2>
                                </div>
                            </div>
                            <div className="w-1/2 p-2 flex flex-col justify-center items-center">
                                <div className="flex flex-col items-center" style={{ height: "50%" }}>
                                    <h2 className="font-bold mb-2">Done</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeliveryStatusPage;
