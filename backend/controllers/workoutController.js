const workoutService = require('../services/workoutService');

const createWorkout = async (req, res) => {
  try {
    const workout = await workoutService.createWorkout(req.body);
    res.status(201).send(workout);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getWorkoutsByUserId = async (req, res) => {
  try {
    const workouts = await workoutService.getWorkoutsByUserId(
      req.params.userId
    );
    res.status(200).send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
};
