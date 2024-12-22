import React, { useState } from 'react';
import {
  FaUser,
  FaWeight,
  FaRuler,
  FaTransgender,
  FaHeartbeat,
  FaBullseye,
} from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    age: 30,
    weight: 70,
    height: 175,
    gender: 'male',
    fitnessLevel: 'intermediate',
    healthCondition: 'None',
    goal: 'Weight Loss',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update
  };

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        <h1 className='text-3xl font-bold mb-6 text-center text-green-600'>
          Profile Settings
        </h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex items-center'>
              <FaUser className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Name
              </label>
            </div>
            <input
              type='text'
              name='name'
              value={userData.name}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            <div className='flex items-center'>
              <FaWeight className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Weight (kg)
              </label>
            </div>
            <input
              type='number'
              name='weight'
              value={userData.weight}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            <div className='flex items-center'>
              <FaRuler className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Height (cm)
              </label>
            </div>
            <input
              type='number'
              name='height'
              value={userData.height}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            <div className='flex items-center'>
              <FaTransgender className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Gender
              </label>
            </div>
            <select
              name='gender'
              value={userData.gender}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
            <div className='flex items-center'>
              <FaHeartbeat className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Health Condition
              </label>
            </div>
            <input
              type='text'
              name='healthCondition'
              value={userData.healthCondition}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            <div className='flex items-center'>
              <FaBullseye className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Goal
              </label>
            </div>
            <input
              type='text'
              name='goal'
              value={userData.goal}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            <button
              type='submit'
              className='w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-200'
            >
              Save
            </button>
          </form>
        ) : (
          <div>
            <div className='mb-4'>
              <h2 className='text-lg font-medium'>Personal Information</h2>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Age:</strong> {userData.age}
              </p>
              <p>
                <strong>Weight:</strong> {userData.weight} kg
              </p>
              <p>
                <strong>Height:</strong> {userData.height} cm
              </p>
              <p>
                <strong>Gender:</strong> {userData.gender}
              </p>
            </div>
            <div className='mb-4'>
              <h2 className='text-lg font-medium'>Fitness Information</h2>
              <p>
                <strong>Fitness Level:</strong> {userData.fitnessLevel}
              </p>
              <p>
                <strong>Health Condition:</strong> {userData.healthCondition}
              </p>
              <p>
                <strong>Goal:</strong> {userData.goal}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className='w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-200'
            >
              Change Info
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
