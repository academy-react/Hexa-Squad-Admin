import { createSlice } from "@reduxjs/toolkit";

const setDeletedCourses = createSlice({
  name: "setDeletedCourses",
  initialState: {
    setFunction: () => {},
    data: [],
  },
  reducers: {
    onDeletedChange: (state, action) => {
      state.setFunction = action.payload;
    },
    onDelete: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { onDeletedChange } = setDeletedCourses.actions;
export const { onDelete } = setDeletedCourses.actions;
export default setDeletedCourses.reducer;
