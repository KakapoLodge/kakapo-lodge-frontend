import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

const MOBILE_MAX_WIDTH = 768;

// reference: https://stackoverflow.com/a/64218472
export const useIsMobile = () => {
  const [width, setWidth] = useState(getWidth());
  const updateWidth = () => setWidth(getWidth());

  useEffect(() => {
    window.onresize = updateWidth;

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return width <= MOBILE_MAX_WIDTH;
};

const getWidth = () => {
  return typeof document === "undefined"
    ? MOBILE_MAX_WIDTH
    : document.documentElement.clientWidth;
};
