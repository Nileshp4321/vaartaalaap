import {configureStore} from '@reduxjs/toolkit';
import coutnerReducer from './slice/createSlice';
export const store = configureStore({
  reducer: {
    counter: coutnerReducer,
  },
});
