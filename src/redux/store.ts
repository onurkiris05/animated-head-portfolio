import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import sectorReducer from "./sectorSlice";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    sector: sectorReducer,
  },
});
