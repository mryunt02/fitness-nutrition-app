import React from 'react';
import { FaChartLine, FaUtensils, FaDumbbell } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ProgressPage = ({ workouts = [], meals = [] }) => {
  const totalWorkouts = workouts.length;
  const totalMeals = meals.length;
  const totalCalories = meals.reduce(
    (acc, meal) => acc + (parseFloat(meal.calories) || 0),
    0
  );

  // Sample data for calories consumed over time (you can replace this with actual data)
  const calorieData = [
    { name: 'Week 1', calories: 1200 },
    { name: 'Week 2', calories: 1500 },
    { name: 'Week 3', calories: 1300 },
    { name: 'Week 4', calories: 1600 },
  ];

  return (
    <div className=''>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-6 text-green-600 text-center'>
          Progress Tracker
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='border border-gray-300 p-4 rounded-lg bg-green-50 shadow-md'>
            <div className='flex items-center mb-2'>
              <FaDumbbell className='text-green-600 text-2xl mr-2' />
              <h2 className='text-xl font-semibold'>Total Workouts</h2>
            </div>
            <p className='text-2xl font-bold'>{totalWorkouts}</p>
          </div>
          <div className='border border-gray-300 p-4 rounded-lg bg-green-50 shadow-md'>
            <div className='flex items-center mb-2'>
              <FaUtensils className='text-green-600 text-2xl mr-2' />
              <h2 className='text-xl font-semibold'>Total Meals</h2>
            </div>
            <p className='text-2xl font-bold'>{totalMeals}</p>
          </div>
          <div className='border border-gray-300 p-4 rounded-lg bg-green-50 shadow-md'>
            <div className='flex items-center mb-2'>
              <FaChartLine className='text-green-600 text-2xl mr-2' />
              <h2 className='text-xl font-semibold'>Total Calories Consumed</h2>
            </div>
            <p className='text-2xl font-bold'>{totalCalories}</p>
          </div>
        </div>
        <div className='mt-6'>
          <h2 className='text-2xl font-bold text-green-600'>
            Caloric Intake Over Time
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={calorieData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='calories' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
