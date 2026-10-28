// Need to use the React-specific entry point to import createApi
import { RatesApiDates } from "@/app/.lib/types";
import { mapResponse } from "@/app/accommodation/mapping";
import { AllRates } from "@/app/accommodation/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  "https://faas-syd1-c274eac6.doserverless.co/api/v1/web/fn-f128daea-976b-402e-9f78-17eac28ae887/default/kakapo-lodge-rates";

// Define a service using a base URL and expected endpoints
export const ratesApi = createApi({
  reducerPath: "ratesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getRates: builder.query<AllRates, RatesApiDates>({
      query: ({ start_date, end_date }) => {
        return {
          url: "/",
          params: { start_date, end_date },
        };
      },
      transformResponse: mapResponse,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRatesQuery } = ratesApi;
