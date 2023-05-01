import axios from "axios";
import { userInfo } from "../redux/slices/user";

const api = axios.create({
  baseURL: process.env.REACT_APP_URI || process.env.REACT_APP_USER_URI,
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile") && localStorage.getItem("profile"))
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "").token
    }`;
  return req;
});

export const register = (userInfo: userInfo) =>
  api.post("/user/register", userInfo);
export const login = (userInfo: Omit<userInfo, "email">) =>
  api.post("/user/login", userInfo);
