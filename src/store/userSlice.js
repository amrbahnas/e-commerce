import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  photoURL: "",
  userImage: "",
  userAddress: { location: "", city: "", postal: "", country: "" },
  paymentMethod: "",
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
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserPaymentMethods: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  setTheUserName,
  setTheEmail,
  setPhotoURL,
  setUserImage,
  setUserAddress,
  setUserPaymentMethods,
} = userSlice.actions;
export default userSlice.reducer;
