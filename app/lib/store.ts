import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "../accommodation/filterSlice";
import { ratesApi } from "./api/ratesApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ratesApi.reducerPath]: ratesApi.reducer,
      [filterSlice.reducerPath]: filterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ratesApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
