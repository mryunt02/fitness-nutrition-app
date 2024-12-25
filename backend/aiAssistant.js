// aiPrediction.js (Backend)
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Get AI prediction for the football match
 * @param {string} team1 - Home team name
 * @param {string} team2 - Away team name
 * @returns {string} - Prediction result (e.g., Team 1 wins, Team 2 wins, Draw)
 */
const getAiSuggestion = async (userInfo) => {
  const prompt = ``;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // AI's prediction
  } catch (error) {
    console.error('Error generating AI prediction:', error);
    throw new Error('AI prediction failed');
  }
};

module.exports = { getAiSuggestion };
