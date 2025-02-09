import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, actions) => {
      console.log('actions.payload', actions.payload);
      state.value += actions.payload;
    },
    decremnt: (state, actions) => {
      if (state.value >= 0) {
        state.value -= actions.payload;
      }
      return;
    },
    resetValue: (state, actions) => {
      state.value = 0;
    },
  },
});

export const {increment, decremnt, resetValue} = counterSlice.actions;
export default counterSlice.reducer;
