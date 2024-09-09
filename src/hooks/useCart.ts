import toast from "react-hot-toast";

import { useDispatch } from "store/Store";
import useCookie from "./useCookie";

import {
  type PickProductState,
  type CartState,
  setCartProduct,
} from "store/apps/CartSlice";

type ReturnType = {
  getCart: () => CartState["cartProduct"];
  handleSaveCart: (payload: PickProductState) => void;
  handleRemoveCart: (payload: PickProductState) => void;
};

const defaultValue = {
  customer_id: null,
  products: [],
};

const useCart = (): ReturnType => {
  const dispatch = useDispatch();
  const { saveToLocalStorage, getFromLocalStorage } = useCookie();

  const handleSaveCart = (payload: PickProductState): void => {
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
      cart.products.push({ ...payload, stock: 1 });
    }

    const currentPayload = {
      customer_id: cart.customer_id ?? null,
      products: cart.products,
    };

    dispatch(setCartProduct(currentPayload));
    saveToLocalStorage("cart", JSON.stringify(currentPayload));
  };

  const getCart = (): CartState["cartProduct"] => {
    const result = getFromLocalStorage(
      "cart"
    ) as unknown as CartState["cartProduct"];

    return {
      customer_id: result?.customer_id ?? null,
      products: result?.products ?? [],
    };
  };

  const handleRemoveCart = (payload: PickProductState): void => {
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
  };

  return {
    handleSaveCart,
    getCart,
    handleRemoveCart,
  };
};

export default useCart;
