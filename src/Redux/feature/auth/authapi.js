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
    // add location
    addLocation: builder.mutation({
      query: (formData) => ({
        url: "/dashboard/locations/",
        method: "POST",
        body: formData,
      }),
    }),
    getLocations: builder.query({
      query: () => "/dashboard/locations/",
      providesTags: ["Locations"],
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/dashboard/locations/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/dashboard/locations/${id}/`,
        method: "PUT",
        body: data, // JSON body
      }),
      invalidatesTags: ["Location"],
    }),
    // provider application
    getProviders: builder.query({
      query: () => "/dashboard/provider-documents/", // GET request path
      providesTags: ["Providers"],
    }),

    updateProviderStatus: builder.mutation({
      query: ({ id, approval_status }) => ({
        url: `/dashboard/provider-documents/${id}/`,
        method: "PUT",
        body: { approval_status },
      }),
      invalidatesTags: ["Providers"],
    }),
    // categories create
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/dashboard/admin/categories/create/",
        method: "POST",
        body: formData, // multipart/form-data for image
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/dashboard/admin/categories/${id}/update/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategories: builder.query({
      query: () => "/dashboard/admin/categories/",
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/dashboard/admin/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"], // automatically refetch categories
    }),
    // transiction
    getCTransiction: builder.query({
      query: () => "/transactions/admin/transactions/",
    }),
    getPayout: builder.query({
      query: () => "/transactions/admin/subscriptions/",
    }),
    getAwaitting: builder.query({
      query: () => "/transactions/admin/payouts/",
    }),
    // awaiting

    approvePayout: builder.mutation({
      query: ({ id }) => ({
        url: `/transactions/admin/payouts/${id}/action/`,
        method: "POST",
        body: { action: "approved" },
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
  useGetProfileUpdateQuery,
  // locattion
  useAddLocationMutation,
  useGetLocationsQuery,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
  // category
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  // provider
  useGetProvidersQuery,
  useUpdateProviderStatusMutation,
  // transiction
  useGetCTransictionQuery,
  useGetAwaittingQuery,
  useGetPayoutQuery,
  // approved
  useApprovePayoutMutation,
} = authapi;
