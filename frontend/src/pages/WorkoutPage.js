import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axiosInstance';
import { AuthContext } from '../App';
import { Input } from '../components/Input';
import {
  FaCalendarAlt,
  FaClock,
  FaDumbbell,
  FaListOl,
  FaTh,
} from 'react-icons/fa';

const WorkoutPage = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState(userData.workouts || []);
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
        setUserData((prevData) => ({
          ...prevData,
          workouts: response.data,
        }));
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [setUserData]);

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
      if (exercise.duration < 0) {
        newErrors[`duration_${index}`] =
          'Duration must be a non-negative number.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.post(
          '/api/workouts',
          {
            userId,
            date: newWorkout.date,
            exercises: newWorkout.exercises,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Workout added:', response.data);
        setWorkouts([...workouts, response.data]);
        setNewWorkout({
          date: new Date().toISOString().split('T')[0],
          exercises: [{ name: '', reps: '', sets: '', duration: '' }],
        });
        setErrors({});
        setUserData((prevData) => ({
          ...prevData,
          workouts: [...(prevData.workouts || []), response.data],
        }));
      } catch (error) {
        console.error('Error adding workout:', error);
      }
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

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>
              Workout Tracker
            </h1>
            <p className='mt-2 text-gray-600'>Log and track your workouts</p>
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
                        Remove
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
                    label='Duration (minutes)'
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
              ))}

              <div className='flex gap-4 mt-6'>
                <button
                  type='button'
                  onClick={addExercise}
                  className='flex items-center justify-center px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors'
                >
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
              {workouts.map((workout) => (
                <div
                  key={workout._id}
                  className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow'
                >
                  <div className='flex items-center mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {new Date(workout.date).toLocaleDateString()}
                    </h3>
                  </div>
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className='mb-4'>
                      <p className='font-medium text-gray-900'>
                        {exercise.name}
                      </p>
                      <p className='text-gray-600'>
                        {exercise.reps} reps x {exercise.sets} sets
                      </p>
                      {exercise.duration && (
                        <p className='text-gray-600'>
                          Duration: {exercise.duration} minutes
                        </p>
                      )}
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
