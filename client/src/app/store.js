import { configureStore } from "@reduxjs/toolkit";
import alert from "../reducers/alert";
import auth from "../reducers/auth";
import contact from "../reducers/contact";
import profile from "../reducers/profile";
import post from "../reducers/post";

export const store = configureStore({
  reducer: {
    alert,
    auth,
    contact,
    profile,
    post,
  },
});
