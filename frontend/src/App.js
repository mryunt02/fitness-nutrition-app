// filepath: /Users/bugrahanyunt/Developer/fitness-nutrition-app/frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import WorkoutPage from './pages/WorkoutPage';
import MealPage from './pages/MealPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProgressPage from './pages/ProgressPage';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main className='max-w-6xl mx-auto p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/workouts' element={<WorkoutPage />} />
            <Route path='/meals' element={<MealPage />} />
            <Route path='/progress' element={<ProgressPage />} />
            <Route path='/ai-assistant' element={<AiAssistant />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
