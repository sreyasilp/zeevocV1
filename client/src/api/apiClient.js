import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Create an Axios instance
const API = axios.create({ baseURL: "http://localhost:4444/", withCredentials: true });
// const API = axios.create({ baseURL: "https://zeevoc-server.onrender.com" }); 

// Add a request interceptor
API.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
API.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    await refreshToken();
    return API(originalRequest);
  }
  return Promise.reject(error);
});

const refreshToken = async () => {
  try {
    const response = await API.post('user/refresh-token');
    document.cookie = `token=${response.data.token}; max-age=3600; path=/; secure; samesite=strict`;
  } catch (error) {
    console.error('Refresh token failed', error);
  }
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export default API;
 