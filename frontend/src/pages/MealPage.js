import React, { useState } from 'react';
import { FaCalendarAlt, FaUtensils, FaPlus, FaTrash } from 'react-icons/fa';
import { Input } from '../components/Input';

const MealPage = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: '',
    foods: [{ name: '', calories: '' }],
  });
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (newMeal.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    if (!newMeal.mealType) {
      newErrors.mealType = 'Meal type is required.';
    }

    newMeal.foods.forEach((food, index) => {
      if (!food.name) {
        newErrors[`name_${index}`] = 'Food name is required.';
      }
      if (food.calories <= 0) {
        newErrors[`calories_${index}`] = 'Calories must be a positive number.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setMeals([...meals, { ...newMeal, id: Date.now() }]);
      setNewMeal({
        date: new Date().toISOString().split('T')[0],
        mealType: '',
        foods: [{ name: '', calories: '' }],
      });
      setErrors({});
    }
  };

  const addFood = () => {
    setNewMeal({
      ...newMeal,
      foods: [...newMeal.foods, { name: '', calories: '' }],
    });
  };

  const removeFood = (index) => {
    const updatedFoods = newMeal.foods.filter((_, i) => i !== index);
    setNewMeal({
      ...newMeal,
      foods: updatedFoods,
    });
  };

  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.date]) {
      acc[meal.date] = {};
    }
    if (!acc[meal.date][meal.mealType]) {
      acc[meal.date][meal.mealType] = [];
    }
    acc[meal.date][meal.mealType].push(meal);
    return acc;
  }, {});

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>Meal Tracker</h1>
            <p className='mt-2 text-gray-600'>Log and track your meals</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Meal Form */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Add New Meal
            </h2>
            <form onSubmit={handleAddMeal}>
              <Input
                label='Date'
                icon={FaCalendarAlt}
                type='date'
                value={newMeal.date}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, date: e.target.value })
                }
                error={errors.date}
              />
              <div className='mb-4'>
                <label className='flex items-center text-sm font-medium text-gray-700 mb-2'>
                  <FaUtensils className='mr-2 text-green-600' />
                  Meal Type
                </label>
                <div className='flex gap-4'>
                  {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => (
                    <label key={type} className='flex items-center'>
                      <input
                        type='radio'
                        name='mealType'
                        value={type}
                        checked={newMeal.mealType === type}
                        onChange={(e) =>
                          setNewMeal({ ...newMeal, mealType: e.target.value })
                        }
                        className='mr-2'
                      />
                      {type}
                    </label>
                  ))}
                </div>
                {errors.mealType && (
                  <p className='mt-1 text-red-500 text-sm'>{errors.mealType}</p>
                )}
              </div>

              {newMeal.foods.map((food, index) => (
                <div
                  key={index}
                  className='mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100'
                >
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Food {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type='button'
                        onClick={() => removeFood(index)}
                        className='text-red-500 hover:text-red-600 transition-colors'
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <Input
                    label='Food Name'
                    icon={FaUtensils}
                    type='text'
                    value={food.name}
                    onChange={(e) => {
                      const updatedFoods = [...newMeal.foods];
                      updatedFoods[index].name = e.target.value;
                      setNewMeal({
                        ...newMeal,
                        foods: updatedFoods,
                      });
                    }}
                    error={errors[`name_${index}`]}
                  />

                  <Input
                    label='Calories'
                    icon={FaUtensils}
                    type='number'
                    value={food.calories}
                    onChange={(e) => {
                      const updatedFoods = [...newMeal.foods];
                      updatedFoods[index].calories = e.target.value;
                      setNewMeal({
                        ...newMeal,
                        foods: updatedFoods,
                      });
                    }}
                    error={errors[`calories_${index}`]}
                  />
                </div>
              ))}

              <div className='flex gap-4 mt-6'>
                <button
                  type='button'
                  onClick={addFood}
                  className='flex items-center justify-center px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors'
                >
                  <FaPlus className='mr-2' />
                  Add Food
                </button>
                <button
                  type='submit'
                  className='flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors'
                >
                  Save Meal
                </button>
              </div>
            </form>
          </div>

          {/* Meal History */}
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Meal History
            </h2>
            <div className='space-y-6'>
              {Object.entries(groupedMeals).map(([date, mealTypes]) => (
                <div
                  key={date}
                  className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow'
                >
                  <div className='flex items-center mb-4'>
                    <FaCalendarAlt className='text-green-600 mr-2' />
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {date}
                    </h3>
                  </div>

                  {Object.entries(mealTypes).map(([mealType, mealGroup]) => (
                    <div key={mealType} className='space-y-4'>
                      <p className='font-medium text-gray-900'>{mealType}</p>
                      {mealGroup.map((meal) => (
                        <div key={meal.id} className='space-y-4'>
                          {meal.foods.map((food, index) => (
                            <div
                              key={index}
                              className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                            >
                              <div className='flex items-start'>
                                <FaUtensils className='text-green-600 mt-1 mr-3' />
                                <div>
                                  <p className='font-medium text-gray-900'>
                                    {food.name}
                                  </p>
                                  <div className='mt-1 text-sm text-gray-600'>
                                    <span className='inline-flex items-center'>
                                      {food.calories} calories
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPage;
