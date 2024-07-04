import React from 'react';
import SideBar from '../Layouts/SideBar';

const DeliveryBoyPage = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            <SideBar />
            <div className="flex justify-center w-full p-4">
                <div className="w-4/5 flex bg-offWhite p-4 mt-10" style={{ height: "80%" }}>
                    <div className="w-1/2 p-2 flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center" style={{ height: "50%" }}>
                            <h2 className="font-bold mb-2">Delivery Person Address</h2>
                            <p>123 Delivery Lane</p>
                            <p>Delivery City, DC 12345</p>
                        </div>
                    </div>
                    <div className="w-1/2 p-2 flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center" style={{ height: "50%" }}>
                            <h2 className="font-bold mb-2">Dairy Farm Owner Address</h2>
                            <p>456 Farm Road</p>
                            <p>Farmville, FV 67890</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryBoyPage;
