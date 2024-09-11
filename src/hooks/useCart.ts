import toast from "react-hot-toast";

import { useDispatch } from "store/Store";
import useCookie from "./useCookie";

import {
  type PickProductState,
  type CartState,
  setCartProduct,
} from "store/apps/CartSlice";
import { useCallback } from "react";
import type { GetCouponResponse } from "services/coupon";
import type { GetShippingCostResponse } from "services/shippingCost";

export type NewPayload = {
  person?: number;
  transaction_type: string;
  shippingCost: GetShippingCostResponse | null;
  coupon: GetCouponResponse | null;
  products?: Array<{
    id: number;
    stock: number;
  }>;
};

type ReturnType = {
  getCart: () => CartState["cartProduct"];
  handleIncreaseCart: (payload: PickProductState) => void;
  handleDecreaseCart: (payload: PickProductState) => void;
  handleDeleteItem: (productCode: string) => void;
  savePayload: (newPayload: NewPayload) => void;
};

const defaultValue = {
  customer_id: null,
  products: [],
};

const useCart = (): ReturnType => {
  const dispatch = useDispatch();
  const { saveToLocalStorage, getFromLocalStorage } = useCookie();

  const handleIncreaseCart = useCallback(
    (payload: PickProductState): void => {
      const cart =
        (getFromLocalStorage("cart") as unknown as CartState["cartProduct"]) ||
        defaultValue;

      const findIndexProduct = cart.products.findIndex(
        (product) => product.product_code === payload.product_code
      );

      if (findIndexProduct !== -1) {
        let currentStockProduct = cart.products[findIndexProduct].stock ?? 0;

        if (currentStockProduct >= (payload?.max_stock ?? 0)) {
          toast.error(
            "Stock produk tidak mencukupi. Tidak bisa menambahkan lagi 🛑"
          );

          return;
        }

        cart.products[findIndexProduct].stock += 1;
      } else {
        toast.success("Berhasil menambahkan produk ke keranjang 🛒");
        cart.products.push({ ...payload, stock: 1 });
      }

      const currentPayload = {
        customer_id: cart.customer_id ?? null,
        products: cart.products,
      };

      dispatch(setCartProduct(currentPayload));
      saveToLocalStorage("cart", JSON.stringify(currentPayload));
    },
    [dispatch, getFromLocalStorage, defaultValue]
  );

  const getCart = (): CartState["cartProduct"] => {
    const result = getFromLocalStorage(
      "cart"
    ) as unknown as CartState["cartProduct"];

    return {
      customer_id: result?.customer_id ?? null,
      products: result?.products ?? [],
    };
  };

  const handleDecreaseCart = useCallback(
    (payload: PickProductState): void => {
      const cart =
        (getFromLocalStorage("cart") as unknown as CartState["cartProduct"]) ||
        defaultValue;

      const findIndexProduct = cart.products.findIndex(
        (product) => product.product_code === payload.product_code
      );

      if (findIndexProduct !== -1) {
        if (cart.products[findIndexProduct].stock > 1) {
          cart.products[findIndexProduct].stock -= 1;
        } else {
          cart.products.splice(findIndexProduct, 1);
        }
      }

      const currentPayload = {
        customer_id: cart.customer_id ?? null,
        products: cart.products,
      };

      dispatch(setCartProduct(currentPayload));
      saveToLocalStorage("cart", JSON.stringify(currentPayload));
    },
    [dispatch, getFromLocalStorage, defaultValue]
  );

  const handleDeleteItem = useCallback(
    (productCode: string): void => {
      const cart =
        (getFromLocalStorage("cart") as unknown as CartState["cartProduct"]) ||
        defaultValue;

      const findIndexProduct = cart.products.findIndex(
        (product) => product.product_code === productCode
      );

      if (findIndexProduct !== -1) {
        cart.products.splice(findIndexProduct, 1);
      }

      const currentPayload = {
        customer_id: cart.customer_id ?? null,
        products: cart.products,
      };

      dispatch(setCartProduct(currentPayload));
      saveToLocalStorage("cart", JSON.stringify(currentPayload));
    },
    [dispatch, getFromLocalStorage, defaultValue]
  );

  const savePayload = (newPayload: NewPayload): void => {
    const cart =
      (getFromLocalStorage("cart") as unknown as CartState["cartProduct"]) ||
      defaultValue;

    const currentPayload = {
      products: cart.products,
      ...newPayload,
    };

    saveToLocalStorage("transactions", JSON.stringify(currentPayload));
  };

  return {
    getCart,
    handleIncreaseCart,
    handleDecreaseCart,
    handleDeleteItem,
    savePayload,
  };
};

export default useCart;
