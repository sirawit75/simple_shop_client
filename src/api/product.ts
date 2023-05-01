import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URI || process.env.REACT_APP_PRODUCT_URI,
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile") && localStorage.getItem("profile"))
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "").token
    }`;
  return req;
});

export const getProducts = (id?: string) =>
  id ? api.get(`/product?id=${id}`) : api.get(`/product`);

export const getProduct = (id: number) => api.get("/product/item/" + id);

export const getCarts = () => api.get("/product/getcarts");
export const deleteCart = (id: number) =>
  api.delete("/product/deletecart/" + id);

export type manageCartType = {
  product_id: number;
  qty: number;
};
export const manageCart = (info: manageCartType) =>
  api.put("/product/managecart", info);
