import { createSlice } from "@reduxjs/toolkit";

const setDeletedTeacherCourses = createSlice({
  name: "setDeletedTeacherCourses",
  initialState: {
    setFunction: () => {},
  },
  reducers: {
    onDeletedChange: (state, action) => {
      state.setFunction = action.payload;
    },
  },
});
export const { onDeletedChange } = setDeletedTeacherCourses.actions;
export default setDeletedTeacherCourses.reducer;
