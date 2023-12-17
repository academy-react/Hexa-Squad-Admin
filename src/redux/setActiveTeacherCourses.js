import { createSlice } from "@reduxjs/toolkit";

const setActiveTeacherCourses = createSlice({
  name: "setActiveTeacherCourses",
  initialState: {
    setFunction: () => {},
  },
  reducers: {
    onActiveChange: (state, action) => {
      state.setFunction = action.payload;
    },
  },
});
export const { onActiveChange } = setActiveTeacherCourses.actions;
export default setActiveTeacherCourses.reducer;
