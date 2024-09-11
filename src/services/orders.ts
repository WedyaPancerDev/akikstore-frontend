import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type ProcessOrderResponse = {
  transactions: {
    snap_token: string | null;
    snap_redirect_url: string | null;
  };
  schedules: {
    order_date: Date | string;
  };
};

export type PurchaseItemProps = {
  product_id: number;
  quantity: number;
  shipping_cost_id: number;
};

export type ProcessOrderPayload = {
  customer_id: number;
  coupon_id: string | null;
  purchase_items: PurchaseItemProps[];
};

export const processOrder = async (
  payload: ProcessOrderPayload,
  type: "manual" | "automatic"
): Promise<ApiResponse<ProcessOrderResponse>> => {
  const result = await axios.post(`/order/new-transaction/${type}`, payload);

  return result.data as ApiResponse<ProcessOrderResponse>;
};
