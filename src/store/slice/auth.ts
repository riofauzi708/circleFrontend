import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "../../types/app";

export interface IAuthState {
  [x: string]: any;
  user: IProfile | null | undefined;
  token: string;
  isAuthenticated: boolean;
  isFollowing: boolean; // Add this line
}

const initialState: IAuthState = {
  user: undefined,
  token: "",
  isAuthenticated: false,
  isFollowing: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (
      state,
      action: PayloadAction<{ user: IProfile; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    Logout: (state) => {
      localStorage.removeItem("token");
      state.user = undefined;
      state.token = "";
    },
    setFollowStatus: (state, action: PayloadAction<boolean>) => {
      state.isFollowing = action.payload;
    },
  },
});

export const { Login, Logout, setFollowStatus } = authSlice.actions;
export default authSlice.reducer;
