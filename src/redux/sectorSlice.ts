import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sector } from "../utils/radialSector";

interface SectorState {
  state: Sector | null;
}

const initialState: SectorState = {
  state: null,
};

export const sectorSlice = createSlice({
  name: "sector",
  initialState,
  reducers: {
    setSector: (state, action: PayloadAction<Sector | null>) => {
      state.state = action.payload;
    },
  },
});

export const { setSector } = sectorSlice.actions;
export default sectorSlice.reducer;
