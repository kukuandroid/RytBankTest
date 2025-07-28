import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://192.168.1.8:3000/api'; // Replace with your actual API base URL

export async function postApi<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    console.log(`${API_BASE_URL}${url}`)
  const response = await axios.post<T>(`${API_BASE_URL}${url}`, data, config);
  return response.data;
}

export async function getApi<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get<T>(`${API_BASE_URL}${url}`, config);
  return response.data;
}
