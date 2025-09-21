import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    
  },
  reducers: {
    userSignUp: (state, action) => {
      console.log(
        "This is from authSlice:",
        action.payload.schoolname,
        action.payload.token,
        action.payload.user
      );

      state.user = action.payload.user || state.user;
      state.accessToken = action.payload.token || state.accessToken;
  
    },
    userLoggedIn: (state, action) => {
      // console.log(
      //   "THis is from authSilce ................................",
      //   action.payload.token
      // );
      // Assign user profile and token to state
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
    },
    userUpdated: (state, action) => {
      // Update user profile
      state.user = { ...state.user, ...action.payload };
    },
    userLoggedOut: (state) => {
      // Clear user data and token
  
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("auth");
      window.location.reload();
    },
  },
});
export const { userSignUp, userLoggedIn, userUpdated, userLoggedOut } =
  authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export const authReducer = authSlice.reducer;
