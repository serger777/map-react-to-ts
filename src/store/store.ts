import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mapReducer from './slice';

export const store = configureStore({
  reducer: {
    dataMap: mapReducer,
  },
});