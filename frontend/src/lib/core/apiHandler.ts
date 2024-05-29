// utils/apiHandler.ts

import axiosInstance from './axiosInstance';

interface ApiRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  headers?: any;
}

const apiHandler = async <T>(config: ApiRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
      timeout: 50000,
    });

    return response.data;
  } catch (error: any) {
    // Customize the error handling as needed
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default apiHandler;
