import React from 'react';
import {
  FaDumbbell,
  FaAppleAlt,
  FaChartLine,
  FaUserFriends,
  FaRegHeart,
  FaClipboardList,
} from 'react-icons/fa'; // Import icons

const Home = () => {
  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <header className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-green-600'>
          Welcome to FitTrack
        </h1>
        <p className='mt-4 text-lg text-gray-700'>
          Your ultimate fitness companion for tracking workouts, meals, and
          progress.
        </p>
        <button className='mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200'>
          Get Started
        </button>
      </header>

      <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
          <FaDumbbell className='text-green-600 text-4xl mb-4' />
          <h2 className='text-xl font-semibold'>Track Your Workouts</h2>
          <p className='text-gray-600'>
            Log your workouts and monitor your progress over time.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
          <FaAppleAlt className='text-green-600 text-4xl mb-4' />
          <h2 className='text-xl font-semibold'>Meal Planning</h2>
          <p className='text-gray-600'>
            Plan your meals and maintain a balanced diet effortlessly.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
          <FaChartLine className='text-green-600 text-4xl mb-4' />
          <h2 className='text-xl font-semibold'>Monitor Your Progress</h2>
          <p className='text-gray-600'>
            Keep track of your fitness journey and achieve your goals.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
          <FaUserFriends className='text-green-600 text-4xl mb-4' />
          <h2 className='text-xl font-semibold'>Join a Community</h2>
          <p className='text-gray-600'>
            Connect with friends and share your fitness journey.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
          <FaRegHeart className='text-green-600 text-4xl mb-4' />
          <h2 className='text-xl font-semibold'>Health Insights</h2>
          <p className='text-gray-600'>
            Get personalized health insights based on your data.
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105'>
          <FaClipboardList className='text-green-600 text-4xl mb-4' />
          <h2 className='text-xl font-semibold'>Workout Plans</h2>
          <p className='text-gray-600'>
            Access tailored workout plans to meet your fitness goals.
          </p>
        </div>
      </section>

      <footer className='mt-12 text-center'>
        <p className='text-gray-600'>
          Join our community and start your fitness journey today!
        </p>
      </footer>
    </div>
  );
};

export default Home;
