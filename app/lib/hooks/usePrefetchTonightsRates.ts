import { useEffect } from "react";
import { ratesApi } from "../api/ratesApi";
import { getTodaysDateRfc3339 } from "../dates";

export function usePrefetchTonightsRates() {
  const prefetchRates = ratesApi.usePrefetch("getRates");
  const todaysDateRfc3339 = getTodaysDateRfc3339();

  useEffect(() => {
    prefetchRates({
      start_date: todaysDateRfc3339,
      end_date: todaysDateRfc3339,
    });
  }, []);
}
