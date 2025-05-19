import { formApi } from "@/app/.lib/api/formApi";
import { ratesApi } from "@/app/.lib/api/ratesApi";
import { filterSlice } from "@/app/accommodation/filterSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [formApi.reducerPath]: formApi.reducer,
      [ratesApi.reducerPath]: ratesApi.reducer,
      [filterSlice.reducerPath]: filterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(formApi.middleware)
        .concat(ratesApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
