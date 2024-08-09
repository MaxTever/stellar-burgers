import { TConstructorIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

type TConstructorState = {
  bun?: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    }
  },
  selectors: {
    getConstructorItems: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const { getConstructorItems } = constructorSlice.selectors;
export const constructorReducer = constructorSlice.reducer;
