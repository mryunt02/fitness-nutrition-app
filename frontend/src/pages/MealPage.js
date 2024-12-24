import React, { useState } from 'react';
import { FaCalendarAlt, FaUtensils, FaPlus, FaTrash } from 'react-icons/fa';

const MealPage = () => {
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealType, setMealType] = useState('');
  const [foods, setFoods] = useState([{ name: '', calories: '' }]);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    if (!mealType) {
      newErrors.mealType = 'Meal type is required.';
    }

    foods.forEach((food, index) => {
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
      const newMeal = {
        id: Date.now(),
        date,
        mealType,
        foods: [...foods],
      };
      setMeals([...meals, newMeal]);
      setDate(new Date().toISOString().split('T')[0]);
      setMealType('');
      setFoods([{ name: '', calories: '' }]);
      setErrors({});
    }
  };

  const addFood = () => {
    setFoods([...foods, { name: '', calories: '' }]);
  };

  const removeFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const handleFoodChange = (index, field, value) => {
    const newFoods = [...foods];
    newFoods[index][field] = value;
    setFoods(newFoods);
  };

  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.date]) {
      acc[meal.date] = [];
    }
    acc[meal.date].push(meal);
    return acc;
  }, {});

  const Input = ({ label, icon: Icon, type, value, onChange, error }) => (
    <div className='mb-4'>
      <label className='flex items-center text-sm font-medium text-gray-700 mb-2'>
        <Icon className='mr-2 text-green-600' />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
      />
      {error && <p className='mt-1 text-red-500 text-sm'>{error}</p>}
    </div>
  );

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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={errors.date}
              />
              <Input
                label='Meal Type'
                icon={FaUtensils}
                type='text'
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                error={errors.mealType}
              />

              {foods.map((food, index) => (
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
                    onChange={(e) =>
                      handleFoodChange(index, 'name', e.target.value)
                    }
                    error={errors[`name_${index}`]}
                  />

                  <Input
                    label='Calories'
                    icon={FaUtensils}
                    type='number'
                    value={food.calories}
                    onChange={(e) =>
                      handleFoodChange(index, 'calories', e.target.value)
                    }
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
              {Object.entries(groupedMeals).map(([date, mealGroup]) => (
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

                  {mealGroup.map((meal) => (
                    <div key={meal.id} className='space-y-4'>
                      <p className='font-medium text-gray-900'>
                        {meal.mealType}
                      </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPage;
