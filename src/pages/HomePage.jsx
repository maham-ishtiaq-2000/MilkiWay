import React from 'react';
import SideBar from '../Layouts/SideBar';
import HomePageImage from '../assets/HomePagePic.png';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const navigateToProducts = () => {
        navigate("/products")
    }
    return(
        <div className="flex flex-col md:flex-row h-screen bg-white">
           <SideBar></SideBar>
           <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
           <div className="flex w-full bg-gray-100" style={{"maxHeight" : "75%"}}>
                {/* Responsive Image */}
                <img
                    src={HomePageImage}
                    alt="Descriptive text about the image"
                    className="w-full  object-cover  shadow-lg" 
                />
                </div>
                <div className="flex justify-center items-center w-full ">
                {/* Container for the button to center it and apply responsive width */}
                <div className="w-full px-10 py-4 mt-20"> 
                    <button className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-5 bg-pink shadow-pink text-white font-semibold text-2xl rounded-md shadow hover:bg-slightlyDarkPink transition ease-in duration-200 text-center mx-auto block" onClick={navigateToProducts}>
                       Explore Products
                    </button>
                </div>
                </div>

                

           </div>
        </div>
    )
}

export default HomePage;