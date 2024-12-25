const Workout = require('../models/Workout');
const User = require('../models/User');

const createWorkout = async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();

    // Add workout reference to user
    await User.findByIdAndUpdate(workout.userId, {
      $push: { workouts: workout._id },
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getWorkoutsByUserId = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
};
