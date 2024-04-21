import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../Layouts/SideBar';
import SingleProduct from '../ReusableComponent/SingleProduct';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.description.toLowerCase().includes(searchTerm.toLowerCase());
        // You can add more fields to check based on your product structure.
    });

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white">
            <SideBar />
            <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-pink mt-5 mb-5 mx-auto">
                    MILKIWAY
                </h1>
                <div className="flex flex-col md:flex-row justify-between w-9/10 ml-10 mr-10 mt-10 ">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 mt-3">
                        <p className='text-pink text-2xl font-semibold'>Search All your Favourite Products</p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <input
                                type="text"
                                className="w-full px-4 py-2 focus:outline-none"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button className="px-4 py-2 bg-pink">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto h-[80vh] lg:pl-20 mt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 py-10 p-4 pb-3">
                        {filteredProducts.map((product, index) => (
                            <SingleProduct key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
