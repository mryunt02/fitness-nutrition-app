const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  exercises: [
    {
      name: String,
      reps: Number,
      sets: Number,
      duration: Number, // in minutes for cardio exercises
    },
  ],
});

module.exports = mongoose.model('Workout', workoutSchema);
