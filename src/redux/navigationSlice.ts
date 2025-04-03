import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    toggled: false,
  },
  reducers: {
    toggleNavState: (state) => {
      state.toggled = !state.toggled;
    },
  },
});

export const { toggleNavState } = navigationSlice.actions;
export default navigationSlice.reducer;
