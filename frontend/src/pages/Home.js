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
        <FeatureCard
          icon={<FaDumbbell />}
          title='Track Your Workouts'
          description='Log your workouts and monitor your progress over time.'
        />
        <FeatureCard
          icon={<FaAppleAlt />}
          title='Meal Planning'
          description='Plan your meals and maintain a balanced diet effortlessly.'
        />
        <FeatureCard
          icon={<FaChartLine />}
          title='Monitor Your Progress'
          description='Keep track of your fitness journey and achieve your goals.'
        />
        <FeatureCard
          icon={<FaUserFriends />}
          title='Join a Community'
          description='Connect with friends and share your fitness journey.'
        />
        <FeatureCard
          icon={<FaRegHeart />}
          title='Health Insights'
          description='Get personalized health insights based on your data.'
        />
        <FeatureCard
          icon={<FaClipboardList />}
          title='Workout Plans'
          description='Access tailored workout plans to meet your fitness goals.'
        />
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
