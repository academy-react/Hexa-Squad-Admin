import { createSlice } from "@reduxjs/toolkit";

const setActiveCourses = createSlice({
  name: "setActiveCourses",
  initialState: {
    setFunction: () => {},
  },
  reducers: {
    onActiveChange: (state, action) => {
      state.setFunction = action.payload;
    },
  },
});
export const { onActiveChange } = setActiveCourses.actions;
export default setActiveCourses.reducer;
