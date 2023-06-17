import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./slices/filter/slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import pizzasSlice from "./slices/pizzas/slice";
import paginationSlice from "./slices/pagination/slice";
import cartSlice from "./slices/cart/slice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizzas: pizzasSlice,
    pagination: paginationSlice,
    cart: cartSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootDispatch = typeof store.dispatch
export const useRootDispatch = () => useDispatch<RootDispatch>()

export default store

