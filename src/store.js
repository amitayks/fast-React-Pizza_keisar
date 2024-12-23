import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./featurs/user/userSlice";
import cartReduer from "./featurs/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReduer,
  },
});

export default store;
