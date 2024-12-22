import React from 'react';
import { Link } from 'react-router-dom';
import { House, User, Dumbbell, Beef, Loader } from 'lucide-react';
import NavLink from './NavLink';

const Navbar = () => {
  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='font-bold text-xl'>
            FitTrack
          </Link>
          <div className='flex space-x-4'>
            <NavLink to='/' icon={<House size={20} />} label='Dashboard' />
            <NavLink to='/profile' icon={<User size={20} />} label='Profile' />
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
