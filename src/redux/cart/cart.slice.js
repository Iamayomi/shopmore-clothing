import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: true,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state) => {
      state.hidden = !state.hidden;
    },
    addItems: (state, action) => {
      state.cartItems = [state.cartItems, ...action.payload];
    },
  },
});

export const { setCart, addItems } = cartSlice.actions;

export default cartSlice.reducer;
