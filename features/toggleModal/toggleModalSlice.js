import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalShown: false,
  modalName: "",
};

export const toggleModalSlice = createSlice({
  name: "toogle-modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      const modalName = action.payload;
      state.modalShown = true;
      state.modalName = modalName;
    },
    hideModal: (state) => {
      state.modalShown = false;
      state.modalName = "";
    },
  },
});

export const { showModal, hideModal } = toggleModalSlice.actions;

export default toggleModalSlice.reducer;
