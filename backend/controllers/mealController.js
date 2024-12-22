const mealService = require('../services/mealService');

const createMeal = async (req, res) => {
  try {
    const meal = await mealService.createMeal(req.body);
    res.status(201).send(meal);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMealsByUserId = async (req, res) => {
  try {
    const meals = await mealService.getMealsByUserId(req.params.userId);
    res.status(200).send(meals);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createMeal,
  getMealsByUserId,
};
