import { configureStore } from "@reduxjs/toolkit";

import CustomizerReducer from "./customizer/CustomizerSlice";
import DashboardReducer from "./apps/DashboardSlice";
import CartSlice from "./apps/CartSlice";

import { combineReducers } from "redux";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    dashboard: DashboardReducer,
    cart: CartSlice,
  },
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  dashboard: DashboardReducer,
  cart: CartSlice,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
export const useDispatch = (): AppDispatch => useAppDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
