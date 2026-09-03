import axios, { type AxiosRequestConfig } from 'axios';

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

/**
 * 规范的泛型请求函数：抹平 Axios 拦截器剥离 response.data 后的类型断层
 * @param config 请求配置
 * @returns 对应泛型 T 的 Promise
 */
export function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  return api(config) as unknown as Promise<T>;
}

export default api;
