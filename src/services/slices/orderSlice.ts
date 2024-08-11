import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderSlice = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderSlice = {
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const { getOrderRequest, getOrderModalData } = orderSlice.selectors;
export const { setOrderRequest, setOrderModalData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
