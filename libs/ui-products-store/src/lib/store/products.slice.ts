import {
  AnyAction,
  AsyncThunk,
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

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export interface ProductState extends EntityState<Product> {
  status: Status;
  total: number;
}

const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const fetchProducts = createAsyncThunk(
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

export const fetchProductById = createAsyncThunk(
  `${PRODUCT_FEATURE_KEY}/fetchProductById`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response: Product =
        await productService.getById(`/products`, id, {});

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const createProduct = createAsyncThunk(
  `${PRODUCT_FEATURE_KEY}/createProduct`,
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      const response: Product =
        await productService.post(`/products`, product, {});

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateProduct = createAsyncThunk(
  `${PRODUCT_FEATURE_KEY}/updateProduct`,
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      const response: Product =
        await productService.put(`/products`, product.id, product, {});

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const deleteProduct = createAsyncThunk(
  `${PRODUCT_FEATURE_KEY}/deleteProduct`,
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      const response: Product =
        await productService.del(`/products`, product.id, {});

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

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

const productsSlice = createSlice({
  name: PRODUCT_FEATURE_KEY,
  initialState,
  reducers: {
    add: productAdapter.addOne,
    remove: productAdapter.removeOne,
    setResolved(state) {
      state.status = {
        resolved: true,
        rejected: false,
        pending: false,
        err: null,
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
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
      .addCase(
        fetchProductById.fulfilled,
        (state: ProductState, action: PayloadAction<Product>) => {
          productAdapter.upsertOne(state, action.payload);
          state.status = {
            resolved: true,
            rejected: false,
            pending: false,
            err: null,
          };
        }
      )
      .addCase(createProduct.fulfilled, (state: ProductState, action: PayloadAction<Product>) => {
        productAdapter.addOne(state, action.payload);

        state.status = {
          resolved: true,
          rejected: false,
          pending: false,
          err: null,
        };
      })
      .addCase(updateProduct.fulfilled, (state: ProductState, action: PayloadAction<Product>) => {
        productAdapter.upsertOne(state, action.payload);

        state.status = {
          resolved: true,
          rejected: false,
          pending: false,
          err: null,
        };
      })
      .addCase(deleteProduct.fulfilled, (state: ProductState, action: PayloadAction<Product>) => {
        productAdapter.removeOne(state, action.payload.id);

        state.status = {
          resolved: true,
          rejected: false,
          pending: false,
          err: null,
        };
      })
      .addMatcher(isPendingAction, (state) => {
        state.status = {
          ...state.status,
          pending: true,
        };
      })
      .addMatcher(isRejectedAction, (state, action: any) => {
        state.status = {
          resolved: false,
          rejected: true,
          pending: false,
          err: (action.payload ? (action.payload as any).message : action.error.message) || 'Request was rejected.',
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
