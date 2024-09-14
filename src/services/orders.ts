import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type ProcessOrderResponse = {
  transactions: {
    snap_token: string | null;
    snap_redirect_url: string | null;
  };
  schedules: {
    order_date: Date | string;
    invoice_code: string;
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

export type TransactionHistoryCustomerResponse = {
  order_number: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total_price: number;
  customer_name: string;
  coupon: string;
  payment_method: string;
  bank_name: string;
  transaction_type: string;
  order_date: Date | string;
  due_date: Date | string | null;
  customer_phone: string | null;
  order_details: Array<{
    product_name: string;
    shipping_name: string;
    shipping_cost: number;
    quantity: number;
    price: number;
    total: number;
  }>;
};

export const transactionDetailCustomer = async (
  customerId: number
): Promise<ApiResponse<TransactionHistoryCustomerResponse[]>> => {
  const result = await axios.get(`/order/transaction/${customerId}`);

  return result.data as ApiResponse<TransactionHistoryCustomerResponse[]>;
};

export type TransactionHistoryCustomerCountResponse = {
  unpaid: number;
  paid: number;
  canceled: number;
};

export const transactionHistoryCustomerCount = async (
  customerId: number
): Promise<ApiResponse<TransactionHistoryCustomerCountResponse>> => {
  const result = await axios.get(`/order/history-transaction/${customerId}`);

  return result.data as ApiResponse<TransactionHistoryCustomerCountResponse>;
};

export type UploadTransactionProofingPayload = {
  order_id: string;
  customer_id: number;
  image_proofing: string;
};

export const uploadTransactionProofing = async (
  payload: UploadTransactionProofingPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/file/uploads/proofing", payload);

  return result.data;
};
