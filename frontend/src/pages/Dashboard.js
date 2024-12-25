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
import {
  Activity,
  User,
  Target,
  Utensils,
  Dumbbell,
  Calendar,
  TrendingUp,
  ActivityIcon,
} from 'lucide-react';
import { AuthContext } from '../App';
import { StatCard } from '../components/StatCard';
import { ChartCard } from '../components/ChartCard';
import { FaDumbbell, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const { userData } = useContext(AuthContext);
  const [selectedMealType, setSelectedMealType] = useState('all');

  const processNutritionData = () => {
    const totals = { protein: 0, carbs: 0, fats: 0 };
    userData.meals.forEach((meal) => {
      if (selectedMealType === 'all' || meal.mealType === selectedMealType) {
        meal.foods.forEach((food) => {
          totals.protein += food.protein || 0;
          totals.carbs += food.carbs || 0;
          totals.fats += food.fats || 0;
        });
      }
    });
    return [
      { name: 'Protein', value: totals.protein },
      { name: 'Carbs', value: totals.carbs },
      { name: 'Fats', value: totals.fats },
    ];
  };

  const processMealData = () => {
    const dailyCalories = {};
    userData.meals.forEach((meal) => {
      if (selectedMealType === 'all' || meal.mealType === selectedMealType) {
        const calories = meal.foods.reduce(
          (sum, food) => sum + (food.calories || 0),
          0
        );
        if (!dailyCalories[meal.date]) {
          dailyCalories[meal.date] = calories;
        } else {
          dailyCalories[meal.date] += calories;
        }
      }
    });

    return Object.entries(dailyCalories)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, calories]) => ({
        name: new Date(date).toLocaleDateString(),
        calories,
      }));
  };

  const processWorkoutData = () => {
    const workoutsByDate = {};
    userData.workouts.forEach((workout) => {
      const date = workout.date;
      if (!workoutsByDate[date]) {
        workoutsByDate[date] = {
          exercises: new Set(),
          totalSets: 0,
          totalReps: 0,
          totalDuration: 0,
        };
      }

      workout.exercises.forEach((exercise) => {
        workoutsByDate[date].exercises.add(exercise.name);
        workoutsByDate[date].totalSets += exercise.sets || 0;
        workoutsByDate[date].totalReps += exercise.reps || 0;
        workoutsByDate[date].totalDuration += exercise.duration || 0;
      });
    });

    return Object.entries(workoutsByDate)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, stats]) => ({
        name: new Date(date).toLocaleDateString(),
        exercises: stats.exercises.size,
        sets: stats.totalSets,
        reps: stats.totalReps,
        duration: stats.totalDuration,
      }));
  };

  const getMealTypes = () => {
    const types = new Set(userData.meals.map((meal) => meal.mealType));
    return ['all', ...Array.from(types)];
  };

  const getExerciseStats = () => {
    const stats = {
      totalWorkouts: userData.workouts.length,
      uniqueExercises: new Set(),
      totalSets: 0,
      totalReps: 0,
      totalDuration: 0,
    };

    userData.workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        stats.uniqueExercises.add(exercise.name);
        stats.totalSets += exercise.sets || 0;
        stats.totalReps += exercise.reps || 0;
        stats.totalDuration += exercise.duration || 0;
      });
    });

    return {
      ...stats,
      uniqueExercises: stats.uniqueExercises.size,
    };
  };

  const chartColors = {
    calories: '#10B981',
    workouts: '#6366F1',
    weight: '#F59E0B',
    nutrition: ['#EF4444', '#10B981', '#6366F1'],
  };

  const nutritionData = processNutritionData();
  const mealData = processMealData();
  const workoutData = processWorkoutData();
  const exerciseStats = getExerciseStats();

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col items-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            {userData.name}'s Fitness Journey
          </h1>
          <p className='text-gray-600 text-lg'>
            Track your progress and stay motivated
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            icon={FaUser}
            title='Profile'
            value={userData.gender}
            subValue={`${userData.age} years old`}
            color='blue'
          />
          <StatCard
            icon={ActivityIcon}
            title='Measurements'
            value={`${userData.weight}kg`}
            subValue={`Height: ${userData.height}cm`}
            color='green'
          />
          <StatCard
            icon={Target}
            title='Goal'
            value={userData.goal}
            color='yellow'
          />
          <StatCard
            icon={FaDumbbell}
            title='Workouts'
            value={exerciseStats.totalWorkouts}
            subValue='Total sessions'
            color='purple'
          />
        </div>

        <div className='bg-white rounded-xl shadow-sm p-4 mb-6'>
          <div className='flex gap-2 overflow-x-auto pb-2'>
            {getMealTypes().map((type) => (
              <button
                key={type}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                  ${
                    selectedMealType === type
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                  }`}
                onClick={() => setSelectedMealType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <ChartCard title='Caloric Intake' icon={Utensils}>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={mealData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='calories'
                  stroke='#10B981'
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title='Workout Activity' icon={Activity}>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={workoutData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey='exercises' fill='#6366F1' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title='Nutrition Distribution' icon={TrendingUp}>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  innerRadius={60}
                  label
                >
                  {nutritionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors.nutrition[index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title='Exercise Summary' icon={Calendar}>
            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  label: 'Unique Exercises',
                  value: exerciseStats.uniqueExercises,
                },
                { label: 'Total Sets', value: exerciseStats.totalSets },
                { label: 'Total Reps', value: exerciseStats.totalReps },
                { label: 'Duration (min)', value: exerciseStats.totalDuration },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors'
                >
                  <p className='text-gray-600 text-sm mb-1'>{stat.label}</p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
