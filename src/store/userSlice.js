import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  photoURL: "",
  userImage: "",
};

export const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTheUserName: (state, action) => {
      state.userName = action.payload;
    },
    setTheEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhotoURL: (state, action) => {
      state.photoURL = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
  },
});

export const { setTheUserName, setTheEmail,setPhotoURL, setUserImage } =
  userSlice.actions;
export default userSlice.reducer;
