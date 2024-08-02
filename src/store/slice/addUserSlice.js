import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API = import.meta.env.VITE_API_URL;

export const registerUserApi = createApi({
  reducerPath: "registerUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/users` }),
  tagTypes: ["User"],

  endpoints: (build) => ({
    addUser: build.mutation({
      query: (body) => ({
        url: "/add-users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          registerUserApi.util.updateQueryData("getRegUser",undefined,(user) => {
              user.unshift({ id: crypto.randomUUID(), ...userData });
            })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }), //end addUser

    getRegUser: build.query({
      query: () => "/getRegUsers",
      providesTags: ["User"],
    }), // end getRegUser

    deleteRegUser: build.mutation({
      query: (id) => ({
        url: `/deleteRegUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }), // end deleteRegUser
  }), // end endPoints
}); // end createApi

export const {
  useAddUserMutation,
  useGetRegUserQuery,
  useDeleteRegUserMutation,
} = registerUserApi;
