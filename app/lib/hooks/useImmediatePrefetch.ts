import { PrefetchOptions } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { ratesApi } from "../api/ratesApi";
import { useAppDispatch } from "./useStore";

type EndpointNames = keyof typeof ratesApi.endpoints;

// so that shortcuts can jump to accommodation without loading
export function useImmediatePrefetch<T extends EndpointNames>(
  endpoint: T,
  arg: Parameters<(typeof ratesApi.endpoints)[T]["initiate"]>[0],
  options: PrefetchOptions = {},
) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ratesApi.util.prefetch(endpoint, arg as any, options));
  }, []);
}
