import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
} from '@reduxjs/toolkit';
import { Product, ProductState } from './types';
import { productService } from '../services';

const productsAdapter: EntityAdapter<Product> = createEntityAdapter({
  sortComparer: (a: Product, b: Product) => b.id.localeCompare(a.id),
});

const initialState: ProductState = productsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (param: { [key: string]: string }) => {
  const response: { count: number, rows: Product[] } = await productService.get('/products', { ...param });

  return response.rows;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchProducts.pending.type]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProducts.fulfilled.type]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched products to the array
      productsAdapter.upsertMany(state, action.payload)
    },
    [fetchProducts.rejected.type]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => (state as any).products);

export const productsReducer = productsSlice.reducer;
