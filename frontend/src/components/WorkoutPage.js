import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaDumbbell,
  FaClock,
  FaListOl,
  FaTh,
} from 'react-icons/fa'; // Import icons

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    exercises: [{ name: '', reps: '', sets: '', duration: '' }],
  });
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    // Date validation
    if (newWorkout.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    // Validate exercises
    newWorkout.exercises.forEach((exercise, index) => {
      if (!exercise.name) {
        newErrors[`name_${index}`] = 'Exercise name is required.';
      }
      if (exercise.reps <= 0) {
        newErrors[`reps_${index}`] = 'Reps must be a positive number.';
      }
      if (exercise.sets <= 0) {
        newErrors[`sets_${index}`] = 'Sets must be a positive number.';
      }
      if (exercise.duration <= 0) {
        newErrors[`duration_${index}`] = 'Duration must be a positive number.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setWorkouts([...workouts, { ...newWorkout, id: Date.now() }]);
      setNewWorkout({
        date: new Date().toISOString().split('T')[0],
        exercises: [{ name: '', reps: '', sets: '', duration: '' }],
      });
      setErrors({});
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-6 text-green-600'>Workouts</h1>
        <form onSubmit={handleAddWorkout} className='space-y-4'>
          <div className='flex items-center mb-4'>
            <div className='flex'>
              <FaCalendarAlt className='mr-2 text-green-600' />
              <label className='block text-sm font-medium text-gray-700'>
                Date
              </label>
            </div>
            <input
              type='date'
              value={newWorkout.date}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, date: e.target.value })
              }
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
            {errors.date && (
              <p className='text-red-500 text-sm'>{errors.date}</p>
            )}
          </div>
          {newWorkout.exercises.map((exercise, index) => (
            <div key={index} className='border p-4 rounded-lg mb-4 bg-green-50'>
              <h2 className='text-lg font-bold text-green-600 mb-2'>
                Exercise {index + 1}
              </h2>
              <div className='mb-4'>
                <label className='flex items-center text-sm font-medium text-gray-700'>
                  <FaDumbbell className='mr-2 text-green-600' />
                  Name
                </label>
                <input
                  type='text'
                  value={exercise.name}
                  onChange={(e) => {
                    const updatedExercises = [...newWorkout.exercises];
                    updatedExercises[index].name = e.target.value;
                    setNewWorkout({
                      ...newWorkout,
                      exercises: updatedExercises,
                    });
                  }}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                />
                {errors[`name_${index}`] && (
                  <p className='text-red-500 text-sm'>
                    {errors[`name_${index}`]}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label className='flex items-center text-sm font-medium text-gray-700'>
                  <FaListOl className='mr-2 text-green-600' />
                  Reps
                </label>
                <input
                  type='number'
                  value={exercise.reps}
                  onChange={(e) => {
                    const updatedExercises = [...newWorkout.exercises];
                    updatedExercises[index].reps = e.target.value;
                    setNewWorkout({
                      ...newWorkout,
                      exercises: updatedExercises,
                    });
                  }}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                />
                {errors[`reps_${index}`] && (
                  <p className='text-red-500 text-sm'>
                    {errors[`reps_${index}`]}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label className='flex items-center text-sm font-medium text-gray-700'>
                  <FaTh className='mr-2 text-green-600' />
                  Sets
                </label>
                <input
                  type='number'
                  value={exercise.sets}
                  onChange={(e) => {
                    const updatedExercises = [...newWorkout.exercises];
                    updatedExercises[index].sets = e.target.value;
                    setNewWorkout({
                      ...newWorkout,
                      exercises: updatedExercises,
                    });
                  }}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                />
                {errors[`sets_${index}`] && (
                  <p className='text-red-500 text-sm'>
                    {errors[`sets_${index}`]}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label className='flex items-center text-sm font-medium text-gray-700'>
                  <FaClock className='mr-2 text-green-600' />
                  Duration (min)
                </label>
                <input
                  type='number'
                  value={exercise.duration}
                  onChange={(e) => {
                    const updatedExercises = [...newWorkout.exercises];
                    updatedExercises[index].duration = e.target.value;
                    setNewWorkout({
                      ...newWorkout,
                      exercises: updatedExercises,
                    });
                  }}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                />
                {errors[`duration_${index}`] && (
                  <p className='text-red-500 text-sm'>
                    {errors[`duration_${index}`]}
                  </p>
                )}
              </div>
            </div>
          ))}
          <button
            type='submit'
            className='w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-200'
          >
            Add Workout
          </button>
        </form>
        <div className='mt-6'>
          <h2 className='text-2xl font-bold text-green-600'>Workout History</h2>
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className='border p-4 rounded-lg mb-4 bg-white shadow'
            >
              <h3 className='text-lg font-semibold text-gray-800'>
                {workout.date}
              </h3>
              {workout.exercises.map((exercise, index) => (
                <p key={index} className='text-gray-700'>
                  {exercise.name}: {exercise.reps} reps, {exercise.sets} sets,{' '}
                  {exercise.duration} min
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
