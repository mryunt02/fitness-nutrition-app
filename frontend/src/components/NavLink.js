import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className='flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900'
    >
      {icon}
      <span className='ml-2'>{label}</span>
    </Link>
  );
};

export default NavLink;
