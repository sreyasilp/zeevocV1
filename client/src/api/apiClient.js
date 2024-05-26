import axios from 'axios';

// Create an Axios instance
// const API = axios.create({ baseURL: "http://localhost:4444/" });
const API = axios.create({ baseURL: "https://zeevoc-server.onrender.com" });

// Add a request interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await API.post('user/refresh-token', { token }); // Send current token to backend
    localStorage.setItem('token', response.data.token); // Update localStorage with new token
    return response.data.token;
  } catch (error) {
    console.error('Refresh token failed', error);
    localStorage.removeItem('token'); // Clear token from storage
    window.location.href = '/login'; // Redirect to login page
    return null;
  }
};

// Add a response interceptor
API.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const newToken = await refreshToken();
    if (newToken) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return API(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default API;
