import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import WorkoutPage from './components/WorkoutPage';
import MealPage from './components/MealPage';
// import ProgressPage from './ProgressPage'; // Assuming you have a ProgressPage component
// import DashboardPage from './DashboardPage'; // Assuming you have a DashboardPage component

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main className='max-w-6xl mx-auto p-4'>
          <Routes>
            <Route path='/' element={<div />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/workouts' element={<WorkoutPage />} />
            <Route path='/meals' element={<MealPage />} />
            <Route path='/progress' element={<div />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
