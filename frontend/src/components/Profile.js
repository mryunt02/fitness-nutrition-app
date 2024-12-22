import React, { useState } from 'react';
import { Activity, Weight, Ruler, Target, Heart, User } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    fitnessLevel: '',
    healthCondition: [],
    goal: [],
  });

  const healthConditions = [
    'None',
    'High Blood Pressure',
    'Asthma',
    'Diabetes',
    'Joint Pain',
    'Heart Condition',
    'Back Pain',
    'Other',
  ];

  const fitnessGoals = [
    'Weight Loss',
    'Muscle Gain',
    'Improve Strength',
    'Increase Flexibility',
    'Better Endurance',
    'General Fitness',
    'Sports Performance',
    'Rehabilitation',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelect = (e, field) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile data:', userData);
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8'>
        <div className='flex items-center gap-3 mb-8'>
          <Activity className='w-8 h-8 text-blue-600' />
          <h1 className='text-3xl font-bold text-gray-800'>Fitness Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Personal Information Section */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <User className='w-5 h-5 text-blue-600' />
              Personal Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={userData.name}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter your name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Age
                </label>
                <input
                  type='number'
                  name='age'
                  value={userData.age}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter your age'
                />
              </div>
            </div>
          </div>

          {/* Physical Metrics Section */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <Weight className='w-5 h-5 text-blue-600' />
              Physical Metrics
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Weight (kg)
                </label>
                <input
                  type='number'
                  name='weight'
                  value={userData.weight}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter weight'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Height (cm)
                </label>
                <input
                  type='number'
                  name='height'
                  value={userData.height}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter height'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Gender
                </label>
                <select
                  name='gender'
                  value={userData.gender}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fitness Information Section */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
              <Activity className='w-5 h-5 text-blue-600' />
              Fitness Information
            </h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Fitness Level
                </label>
                <select
                  name='fitnessLevel'
                  value={userData.fitnessLevel}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value=''>Select Fitness Level</option>
                  <option value='beginner'>Beginner (New to exercise)</option>
                  <option value='intermediate'>
                    Intermediate (Regular exercise)
                  </option>
                  <option value='advanced'>
                    Advanced (Experienced athlete)
                  </option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Health Conditions
                </label>
                <select
                  multiple
                  name='healthCondition'
                  value={userData.healthCondition}
                  onChange={(e) => handleMultiSelect(e, 'healthCondition')}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32'
                >
                  {healthConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <p className='mt-1 text-sm text-gray-500'>
                  Hold Ctrl/Cmd to select multiple
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Fitness Goals
                </label>
                <select
                  multiple
                  name='goal'
                  value={userData.goal}
                  onChange={(e) => handleMultiSelect(e, 'goal')}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32'
                >
                  {fitnessGoals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
                <p className='mt-1 text-sm text-gray-500'>
                  Hold Ctrl/Cmd to select multiple
                </p>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200'
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
