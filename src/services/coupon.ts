import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type GetCouponResponse = {
  id: number;
  code: string;
  type: "percent" | "fixed";
  discount: number;
  description: string;
  expired_at: Date | string;
  status: "active" | "inactive";
};

export const getCoupon = async (): Promise<ApiResponse<GetCouponResponse>> => {
  const result = await axios.get("/coupon/first");

  return result.data as ApiResponse<GetCouponResponse>;
};

export const validateCoupon = async (
  coupon: string
): Promise<ApiResponse<null>> => {
  const result = await axios.get(`/coupon/check/${coupon}`);

  return result.data as ApiResponse<null>;
};

export const getAllCoupon = async (): Promise<
  ApiResponse<GetCouponResponse[]>
> => {
  const result = await axios.get("/coupon/all");

  return result.data as ApiResponse<GetCouponResponse[]>;
};

export type GetGenerateCouponResponse = {
  coupon: string;
};

export const getGenerateCoupon = async (): Promise<
  ApiResponse<GetGenerateCouponResponse>
> => {
  const result = await axios.get("/coupon/generate");

  return result.data as ApiResponse<GetGenerateCouponResponse>;
};

export type CreateCouponPayload = {
  code: string;
  type: "percent" | "fixed" | string;
  discount: string | number;
  description: string;
  expired_at: string;
};

export const createCoupon = async (
  payload: CreateCouponPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/coupon/create", payload);

  return result.data as ApiResponse<null>;
};

export const disableCoupon = async (id: number): Promise<ApiResponse<null>> => {
  const result = await axios.delete(`/coupon/disable/${id}`);

  return result.data as ApiResponse<null>;
};
