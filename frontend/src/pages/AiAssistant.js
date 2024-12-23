import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const AiAssistantPage = () => {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an AI response (replace this with actual AI logic)
    const newResponse = `AI: Based on your preferences, here is a suggested meal and workout routine.`;
    setResponses([...responses, { question: input, answer: newResponse }]);
    setInput('');
  };

  return (
    <div className=''>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-6 text-green-600 text-center'>
          AI Assistant
        </h1>
        <form onSubmit={handleSubmit} className='mb-4'>
          <div className='flex flex-col mb-4'>
            <label className='text-sm font-medium text-gray-700'>
              Dietary Preference
            </label>
            <input
              type='text'
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              placeholder='e.g., Vegetarian, Vegan, Keto...'
              className='border border-gray-300 rounded-md shadow-sm p-2'
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className='text-sm font-medium text-gray-700'>
              Fitness Goal
            </label>
            <input
              type='text'
              value={fitnessGoal}
              onChange={(e) => setFitnessGoal(e.target.value)}
              placeholder='e.g., Weight Loss, Muscle Gain, Endurance...'
              className='border border-gray-300 rounded-md shadow-sm p-2'
            />
          </div>
          <div className='flex'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ask me anything...'
              className='flex-grow border border-gray-300 rounded-md shadow-sm p-2'
            />
            <button
              type='submit'
              className='ml-2 bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-200'
            >
              Get Routine
            </button>
          </div>
        </form>
        <div className='mt-6'>
          <h2 className='text-2xl font-bold text-green-600 mb-4'>Responses</h2>
          <div className='border border-gray-300 rounded-lg p-4 bg-green-50'>
            {responses.length === 0 ? (
              <p className='text-gray-600'>No responses yet.</p>
            ) : (
              responses.map((response, index) => (
                <div key={index} className='mb-2'>
                  <p className='font-semibold'>You: {response.question}</p>
                  <p className='text-gray-700'>{response.answer}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;
