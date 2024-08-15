import { TConstructorIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { orderBurger } from './orderSlice';

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
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(index, 1);
    }
  },
  selectors: {
    getConstructorItems: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    }),
    getIngredientsIds: (state) => {
      if (state.bun) {
        return [
          state.bun._id,
          ...state.ingredients.map((ingredient) => ingredient._id)
        ];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.fulfilled, (state) => {
      state.bun = undefined;
      state.ingredients = [];
    });
  }
});

export const { getConstructorItems, getIngredientsIds } =
  constructorSlice.selectors;
export const { addIngredient, moveUp, moveDown, removeIngredient } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
