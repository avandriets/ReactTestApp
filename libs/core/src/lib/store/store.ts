import { combineReducers } from 'redux';
import { toggleSideBarReducer } from '@test-react-app/ui-share';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productsReducer } from '@test-react-app/ui-products';

const rootReducer = combineReducers({
  sideBarToggle: toggleSideBarReducer,
  products: productsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, ...getDefaultMiddleware()],
});
