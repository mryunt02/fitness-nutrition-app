import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  House,
  User,
  Dumbbell,
  Beef,
  Loader,
  Menu,
  X,
  Brain,
  LogIn,
} from 'lucide-react';
import NavLink from './NavLink';
import { AuthContext } from '../App';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useContext(AuthContext);

  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='font-bold text-xl'>
            FitTrack
          </Link>
          <div className='md:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className={`hidden md:flex space-x-4`}>
            {userData.isLoggedIn ? (
              <>
                <NavLink
                  to='/dashboard'
                  icon={<House size={20} />}
                  label='Dashboard'
                />
                <NavLink
                  to='/profile'
                  icon={<User size={20} />}
                  label='Profile'
                />
                <NavLink
                  to='/workouts'
                  icon={<Dumbbell size={20} />}
                  label='Workouts'
                />
                <NavLink to='/meals' icon={<Beef size={20} />} label='Meals' />
                <NavLink
                  to='/progress'
                  icon={<Loader size={20} />}
                  label='Progress'
                />
                <NavLink
                  to='/ai-assistant'
                  icon={<Brain size={20} />}
                  label='AI Assistant'
                />
              </>
            ) : (
              <>
                <NavLink to='/login' icon={<LogIn size={20} />} label='Login' />
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-gray-800 bg-opacity-90 z-10'
          onClick={() => setIsMenuOpen(false)}
        >
          <div className='flex flex-col items-center justify-center h-full bg-white'>
            <button
              className='absolute top-4 right-4'
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className='flex flex-col space-y-4'>
              <NavLink
                to='/dashboard'
                icon={<House size={20} />}
                label='Dashboard'
                className='text-xl'
              />
              <NavLink
                to='/profile'
                icon={<User size={20} />}
                label='Profile'
                className='text-xl'
              />
              <NavLink
                to='/workouts'
                icon={<Dumbbell size={20} />}
                label='Workouts'
                className='text-xl'
              />
              <NavLink
                to='/meals'
                icon={<Beef size={20} />}
                label='Meals'
                className='text-xl'
              />
              <NavLink
                to='/progress'
                icon={<Loader size={20} />}
                label='Progress'
                className='text-xl'
              />
              <NavLink
                to='/ai-assistant'
                icon={<Brain size={20} />}
                label='AI Assistant'
                className='text-lg'
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
