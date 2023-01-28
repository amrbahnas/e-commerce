import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName:"",
  email: "",
  photoURL: "",
};


export const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTheUserName: (state, action) => {
      state.userName = action.payload
    },
    setTheEmail: (state, action) => {
      state.email = action.payload
    },
    setThePhotoURL: (state, action) => {
      state.photoURL = action.payload
    },
  },
});



export const { setTheUserName, setTheEmail, setThePhotoURL } = userSlice.actions;
export default userSlice.reducer;

