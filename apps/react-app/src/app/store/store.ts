import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { productsReducer } from '@test-react-app/ui-products-store';
import thunk from 'redux-thunk';
import { toggleSideBarReducer } from '@test-react-app/ui-share';

const rootReducer = combineReducers({
  sideBarToggle: toggleSideBarReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, ...getDefaultMiddleware()],
});
