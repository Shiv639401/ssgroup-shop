import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
import orderReducer from "../slices/orderSlice";
import usersReducer from "../slices/usersSlice";
import homeReducer from "../slices/homeSlice";
import dealReducer from "../slices/dealSlice"; // ✅ FIXED

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    users: usersReducer,
    home: homeReducer,
    deals: dealReducer,
  },
});