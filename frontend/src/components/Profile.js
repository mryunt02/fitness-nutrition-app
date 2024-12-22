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
            <div className='mb-4 p-4 bg-green-50 rounded-lg shadow-md'>
              <h2 className='text-2xl font-bold mb-4 text-green-600'>
                Personal Information
              </h2>
              <p className='flex items-center text-lg mb-2'>
                <FaUser className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Name:</strong>{' '}
                <span className='text-gray-700'>{userData.name}</span>
              </p>
              <p className='flex items-center text-lg mb-2'>
                <FaBullseye className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Age:</strong>{' '}
                <span className='text-gray-700'>{userData.age}</span>
              </p>
              <p className='flex items-center text-lg mb-2'>
                <FaWeight className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Weight:</strong>{' '}
                <span className='text-gray-700'>{userData.weight} kg</span>
              </p>
              <p className='flex items-center text-lg mb-2'>
                <FaRuler className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Height:</strong>{' '}
                <span className='text-gray-700'>{userData.height} cm</span>
              </p>
              <p className='flex items-center text-lg mb-2'>
                <FaTransgender className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Gender:</strong>{' '}
                <span className='text-gray-700'>{userData.gender}</span>
              </p>
            </div>
            <div className='mb-4 p-4 bg-green-50 rounded-lg shadow-md'>
              <h2 className='text-2xl font-bold mb-4 text-green-600'>
                Fitness Information
              </h2>
              <p className='flex items-center text-lg mb-2'>
                <FaHeartbeat className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Fitness Level:</strong>{' '}
                <span className='text-gray-700'>{userData.fitnessLevel}</span>
              </p>
              <p className='flex items-center text-lg mb-2'>
                <FaHeartbeat className='mr-2 text-green-600' />
                <strong className='text-gray-800'>
                  Health Condition:
                </strong>{' '}
                <span className='text-gray-700'>
                  {userData.healthCondition}
                </span>
              </p>
              <p className='flex items-center text-lg mb-2'>
                <FaBullseye className='mr-2 text-green-600' />
                <strong className='text-gray-800'>Goal:</strong>{' '}
                <span className='text-gray-700'>{userData.goal}</span>
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
