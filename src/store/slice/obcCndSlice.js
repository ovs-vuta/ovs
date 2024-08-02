import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = import.meta.env.VITE_API_URL;

export const obcCandidateApi = createApi({
  reducerPath: "obcApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/users` }),
  tagsType: ["Candidates", "Vote"],

  endpoints: (build) => ({
    addObcCnd: build.mutation({
      query: (body) => ({
        url: "add-all-candidates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Candidates"],
    }),
    addObcVote: build.mutation({
      query: (body) => ({
        url: "add-obc-vote",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vote"],
    }),
    modifyObcCnd: build.mutation({
      query: (body) => ({
        url: "/modifyObcCnd",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Candidates"],
    }),
    deleteObcCnd: build.mutation({
      query: (id) => ({
        url: `deleteObcCnd/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Candidates"],
    }),
    getAllObcCnd: build.query({
      query: () => "/all-candidates",
      providesTags: ["Candidates", "Vote"],
    }),
  }),
});

export const {
  useAddObcCndMutation,
  useAddObcVoteMutation,
  useModifyObcCndMutation,
  useDeleteObcCndMutation,
  useGetAllObcCndQuery,
} = obcCandidateApi;
