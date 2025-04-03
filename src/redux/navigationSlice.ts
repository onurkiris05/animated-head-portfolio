import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavPosition = "topRight" | "topLeft" | "bottomRight" | "bottomLeft" | "";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    toggled: "",
  },
  reducers: {
    setNavState: (state, action: PayloadAction<NavPosition>) => {
      state.toggled = action.payload;
    },
  },
});

export const { setNavState } = navigationSlice.actions;
export default navigationSlice.reducer;
