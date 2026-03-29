import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMeals: {},
  guestMeals: {},
  guestSelectedMeals: {},
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setMeal: (state, action) => {
      const { date, mealKey, items } = action.payload;

      if (!state.selectedMeals[date]) {
        state.selectedMeals[date] = {};
      }

      state.selectedMeals[date][mealKey] = items;
    },

    setGuestQty: (state, action) => {
      const { date, mealKey, qty } = action.payload;

      if (!state.guestMeals[date]) {
        state.guestMeals[date] = {};
      }

      state.guestMeals[date][mealKey] = qty;
    },

    clearMeals: (state) => {
      state.selectedMeals = {};
      state.guestMeals = {};
    },

    setGuestMeal: (state, action) => {
      const { date, mealKey, items } = action.payload;

      if (!state.guestSelectedMeals[date]) {
        state.guestSelectedMeals[date] = {};
      }

      state.guestSelectedMeals[date][mealKey] = items;
    },
  },
});

export const { setMeal, setGuestQty, clearMeals, setGuestMeal } =
  mealSlice.actions;

export default mealSlice.reducer;

export const selectTotal = (state, date) => {
  const meals = state.meal.selectedMeals[date] || {};

  return Object.values(meals).reduce((total, arr) => {
    return total + arr.reduce((sum, item) => sum + (item.price || 0), 0);
  }, 0);
};

export const selectGuestTotal = (state, date) => {
  const meals = state.meal.guestSelectedMeals[date] || {};
  const guest = state.meal.guestMeals[date] || {};

  return Object.entries(meals).reduce((total, [key, arr]) => {
    const qty = guest[key] || 1;

    const mealTotal = arr.reduce((sum, item) => sum + (item.price || 0), 0);

    return total + mealTotal * qty;
  }, 0);
};
