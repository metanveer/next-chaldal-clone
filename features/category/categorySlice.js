import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  categories: [],
  currentCategory: {},
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload.category);
      return {
        ...state,
        ...action.payload.category,
      };
    },
  },
});

export const { setCategories, setCurrentCategory } = categorySlice.actions;

export default categorySlice;
