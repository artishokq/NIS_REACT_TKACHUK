import { baseApi } from "@/shared/api/baseApi";
import type { User, LoginRequest, LoginResponse } from "@/entities/user";

const CUSTOM_USER_OVERRIDES: Partial<User> = {
  firstName: "Артём",
  lastName: "Ткачук",
  username: "artemtk",
  email: "astkachuk_2@edu.hse.ru",
  phone: "+79145553322",
};

function mapCredentials(credentials: LoginRequest): LoginRequest {
  if (
    credentials.username === "artemtk" &&
    credentials.password === "arttka237"
  ) {
    return { username: "emilys", password: "emilyspass" };
  }
  return credentials;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: mapCredentials(credentials),
      }),
      transformResponse: (response: LoginResponse) => ({
        ...response,
        ...CUSTOM_USER_OVERRIDES,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
      transformResponse: (response: User) => ({
        ...response,
        ...CUSTOM_USER_OVERRIDES,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
