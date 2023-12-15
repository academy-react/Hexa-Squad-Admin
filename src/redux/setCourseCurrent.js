import { createSlice } from "@reduxjs/toolkit";

const setCurrentItems = createSlice({
  name: "setCurrentItems",
  initialState: {
    setFunction: ()=>{},
  },
  reducers: {
    onCurrentChange: (state, action) => {
      state.setFunction = action.payload;
    },
  },
});
export const { onUserChange } = setCurrentItems.actions;
export default setCurrentItems.reducer;
