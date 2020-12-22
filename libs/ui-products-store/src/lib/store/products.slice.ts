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
import { productService } from '../services';

export const PRODUCT_FEATURE_KEY = 'products';

export interface ProductState extends EntityState<Product> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any | null;
}

const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const fetchProduct = createAsyncThunk(
  `${PRODUCT_FEATURE_KEY}/fetchProducts`,
  async (params: { [key: string]: string }) => {

    const response: { count: number, rows: Product[] } =
      await productService.get('/products', { ...params });

    return response.rows;
  }
);

const initialState: ProductState = productAdapter.getInitialState({
  status: 'idle',
  error: null,
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
        state.status = 'loading';
      })
      .addCase(
        fetchProduct.fulfilled,
        (state: ProductState, action: PayloadAction<Product[]>) => {
          productAdapter.setAll(state, action.payload);
          state.status = 'succeeded';
        }
      )
      .addCase(fetchProduct.rejected, (state: ProductState, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Reducer
export const productsReducer = productsSlice.reducer;

// Actions
export const productsActions = productsSlice.actions;

const { selectAll, selectEntities, selectById, selectIds, selectTotal } = productAdapter.getSelectors();

// Selectors
export const getProductsState = (rootState: unknown): ProductState => rootState[PRODUCT_FEATURE_KEY];

export const selectAllProducts = createSelector(getProductsState, selectAll);

export const selectProductsEntities = createSelector(getProductsState, selectEntities);

export const selectProductIds = createSelector(getProductsState, selectIds);

export const selectProductsTotal = createSelector(getProductsState, selectTotal);

export const selectProductEntity =
  (productId) => createSelector(getProductsState, (state) => selectById(state, productId));
