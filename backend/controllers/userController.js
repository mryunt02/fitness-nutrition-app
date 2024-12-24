// filepath: /Users/bugrahanyunt/Developer/fitness-nutrition-app/backend/controllers/userController.js
const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    res.status(200).send(user);
  } catch (error) {
    res.status(401).send('Invalid email or password');
  }
};

module.exports = {
  createUser,
  getUserById,
  authenticateUser,
};
