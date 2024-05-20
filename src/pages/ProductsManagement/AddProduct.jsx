import React, { useState } from 'react';
import SideBar from '../../Layouts/SideBar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState('true'); // Default to 'true'
  

    const handleUpdate = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
  
        const productData = {
            "farmOwner": userId,
            "name": username,
            "price": price,
            "description": description,
            "available": available
        }

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            alert("Product Added Successfully")
            // You can navigate or update the UI after successful addition
        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log("Done")
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white">
            <SideBar />
            <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-pink mt-10 mb-20 mx-auto">
                    ADD PRODUCTS
                </h1>
                <div className="max-w-md mx-auto mt-10 bg-offWhite">
                    <form onSubmit={handleUpdate} className="bg-offWhite shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="productName">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="productName"
                                type="text"
                                placeholder="Product Name"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="productPrice">
                                Price
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="productPrice"
                                type="number"
                                placeholder="Product Price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="productDescription">
                                Description
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="productDescription"
                                type="text"
                                placeholder="Product Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="productAvailable">
                                Available
                            </label>
                            <select
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="productAvailable"
                                value={available}
                                onChange={e => setAvailable(e.target.value)}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                ADD PRODUCT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
