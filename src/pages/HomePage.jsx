import React, { useState, useEffect } from 'react';
import SideBar from '../Layouts/SideBar';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider1 from '../assets/HomePagePic.png'; 
import Slider2 from '../assets/HomePagePic2.png'; 
import Slider3 from '../assets/HomePagePic3.png';

const HomePage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        // Fetch the role from localStorage
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const navigateToProducts = () => {
        navigate("/products");
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 300, // Faster transition speed
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500, // Reduced to 1000ms for quicker image change
    };

    const images = [
        { src: Slider1, alt: 'Slider 1' },
        { src: Slider2, alt: 'Slider 2' },
        { src: Slider3, alt: 'Slider 3' },
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white">
            <SideBar />
            <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
                <div className="flex w-full bg-gray-100" style={{ maxHeight: "75%" }}>
                    {/* Slider for multiple images */}
                    <Slider {...sliderSettings} className="w-full shadow-lg">
                        {images.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-[50rem] object-cover" // Further increased height
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                {role === 'customer' && (
                    <div className="flex justify-center items-center w-full">
                        <div className="w-full px-10 py-4 mt-20">
                            <button 
                                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-5 bg-pink shadow-pink text-white font-semibold text-2xl rounded-md shadow hover:bg-slightlyDarkPink transition ease-in duration-200 text-center mx-auto block"
                                onClick={navigateToProducts}
                            >
                                Explore Products
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
