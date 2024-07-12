const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET all workout
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({});
  res.status(200).json(workouts);
};

//GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(workout);
};
//POST a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  //add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(workout);
};

//UPDATE a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Not Found!" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ err: "Not Found!" });
  }
  res.status(200).json(workout);
};
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
