import React from 'react';
import {
  FaDumbbell,
  FaAppleAlt,
  FaChartLine,
  FaUserFriends,
  FaRegHeart,
  FaClipboardList,
} from 'react-icons/fa'; // Import icons
import FeatureCard from '../components/FeatureCard';
import { features } from '../Feature';

const Home = () => {
  return (
    <div className='p-6'>
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
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
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
