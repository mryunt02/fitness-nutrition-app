// filepath: /Users/bugrahanyunt/Developer/fitness-nutrition-app/frontend/src/App.js
import React, { createContext, useState } from 'react';
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
export const AuthContext = createContext(null);
const App = () => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    name: 'John Doe',
    age: 30,
    weight: 70,
    height: 175,
    gender: 'male',
    fitnessLevel: 'intermediate',
    healthCondition: 'None',
    goal: 'Weight Loss',
  });

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/workouts' element={<WorkoutPage />} />
          <Route path='/meals' element={<MealPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/progress' element={<ProgressPage />} />
          <Route path='/ai-assistant' element={<AiAssistant />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
