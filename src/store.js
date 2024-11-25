import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import questionsReducer from "./features/questions/questionsSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer,
  },
});

export default store;
