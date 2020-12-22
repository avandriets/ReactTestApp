import { Product } from '../store';
import axios from 'axios';

const baseUrl = process.env.NX_BASE_URL;

async function get(apiEndpoint: string, params: { [key: string]: string }): Promise<{ count: number, rows: Product[] }> {

  try {
    const response = await axios.get<{ count: number, rows: Product[] }>(`${baseUrl}${apiEndpoint}`, { params });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }

}

export const productService = {
  get,
};
