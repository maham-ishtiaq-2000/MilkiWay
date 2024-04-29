import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    role: '',
    username: ''
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
        const response = await axios.post(`http://localhost:3000/users/register`, {
        email: inputs.email,
        password: inputs.password,
        username: inputs.username,
        role: inputs.role
      });
      alert("You are registered Successfully!")
      navigate("/");
    } catch (error) {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-offWhite">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg ">
        <div>
          <h2 className="text-center text-2xl font-semibold text-gray">
            MilkiWay
          </h2>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray">
            Register your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email-address" name="email" type="email" autoComplete="off" required 
                  className="mt-2 appearance-none block w-full px-3 py-2  placeholder-gray-500 text-gray-900 rounded-md 
                  focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="Email address" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">UserName</label>
              <input id="user-name" name="username"  autoComplete="off" required 
                  className="mt-2 appearance-none block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md 
                  focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="User Name"  onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mt-5">Role</label>
              <input id="role" name="role"  autoComplete="off" required 
                  className="mt-2 appearance-none block w-full px-3 py-2  placeholder-gray-500 text-gray-900 rounded-md 
                  focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm" 
                  placeholder="Role"  onChange={handleChange} />
            </div>
            <div className="flex justify-between items-center"> 
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 mt-5">Password</label>
            </div>
            <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="off" 
                required 
                className="mt-2 appearance-none block w-full px-3 py-2  placeholder-gray-500 text-gray-900 rounded-md 
                        focus:outline-none focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Password" value={inputs.password} onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" 
                    style={{ backgroundColor: '#df7f69' }}
                    className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white hover:bg-pink focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-pink">
                     Register
            </button>
          </div>
        </form>
        <div className="text-center">
            <Link to="/" className="text-pink cursor-pointer hover:underline">
                Already Registered? Then Login.
            </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
