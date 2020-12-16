import { combineReducers } from 'redux'
import { toggleSideBarReducer } from '@test-react-app/ui-share';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  sideBarToggle: toggleSideBarReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, ...getDefaultMiddleware()],
});
