import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

import { type GetProductsResponse } from "services/products";

export type PickProductState = Pick<
  GetProductsResponse,
  "product_code" | "id" | "title" | "price_sell" | "stock" | "images"
> & {
  max_stock?: number;
  category?: string;
  shipping_cost_id?: number;
  shipping_cost_name?: string;
};

export type CartState = {
  cartProduct: {
    customer_id: string | null;
    products: PickProductState[];
  };
};

const getInitialCartState = (): CartState["cartProduct"] => {
  const savedCart = secureLocalStorage.getItem("cart");

  if (savedCart) {
    return JSON.parse(savedCart as string);
  }

  return {
    customer_id: null,
    products: [],
  };
};

const localStorageData = getInitialCartState();

const initialState: CartState = {
  cartProduct: {
    customer_id: localStorageData.customer_id,
    products: localStorageData.products,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProduct: (state: CartState, action) => {
      return {
        ...state,
        cartProduct: action.payload,
      };
    },
  },
});

export const { setCartProduct } = cartSlice.actions;

export default cartSlice.reducer;
