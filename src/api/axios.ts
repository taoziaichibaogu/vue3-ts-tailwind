import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 可以在这里处理错误
    return Promise.reject(error);
  },
);

export default api;
