import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { productsReducer } from '@test-react-app/ui-products';
import thunk from 'redux-thunk';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { toggleSideBarReducer } from '@test-react-app/ui-share';

const rootReducer = combineReducers({
  sideBarToggle: toggleSideBarReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, ...getDefaultMiddleware()],
});
