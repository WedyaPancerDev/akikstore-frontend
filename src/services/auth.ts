import axios from "utils/axios";
import type { ApiResponse } from "types/response";
import type { Role } from "types";

export type LoginResponse = {
  token: string;
  token_type: string;
  role: Role;
  email: string;
  user_id: string;
  avatar: string;
  person: number
  exp: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const authLogin = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const result = await axios.post("/auth/login", payload);

  return result?.data as ApiResponse<LoginResponse>;
};

export type RegisterPayload = {
  email: string;
  password: string;
  confirmation_password: string;
  fullname: string;
  phone: string;
  city: string;
  country: string;
  postal_code: string;
};

export const authRegister = async (
  payload: LoginPayload
): Promise<ApiResponse<LoginResponse>> => {
  const result = await axios.post("/auth/register", payload);

  return result?.data as ApiResponse<LoginResponse>;
};

export type GetProfileResponse = {
  id: string;
  email: string;
  account_status: "active" | "inactive";
  role: Role;
  employees: {
    fullname: string;
    address: string;
    phone: string;
    identity_number: string;
    avatar: string;
  };
  customers: {
    fullname: string;
    address: string;
    phone: string;
    city: string;
    country: string;
    postal_code: string;
    avatar: string;
    address_secondary: string;
  };
};

export const getUserProfile = async (): Promise<
  ApiResponse<GetProfileResponse>
> => {
  const result = await axios.get("/auth/me");

  return result.data as ApiResponse<GetProfileResponse>;
};

export type GetStatusTokenResponse = {
  user_id: string;
  exp: number;
};

export const getStatusToken = async (): Promise<
  ApiResponse<GetStatusTokenResponse>
> => {
  const result = await axios.get("/auth/check-token");

  return result.data as ApiResponse<GetStatusTokenResponse>;
};

export const authLogout = async (): Promise<ApiResponse<null>> => {
  const result = await axios.post("/auth/logout");

  return result.data as ApiResponse<null>;
};
