import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fitness-nutrition-app-1.onrender.com/', // Set your base URL here
});

export default axiosInstance;
