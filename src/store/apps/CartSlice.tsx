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
  resultTransaction: {
    invoice_number: string | null;
    order_date: string | null;
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

const getInitialResultTransaction = (): CartState["resultTransaction"] => {
  const savedCart = secureLocalStorage.getItem("invoice");

  if (savedCart) {
    return JSON.parse(savedCart as string);
  }

  return {
    invoice_number: null,
    order_date: null,
  };
};

const localStorageData = getInitialCartState();
const resultInititalData = getInitialResultTransaction();

const initialState: CartState = {
  cartProduct: {
    customer_id: localStorageData.customer_id,
    products: localStorageData.products,
  },
  resultTransaction: {
    invoice_number: resultInititalData.invoice_number,
    order_date: resultInititalData.order_date,
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
    setTransactionResult: (state: CartState, action) => {
      return {
        ...state,
        resultTransaction: action.payload,
      };
    },
  },
});

export const { setCartProduct, setTransactionResult } = cartSlice.actions;

export default cartSlice.reducer;
