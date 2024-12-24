// filepath: /Users/bugrahanyunt/Developer/fitness-nutrition-app/frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-8'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center text-green-600'>
          Login
        </h1>
        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <div className='flex items-center border border-gray-300 rounded-md shadow-sm'>
              <FaUser className='text-gray-400 ml-2' />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full px-4 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md'
                placeholder='Enter your email'
              />
            </div>
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='flex items-center border border-gray-300 rounded-md shadow-sm'>
              <FaLock className='text-gray-400 ml-2' />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-full px-4 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md'
                placeholder='Enter your password'
              />
            </div>
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-200'
          >
            Login
          </button>
        </form>
        <p className='mt-4 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <a href='/signup' className='text-green-600 hover:underline'>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
