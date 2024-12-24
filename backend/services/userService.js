// filepath: /Users/bugrahanyunt/Developer/fitness-nutrition-app/backend/services/userService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return {
    ...user._doc,
    token: generateToken(user._id),
  };
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return {
      ...user._doc,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = {
  createUser,
  getUserById,
  authenticateUser,
};
