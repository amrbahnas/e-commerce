import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id:"",
  userName: "",
  email: "",
  photoURL: "",
  userImage: "",
  userAddress: { location: "", city: "", postal: "", country: "" },
  paymentMethod: "",
  orders: [],
  
};

export const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTheUserId: (state, action) => {
      state.id = action.payload;
    },
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
    setUserOrders: (state, action) => {
      state.orders=action.payload;
    },
    addUserOrders: (state, action) => {
      state.orders.push(action.payload);
    },
    resetUserOrders: (state) => {
      state.orders=[];
    },
  },
});

export const {
  setTheUserId,
  setTheUserName,
  setTheEmail,
  setPhotoURL,
  setUserImage,
  setUserAddress,
  setUserPaymentMethods,
  addUserOrders,
  setUserOrders,
  resetUserOrders,
} = userSlice.actions;
export default userSlice.reducer;
