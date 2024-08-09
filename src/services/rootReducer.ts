import { ingredientsReducer } from './slices/getIngredients';
import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from './slices/constructorSlice';

export const RootReducer = combineReducers({
  ingredientsSlice: ingredientsReducer,
  constructorSlice: constructorReducer
});
