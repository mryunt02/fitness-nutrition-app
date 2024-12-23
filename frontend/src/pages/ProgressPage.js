import React from 'react';
import { FaChartLine, FaUtensils, FaDumbbell, FaFire } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const ProgressPage = ({ workouts = [], meals = [] }) => {
  const totalWorkouts = workouts.length;
  const totalMeals = meals.length;
  const totalCalories = meals.reduce(
    (acc, meal) => acc + (parseFloat(meal.calories) || 0),
    0
  );

  const calorieData = [
    { name: 'Week 1', calories: 1200, target: 1400 },
    { name: 'Week 2', calories: 1500, target: 1400 },
    { name: 'Week 3', calories: 1300, target: 1400 },
    { name: 'Week 4', calories: 1600, target: 1400 },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-gray-500 text-sm font-medium mb-1'>{title}</h3>
          <div className='flex items-baseline'>
            <span className='text-3xl font-bold text-gray-900'>{value}</span>
            {subtitle && (
              <span className='ml-2 text-sm text-gray-500'>{subtitle}</span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className='w-6 h-6 text-white' />
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900'>Progress Tracker</h1>
          <p className='mt-2 text-gray-600'>Monitor your fitness journey</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            icon={FaDumbbell}
            title='Total Workouts'
            value={totalWorkouts}
            subtitle='sessions'
            color='bg-blue-500'
          />
          <StatCard
            icon={FaUtensils}
            title='Total Meals'
            value={totalMeals}
            subtitle='logged'
            color='bg-green-500'
          />
          <StatCard
            icon={FaFire}
            title='Total Calories'
            value={totalCalories.toLocaleString()}
            subtitle='kcal'
            color='bg-orange-500'
          />
          <StatCard
            icon={FaChartLine}
            title='Daily Average'
            value={(totalCalories / (meals.length || 1)).toFixed(0)}
            subtitle='kcal/day'
            color='bg-purple-500'
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Caloric Intake Chart */}
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Caloric Intake Over Time
            </h2>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={calorieData}>
                <defs>
                  <linearGradient
                    id='colorCalories'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='5%' stopColor='#10B981' stopOpacity={0.1} />
                    <stop offset='95%' stopColor='#10B981' stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type='monotone'
                  dataKey='calories'
                  stroke='#10B981'
                  fill='url(#colorCalories)'
                  strokeWidth={2}
                />
                <Line
                  type='monotone'
                  dataKey='target'
                  stroke='#6B7280'
                  strokeDasharray='5 5'
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Progress Chart */}
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Workout Frequency
            </h2>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={calorieData}>
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
                  stroke='#6366F1'
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
