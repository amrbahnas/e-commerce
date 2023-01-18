import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL, REACT_APP_API_TOKEN } = process.env;

// fetch categories products
export const fetchProducts = createAsyncThunk(
  "store/fetchProducts",
  async (customUrl, { rejectWithValue }) => {
    try {
      const res = await axios.get(REACT_APP_API_URL + customUrl, {
        headers: {
          Authorization: "bearer " + REACT_APP_API_TOKEN,
        },
      });
      return await res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
};

export const counterSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = false;
      state.loading = false;
      console.log("error");
    },
  },
});

export default counterSlice.reducer;
