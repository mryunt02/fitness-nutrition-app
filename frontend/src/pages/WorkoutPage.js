import React, { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaDumbbell,
  FaClock,
  FaListOl,
  FaTh,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { Input } from '../components/Input';
import axiosInstance from '../axiosInstance';

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    exercises: [{ name: '', reps: '', sets: '', duration: '' }],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const fetchWorkouts = async () => {
      try {
        const response = await axiosInstance.get(`/api/workouts/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (newWorkout.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

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

  const addExercise = () => {
    setNewWorkout((prevState) => ({
      ...prevState,
      exercises: [
        ...prevState.exercises,
        { name: '', reps: '', sets: '', duration: '' },
      ],
    }));
  };

  const removeExercise = (index) => {
    setNewWorkout((prevState) => ({
      ...prevState,
      exercises: prevState.exercises.filter((_, i) => i !== index),
    }));
  };

  const groupedWorkouts = workouts.reduce((acc, workout) => {
    if (!acc[workout.date]) {
      acc[workout.date] = [];
    }
    acc[workout.date].push(workout);
    return acc;
  }, {});

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>
              Workout Tracker
            </h1>
            <p className='mt-2 text-gray-600'>
              Log and track your exercise routine
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Workout Form */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Add New Workout
            </h2>
            <form onSubmit={handleAddWorkout}>
              <Input
                label='Date'
                icon={FaCalendarAlt}
                type='date'
                value={newWorkout.date}
                onChange={(e) =>
                  setNewWorkout((prevState) => ({
                    ...prevState,
                    date: e.target.value,
                  }))
                }
                error={errors.date}
              />

              {newWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className='mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100'
                >
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Exercise {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type='button'
                        onClick={() => removeExercise(index)}
                        className='text-red-500 hover:text-red-600 transition-colors'
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <Input
                    label='Exercise Name'
                    icon={FaDumbbell}
                    type='text'
                    value={exercise.name}
                    onChange={(e) => {
                      const updatedExercises = [...newWorkout.exercises];
                      updatedExercises[index].name = e.target.value;
                      setNewWorkout((prevState) => ({
                        ...prevState,
                        exercises: updatedExercises,
                      }));
                    }}
                    error={errors[`name_${index}`]}
                  />

                  <div className='grid grid-cols-3 gap-4'>
                    <Input
                      label='Reps'
                      icon={FaListOl}
                      type='number'
                      value={exercise.reps}
                      onChange={(e) => {
                        const updatedExercises = [...newWorkout.exercises];
                        updatedExercises[index].reps = e.target.value;
                        setNewWorkout((prevState) => ({
                          ...prevState,
                          exercises: updatedExercises,
                        }));
                      }}
                      error={errors[`reps_${index}`]}
                    />

                    <Input
                      label='Sets'
                      icon={FaTh}
                      type='number'
                      value={exercise.sets}
                      onChange={(e) => {
                        const updatedExercises = [...newWorkout.exercises];
                        updatedExercises[index].sets = e.target.value;
                        setNewWorkout((prevState) => ({
                          ...prevState,
                          exercises: updatedExercises,
                        }));
                      }}
                      error={errors[`sets_${index}`]}
                    />

                    <Input
                      label='Duration'
                      icon={FaClock}
                      type='number'
                      value={exercise.duration}
                      onChange={(e) => {
                        const updatedExercises = [...newWorkout.exercises];
                        updatedExercises[index].duration = e.target.value;
                        setNewWorkout((prevState) => ({
                          ...prevState,
                          exercises: updatedExercises,
                        }));
                      }}
                      error={errors[`duration_${index}`]}
                    />
                  </div>
                </div>
              ))}

              <div className='flex gap-4 mt-6'>
                <button
                  type='button'
                  onClick={addExercise}
                  className='flex items-center justify-center px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors'
                >
                  <FaPlus className='mr-2' />
                  Add Exercise
                </button>
                <button
                  type='submit'
                  className='flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors'
                >
                  Save Workout
                </button>
              </div>
            </form>
          </div>

          {/* Workout History */}
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Workout History
            </h2>
            <div className='space-y-6'>
              {Object.entries(groupedWorkouts).map(([date, workoutGroup]) => (
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

                  {workoutGroup.map((workout) => (
                    <div key={workout.id} className='space-y-4'>
                      {workout.exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                        >
                          <div className='flex items-start'>
                            <FaDumbbell className='text-green-600 mt-1 mr-3' />
                            <div>
                              <p className='font-medium text-gray-900'>
                                {exercise.name}
                              </p>
                              <div className='mt-1 text-sm text-gray-600'>
                                <span className='inline-flex items-center mr-4'>
                                  <FaListOl className='mr-1' /> {exercise.reps}{' '}
                                  reps
                                </span>
                                <span className='inline-flex items-center mr-4'>
                                  <FaTh className='mr-1' /> {exercise.sets} sets
                                </span>
                                <span className='inline-flex items-center'>
                                  <FaClock className='mr-1' />{' '}
                                  {exercise.duration} min
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

export default WorkoutPage;
