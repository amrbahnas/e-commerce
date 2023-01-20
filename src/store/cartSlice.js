import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.data.find((el) => el.id === action.payload.id)) {
        state.data = state.data.map((el) =>
          el.id === action.payload.id
            ? { ...el, itemCount: el.itemCount + action.payload.itemCount }
            : el
        );
        state.totalPrice +=
          action.payload.price * action.payload.itemCount;
      } else {
        state.data.push(action.payload);
        state.totalPrice +=
          action.payload.price * action.payload.itemCount;
      }
    },
    daleteProduct: (state, action) => {
      const { id, price } = action.payload;
      state.totalPrice -=
        price * state.data.find((el) => el.id === id).itemCount;
      state.data = state.data.filter((el) => el.id !== id);
    },
    resetCart: (state, action) => {
      state.data = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, daleteProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
