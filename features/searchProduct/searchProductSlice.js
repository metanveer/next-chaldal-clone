import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  client: {
    input: { name: "", value: "" },
    products: [],
  },
  server: {
    input: { name: "", value: "" },
    products: [],
  },
};

export const searchProductSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTermClient: (state, action) => {
      state.client.input.name = action.payload.name;
      state.client.input.value = action.payload.value;
    },
    setFoundProductsClient: (state, action) => {
      state.client.products = action.payload;
    },
    setSearchTermServer: (state, action) => {
      state.server.term = action.payload;
    },
    setFoundProductsServer: (state, action) => {
      state.server.products = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload.search);
      const { term, products } = action.payload.search.server;
      state.server.term = term;
      state.server.products = products;
    },
  },
});

export const {
  setSearchTermClient,
  setFoundProductsClient,
  setSearchTermServer,
  setFoundProductsServer,
} = searchProductSlice.actions;

export default searchProductSlice;
