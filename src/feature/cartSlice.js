import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (existedItemIndex >= 0) {
        state.cartItems[existedItemIndex].cartQuantity += 1;
        toast.info("Quantity Increased", { position: "bottom-left" });
      } else {
        const item = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(item);
        toast.success("Product Added", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        const item = state.cartItems[itemIndex];
        if (item.cartQuantity > 1) {
          item.cartQuantity -= 1;
          toast.warn("Quantity Decreased", { position: "bottom-left" });
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload.id,
          );
          toast.error("Product Removed", { position: "bottom-left" });
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id,
      );
      toast.error("Product Removed", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeAllFromCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart Cleared", { position: "bottom-left" });
    },

    getSubtotal(state) {
      console.log(state);

      const subTotal = state.cartItems.reduce((acc, item) => {
        const itemTotal = +item.price * +item.cartQuantity;
        acc += itemTotal;
        return acc;
      }, 0);

      state.cartTotalAmount = subTotal;
    },
  },
});

export const {
  addtoCart,
  decreaseCart,
  removeFromCart,
  removeAllFromCart,
  getSubtotal,
} = cartSlice.actions;

export default cartSlice.reducer;
