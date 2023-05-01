import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as api from "../../api/product";
import { ICart } from "../../components/Cart/Cart";

export type Products = {
  ID: number;
  name: string;
  price: number;
  details: string;
  image_url: string;
};

export interface ProductState {
  products: Products[];
  hasMore: boolean;
  ID: number | null;
  cart: {
    cart: ICart[];
    total: number;
  };
}

const initialState: ProductState = {
  products: [],
  hasMore: false,
  ID: null,
  cart: {
    cart: [],
    total: 0,
  },
};

export const deleteCart = createAsyncThunk("deleteCart", async (id: number) => {
  try {
    const { data } = await api.deleteCart(id);
    return data;
  } catch (error) {
    return error;
  }
});

export const manageCart = createAsyncThunk(
  "manageCart",
  async (info: api.manageCartType) => {
    try {
      const { data } = await api.manageCart(info);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getCarts = createAsyncThunk("getCarts", async () => {
  try {
    const { data } = await api.getCarts();
    return data;
  } catch (error) {
    return error;
  }
});

export const getProducts = createAsyncThunk(
  "getProducts",
  async (id?: string) => {
    try {
      const { data } = await api.getProducts(id);
      // console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getProduct = createAsyncThunk("getProduct", async (id: number) => {
  try {
    const { data } = await api.getProduct(id);
    return data;
  } catch (error) {
    return error;
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductState>) => {
      state.products.push(...action.payload.products);
      return state;
    },
    setID: (state, action: PayloadAction<number>) => {
      state.ID = action.payload;
    },
    setCart: (state, action: PayloadAction<ICart[]>) => {
      if (action.payload) {
        state.cart.cart = action.payload;
        action.payload.map((item) => {
          return (state.cart.total += item.qty * item.product.price);
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.hasMore = action.payload.has_more;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cart.cart = state.cart.cart.filter(
        (item) => item.ID !== action.meta.arg
      );
      state.cart.total = 0;
      state.cart.cart.map((item) => {
        return (state.cart.total += item.qty * item.product.price);
      });
    });
  },
});

export const { setProducts, setID, setCart } = productSlice.actions;

export default productSlice.reducer;
