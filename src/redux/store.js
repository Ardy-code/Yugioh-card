import { createStore } from "redux";
import authReducer from "./authSlice";

const store = createStore(authReducer);

export default store;
