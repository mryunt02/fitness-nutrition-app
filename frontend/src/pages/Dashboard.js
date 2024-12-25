import React, { useContext, useState } from 'react';
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
import { AuthContext } from '../App';

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const { userData } = useContext(AuthContext);
  console.log(userData);

  // Sample data remains the same as in original code
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

  const chartColors = {
    calories: '#10B981',
    workouts: '#6366F1',
    weight: '#F59E0B',
    nutrition: ['#EF4444', '#10B981', '#6366F1'],
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Fitness Dashboard
          </h1>
          <p className='text-gray-600'>
            Track your progress and stay motivated
          </p>
        </div>

        <div className='flex justify-center mb-8 gap-2'>
          {['daily', 'weekly', 'monthly'].map((frame) => (
            <button
              key={frame}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                timeFrame === frame
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
              onClick={() => setTimeFrame(frame)}
            >
              {frame.charAt(0).toUpperCase() + frame.slice(1)}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Caloric Intake
              </h2>
              <span className='text-sm text-gray-500'>{timeFrame}</span>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={mealData[timeFrame]}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='calories'
                  stroke={chartColors.calories}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Weight Progress
              </h2>
              <span className='text-sm text-gray-500'>{timeFrame}</span>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={progressData[timeFrame]}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='weight'
                  stroke={chartColors.weight}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Nutrition Overview
              </h2>
              <span className='text-sm text-gray-500'>{timeFrame}</span>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={nutritionData[timeFrame]}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  innerRadius={60}
                  fill='#8884d8'
                  label
                  labelLine={false}
                >
                  {nutritionData[timeFrame].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors.nutrition[index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Workout Frequency
              </h2>
              <span className='text-sm text-gray-500'>{timeFrame}</span>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={workoutFrequencyData[timeFrame]}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar
                  dataKey='workouts'
                  fill={chartColors.workouts}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
