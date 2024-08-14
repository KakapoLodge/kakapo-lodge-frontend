import { configureStore } from "@reduxjs/toolkit";
import { ratesApi } from "../accommodation/rates";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ratesApi.reducerPath]: ratesApi.reducer,
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
