import React, { useState } from 'react';

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  });

  const handleAddWorkout = (e) => {
    e.preventDefault();
    setWorkouts([...workouts, { ...newWorkout, id: Date.now() }]);
    setNewWorkout({
      date: new Date().toISOString().split('T')[0],
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
      notes: '',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow p-6'>
        <h1 className='text-2xl font-bold mb-6'>Workouts</h1>
        <form onSubmit={handleAddWorkout} className='space-y-4'>
          {/* Form fields for adding workouts */}
        </form>
        {/* Display workout history */}
      </div>
    </div>
  );
};

export default WorkoutPage;
