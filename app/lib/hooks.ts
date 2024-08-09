import { useEffect, useState } from "react";

const MOBILE_MAX_WIDTH = 768;

// reference: https://stackoverflow.com/a/64218472
export const useIsMobile = () => {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const updateWidth = () => setWidth(document.documentElement.clientWidth);

  useEffect(() => {
    window.onresize = updateWidth;

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return width < MOBILE_MAX_WIDTH;
};
