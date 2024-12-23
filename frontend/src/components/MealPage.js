import React, { useState } from 'react';
import { FaCalendarAlt, FaUtensils } from 'react-icons/fa';

const MealPage = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    date: new Date().toISOString().split('T')[0],
    meal: 'breakfast',
    foods: '',
    calories: '',
  });
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    // Date validation
    if (newMeal.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    // Meal type validation
    if (!newMeal.meal) {
      newErrors.meal = 'Meal type is required.';
    }

    // Foods validation
    if (!newMeal.foods) {
      newErrors.foods = 'Foods are required.';
    }

    // Calories validation
    if (!newMeal.calories || newMeal.calories <= 0) {
      newErrors.calories = 'Calories must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setMeals([...meals, { ...newMeal, id: Date.now() }]);
      setNewMeal({
        date: new Date().toISOString().split('T')[0],
        meal: 'breakfast',
        foods: '',
        calories: '',
      });
      setErrors({});
    }
  };

  // Group meals by date
  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.date]) {
      acc[meal.date] = [];
    }
    acc[meal.date].push(meal);
    return acc;
  }, {});

  return (
    <div className=''>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-6 text-green-600 text-center'>
          Meal Tracker
        </h1>
        <form onSubmit={handleAddMeal} className='space-y-4'>
          <div className='mb-4'>
            <div className='flex'>
              <FaCalendarAlt className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Date
              </label>
            </div>
            <input
              type='date'
              value={newMeal.date}
              onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            {errors.date && (
              <p className='text-red-500 text-sm'>{errors.date}</p>
            )}
          </div>
          <div className='mb-4'>
            <div className='flex'>
              <FaUtensils className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Meal Type
              </label>
            </div>
            <input
              type='text'
              placeholder='Meal Type'
              value={newMeal.meal}
              onChange={(e) => setNewMeal({ ...newMeal, meal: e.target.value })}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            {errors.meal && (
              <p className='text-red-500 text-sm'>{errors.meal}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Foods
            </label>
            <textarea
              placeholder='Foods'
              value={newMeal.foods}
              onChange={(e) =>
                setNewMeal({ ...newMeal, foods: e.target.value })
              }
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            {errors.foods && (
              <p className='text-red-500 text-sm'>{errors.foods}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Calories
            </label>
            <input
              type='number'
              placeholder='Calories'
              value={newMeal.calories}
              onChange={(e) =>
                setNewMeal({ ...newMeal, calories: e.target.value })
              }
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            {errors.calories && (
              <p className='text-red-500 text-sm'>{errors.calories}</p>
            )}
          </div>
          <button
            type='submit'
            className='w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-200'
          >
            Add Meal
          </button>
        </form>
        <div className='mt-6'>
          <h2 className='text-2xl font-bold text-green-600'>Meal History</h2>
          {Object.entries(groupedMeals).map(([date, mealGroup]) => (
            <div
              key={date}
              className='border border-gray-300 p-6 rounded-lg mb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                {date}
              </h3>
              {mealGroup.map((meal) => (
                <div key={meal.id} className='flex justify-between mb-4'>
                  <div>
                    <p className='font-medium text-gray-800'>{meal.meal}</p>
                    <p className='text-gray-600'>{meal.foods}</p>
                    <p className='text-gray-600'>Calories: {meal.calories}</p>
                  </div>
                  <FaUtensils className='text-green-600 text-lg' />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPage;
