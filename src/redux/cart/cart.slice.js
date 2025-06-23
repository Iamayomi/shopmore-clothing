import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: true,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.hidden = !state.hidden;
    },

    addItem: (state, action) => {
      state.cartItems = [...state.cartItems, ...action.payload];
    },

    addItems: (state, action) => {
      state.cartItems = [...state.cartItems, ...action.payload];
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { toggleCart, setCart, addItems } = cartSlice.actions;

export default cartSlice.reducer;
