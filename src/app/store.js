import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../todo/redux';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
