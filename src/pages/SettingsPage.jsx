import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../Layouts/SideBar';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log('Retrieved userId:', storedUserId);  // Check what's actually being retrieved
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            setMessage('No user ID found. Please log in.');
        }
    }, []);
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log('Updating with:', { username, email, password, userId });  // Verify all data before sending
        if (!username || !email || !password) {
            setMessage('Please fill in all fields');
            return;
        }
        setLoading(true);
    
        try {
            const response = await axios.patch(`http://localhost:3000/users/update/${userId}`, {
                username,
                email,
                password
            });
            console.log('Server response:', response.data);  // Check the server response
            setMessage('User updated successfully!');
            alert('User Updated Successfully!')
            navigate("/homePage")
        } catch (error) {
            console.error('Failed to update user:', error);
            setMessage('Failed to update user.=');
        } finally {
            setLoading(false);
        }
    };
    

    
    return (
        <div className="flex flex-col md:flex-row h-screen bg-white">
            <SideBar />
            <div className="flex-1 overflow-hidden" style={{ marginLeft: '105px' }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-pink mt-10 mb-20 mx-auto">
                    SETTINGS
                </h1>
                <div className="max-w-md mx-auto mt-10 bg-offWhite">
                    <form onSubmit={handleUpdate} className="bg-offWhite shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-pink text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={loading}
                            >
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
