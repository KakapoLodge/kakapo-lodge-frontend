import { useEffect, useState } from "react";

const MOBILE_MAX_WIDTH = 768;

// reference: https://stackoverflow.com/a/64218472
export const useMobileDetection = () => {
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
