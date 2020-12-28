import {
  EntityAdapter,
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { Product } from './types';
import { Status } from '@test-react-app/core';
import { productService } from '../services';

export const PRODUCT_FEATURE_KEY = 'products';

export interface ProductState extends EntityState<Product> {
  status: Status;
  total: number;
}

const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const fetchProduct = createAsyncThunk(
  `${PRODUCT_FEATURE_KEY}/fetchProducts`,
  async (params: { [key: string]: string }, { rejectWithValue }) => {
    try {
      const response: { count: number, rows: Product[] } =
        await productService.get('/products', { ...params });

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

const initialState: ProductState = productAdapter.getInitialState({
  status: {
    resolved: false,
    rejected: false,
    pending: false,
    err: null,
  },
  total: 0,
});

const productsSlice = createSlice({
  name: PRODUCT_FEATURE_KEY,
  initialState,
  reducers: {
    add: productAdapter.addOne,
    remove: productAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state: ProductState) => {
        state.status = {
          ...state.status,
          pending: true,
        };
      })
      .addCase(
        fetchProduct.fulfilled,
        (state: ProductState, action: PayloadAction<{ count: number, rows: Product[] }>) => {
          productAdapter.setAll(state, action.payload.rows);
          state.status = {
            resolved: true,
            rejected: false,
            pending: false,
            err: null,
          };
          state.total = action.payload.count;
        }
      )
      .addCase(fetchProduct.rejected, (state: ProductState, action) => {
        state.status = {
          resolved: false,
          rejected: true,
          pending: false,
          err: action.payload ? (action.payload as any).message : action.error.message,
        };
      });
  },
});

// Reducer
export const productsReducer = productsSlice.reducer;

// Actions
export const productsActions = productsSlice.actions;

const { selectAll, selectEntities, selectById, selectIds } = productAdapter.getSelectors();

// Selectors
export const getProductsState = (rootState: unknown): ProductState => rootState[PRODUCT_FEATURE_KEY];

export const selectAllProducts = createSelector(getProductsState, selectAll);

export const selectProductsEntities = createSelector(getProductsState, selectEntities);

export const selectProductIds = createSelector(getProductsState, selectIds);

export const selectProductEntity =
  (productId) => createSelector(getProductsState, (state) => selectById(state, productId));

export const selectProductsTotal = createSelector(
  getProductsState,
  data => data.total,
);

export const selectProductsState = createSelector(
  getProductsState,
  data => data.status,
);
