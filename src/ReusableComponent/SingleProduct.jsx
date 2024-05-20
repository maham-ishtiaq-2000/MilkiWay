import React, { useState, useContext } from 'react';
import EggImage from '../assets/Egg.png';
import YogurtImage from '../assets/yogurt.png';
import MilkImage from '../assets/Milk.png';
import AllProductsImage from '../assets/allProducts.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/cartContext';
import Modal from './Modal'; // Import the Modal component

const SingleProduct = ({ product, component }) => {
    const { addToCart } = useContext(CartContext);
    const description = product.description.toLowerCase();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Set the image source based on the description
    let imageSrc;
    if (description.includes('egg')) {
        imageSrc = EggImage;
    } else if (description.includes('yogurt')) {
        imageSrc = YogurtImage;
    } else if (description.includes('milk')) {
        imageSrc = MilkImage;
    } else {
        imageSrc = AllProductsImage;
    }

    // Determine the availability text
    const availabilityText = product.available ? "YES" : "NO";

    const addToCartItems = () => {
        addToCart(product);
        alert("Added To Cart Successfully!");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative w-80 h-100 bg-offWhite shadow-lg rounded-lg flex flex-col border border-3 border-offWhite overflow-hidden">
            <img
                src={imageSrc}
                alt="Product"
                className="w-full h-3/4 object-cover"
            />
            <div className="flex-grow px-4 flex flex-col justify-between">
                <p className="text-center mt-4 text-pink text-xl mb-4">
                    {product.name}
                </p>
                <p className="text-center mt-2 text-pink text-xl mb-4">
                    {product.description}
                </p>
                <div className="flex justify-between items-end w-full h-full mt-2">
                    <div className="w-1/2 ml-5 text-pink text-xl">
                        Price
                    </div>
                    <div className="w-1/2 ml-20 text-pink text-xl">
                        {product.price}/-
                    </div>
                </div>
                <div className="flex justify-between items-end w-full h-full mt-2">
                    <div className="w-1/2 ml-5 text-pink text-xl">
                        Available
                    </div>
                    <div className="w-1/2 ml-20 text-pink text-xl">
                        {availabilityText}
                    </div>
                </div>
            </div>
            {component !== "FarmerAllProduct" && (
                <button
                    className="w-full bg-pink hover:bg-slightlyDarkPink text-white font-bold py-2 px-4 rounded-bl-lg rounded-br-lg mt-4 flex justify-center items-center"
                    onClick={addToCartItems}
                >
                    ADD TO CART<FontAwesomeIcon icon={faCartPlus} className="ml-5" />
                </button>
            )}
            {component === "FarmerAllProduct" && (
                <button
                    className="w-full bg-pink hover:bg-slightlyDarkPink text-white font-bold py-2 px-4 rounded-bl-lg rounded-br-lg mt-4 flex justify-center items-center"
                    onClick={openModal}
                >
                    EDIT<FontAwesomeIcon icon={faEdit} className="ml-5" />
                </button>
            )}
            <Modal product={product} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default SingleProduct;
