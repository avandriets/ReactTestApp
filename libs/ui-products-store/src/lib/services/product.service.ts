import { Product } from '../store';
import axios from 'axios';

const baseUrl = process.env.NX_BASE_URL;

async function get(apiEndpoint: string, params: { [key: string]: string }): Promise<{ count: number, rows: Product[] }> {

  const response = await axios.get<{ count: number, rows: Product[] }>(`${baseUrl}${apiEndpoint}`, { params });

  return response.data;

}

async function getById(apiEndpoint: string, id: string, params: { [key: string]: string }): Promise<Product> {

  const response = await axios.get<Product>(`${baseUrl}${apiEndpoint}/${id}`, { params });

  return response.data;

}

async function post(apiEndpoint: string, data: any, params: { [key: string]: string }): Promise<Product> {

  const response = await axios.post<Product>(`${baseUrl}${apiEndpoint}`, data, { params });

  return response.data;

}

async function put(apiEndpoint: string, id: string, data: any, params: { [key: string]: string }): Promise<Product> {

  const response = await axios.put<Product>(`${baseUrl}${apiEndpoint}/${id}`, data, { params });

  return response.data;

}

async function del(apiEndpoint: string, id: string, params: { [key: string]: string }): Promise<Product> {

  const response = await axios.delete<Product>(`${baseUrl}${apiEndpoint}/${id}`, { params });

  return response.data;

}

export const productService = {
  get,
  getById,
  post,
  put,
  del,
};
