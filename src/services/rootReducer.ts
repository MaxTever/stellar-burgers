import { ingredientsReducer } from './slices/getIngredients';
import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from './slices/constructorSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';

export const RootReducer = combineReducers({
  ingredientsSlice: ingredientsReducer,
  constructorSlice: constructorReducer,
  userSlice: userReducer,
  orderSlice: orderReducer,
  feedSlice: feedReducer
});
