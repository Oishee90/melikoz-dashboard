import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "dashboard/token/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { refresh, access, user_profile } = data;
          // console.log(access);
          // Dispatch userLoggedIn to update Redux state
          dispatch(
            userLoggedIn({
              token: access,
            })
          );

          // Persist user data to localStorage
          localStorage.setItem(
            "auth",
            JSON.stringify({ refresh, access, user_profile })
          );

          console.log("Login successful:");
          // console.log("Login successful:", data);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    getDashboard: builder.query({
      query: () => ({
        url: "dashboard/stats/",
        method: "GET",
      }),
    }),
    getChart: builder.query({
      query: () => ({
        url: "dashboard/graph/service-monthly-growth/",
        method: "GET",
      }),
    }),
    // user
    getUser: builder.query({
      query: () => ({
        url: "dashboard/users/",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `dashboard/users/${id}/`,
        method: "DELETE",
      }),
    }),
    // service
    getService: builder.query({
      query: () => ({
        url: "dashboard/service-monitoring/",
        method: "GET",
      }),
    }),
    // AI
    getAIfeedback: builder.query({
      query: () => ({
        url: "dashboard/ai-oversight/",
        method: "GET",
      }),
    }),
    
    // update profile
     updateAdminProfile: builder.mutation({
      query: (formData) => ({
        url: "dashboard/admin/profile/",
        method: "PUT",
        body: formData,
      }),
    }),
    // getProfile
     getProfileUpdate: builder.query({
      query: () => ({
        url: "dashboard/admin/profile/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetDashboardQuery,
  useGetChartQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useGetServiceQuery,
  useGetAIfeedbackQuery,
  useUpdateAdminProfileMutation,
  useGetProfileUpdateQuery    
} = authapi;
