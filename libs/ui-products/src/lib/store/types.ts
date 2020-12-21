import { EntityState } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  title: string;
  description: string;
  category_id: string;
}

export interface ProductState extends EntityState<Product> {
  status: string;
  error: any | null;
}
