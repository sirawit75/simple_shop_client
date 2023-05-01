import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as api from "../../api/user";

export interface AuthState {
  username: string;
}

const initialState: AuthState = {
  username: "",
};

export type userInfo = {
  email: string;
  username: string;
  password: string;
};

export const register = createAsyncThunk(
  "register",
  async (userInfo: userInfo) => {
    try {
      const { data } = await api.register(userInfo);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (userInfo: Omit<userInfo, "email">) => {
    try {
      const { data } = await api.login(userInfo);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("profile");
      state.username = "";
    },
    setUser: (state, action: PayloadAction<any>) => {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      if (action?.payload?.user?.username)
        state.username = action?.payload?.user?.username;
    },
    getUsername: (state) => {
      const profile = localStorage.getItem("profile");
      if (profile) state.username = JSON.parse(profile)?.user?.username;
    },
  },
});

export const { setUser, getUsername, logout } = userSlice.actions;

export default userSlice.reducer;
