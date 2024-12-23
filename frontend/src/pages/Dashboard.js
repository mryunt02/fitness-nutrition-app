import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState('weekly'); // State to manage the selected time frame

  // Sample data for meals, workouts, and progress
  const mealData = {
    weekly: [
      { name: 'Week 1', calories: 1200 },
      { name: 'Week 2', calories: 1500 },
      { name: 'Week 3', calories: 1300 },
      { name: 'Week 4', calories: 1600 },
    ],
    daily: [
      { name: 'Day 1', calories: 300 },
      { name: 'Day 2', calories: 400 },
      { name: 'Day 3', calories: 350 },
      { name: 'Day 4', calories: 450 },
    ],
    monthly: [
      { name: 'Month 1', calories: 12000 },
      { name: 'Month 2', calories: 15000 },
      { name: 'Month 3', calories: 13000 },
    ],
  };

  const workoutData = {
    weekly: [
      { name: 'Week 1', workouts: 3 },
      { name: 'Week 2', workouts: 5 },
      { name: 'Week 3', workouts: 4 },
      { name: 'Week 4', workouts: 6 },
    ],
    daily: [
      { name: 'Day 1', workouts: 1 },
      { name: 'Day 2', workouts: 2 },
      { name: 'Day 3', workouts: 1 },
      { name: 'Day 4', workouts: 3 },
    ],
    monthly: [
      { name: 'Month 1', workouts: 10 },
      { name: 'Month 2', workouts: 15 },
      { name: 'Month 3', workouts: 12 },
    ],
  };

  const progressData = {
    weekly: [
      { name: 'Week 1', weight: 70 },
      { name: 'Week 2', weight: 68 },
      { name: 'Week 3', weight: 67 },
      { name: 'Week 4', weight: 65 },
    ],
    daily: [
      { name: 'Day 1', weight: 70 },
      { name: 'Day 2', weight: 69 },
      { name: 'Day 3', weight: 68 },
      { name: 'Day 4', weight: 67 },
    ],
    monthly: [
      { name: 'Month 1', weight: 70 },
      { name: 'Month 2', weight: 68 },
      { name: 'Month 3', weight: 67 },
    ],
  };

  // New data for nutrition overview
  const nutritionData = {
    weekly: [
      { name: 'Protein', value: 150 },
      { name: 'Carbs', value: 200 },
      { name: 'Fats', value: 50 },
    ],
    daily: [
      { name: 'Protein', value: 30 },
      { name: 'Carbs', value: 50 },
      { name: 'Fats', value: 10 },
    ],
    monthly: [
      { name: 'Protein', value: 600 },
      { name: 'Carbs', value: 800 },
      { name: 'Fats', value: 200 },
    ],
  };

  // New data for workout frequency
  const workoutFrequencyData = {
    weekly: [
      { name: 'Week 1', workouts: 3 },
      { name: 'Week 2', workouts: 5 },
      { name: 'Week 3', workouts: 4 },
      { name: 'Week 4', workouts: 6 },
    ],
    monthly: [
      { name: 'Month 1', workouts: 10 },
      { name: 'Month 2', workouts: 15 },
      { name: 'Month 3', workouts: 12 },
    ],
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-center mb-6 text-green-600'>
        Dashboard
      </h1>

      {/* Time Frame Selection */}
      <div className='flex justify-center mb-6'>
        <button
          className={`mx-2 py-2 px-4 rounded-md ${
            timeFrame === 'daily'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500 border border-green-500'
          }`}
          onClick={() => setTimeFrame('daily')}
        >
          Daily
        </button>
        <button
          className={`mx-2 py-2 px-4 rounded-md ${
            timeFrame === 'weekly'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500 border border-green-500'
          }`}
          onClick={() => setTimeFrame('weekly')}
        >
          Weekly
        </button>
        <button
          className={`mx-2 py-2 px-4 rounded-md ${
            timeFrame === 'monthly'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500 border border-green-500'
          }`}
          onClick={() => setTimeFrame('monthly')}
        >
          Monthly
        </button>
      </div>

      <div className=' flex flex-col gap-6'>
        {/* Meals Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>
            {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Caloric
            Intake
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={mealData[timeFrame]}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='calories' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Workouts Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>
            {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Workouts
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={workoutData[timeFrame]}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='workouts' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Chart */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>
            {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Weight
            Progress
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={progressData[timeFrame]}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='weight' stroke='#ff7300' />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='flex gap-4'>
          {/* Nutrition Overview Pie Chart */}
          <div className='bg-white p-4 rounded-lg shadow-md w-1/2'>
            <h2 className='text-xl font-semibold mb-4'>
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Nutrition
              Overview
            </h2>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={nutritionData[timeFrame]}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  fill='#8884d8'
                  label
                >
                  {nutritionData[timeFrame].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#ff0000', '#00ff00', '#0000ff'][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Workout Frequency Bar Chart */}
          <div className='bg-white p-4 rounded-lg shadow-md w-1/2'>
            <h2 className='text-xl font-semibold mb-4'>
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Workout
              Frequency
            </h2>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={workoutFrequencyData[timeFrame]}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='workouts' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
