import { FormContent } from "@/app/.lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  "https://faas-syd1-c274eac6.doserverless.co/api/v1/web/fn-f128daea-976b-402e-9f78-17eac28ae887/default/contact-form-email";

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    submitForm: builder.query<string, FormContent>({
      query: (formContent) => ({
        url: "/",
        method: "post",
        body: formContent,
        responseHandler: "text",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }),
    }),
  }),
});

export const { useLazySubmitFormQuery } = formApi;
