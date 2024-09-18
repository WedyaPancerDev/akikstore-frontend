import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type GetProductsResponse = {
  id: number;
  product_code: string;
  title: string;
  price_sell: number;
  stock: number;
  images: string | null;
  description: string;
  created_by: string;
  category_id: number;
  category_name: string;
  created_at?: string;
};

export const getProducts = async (): Promise<
  ApiResponse<GetProductsResponse[]>
> => {
  const result = await axios.get("/product/all");

  return result.data as ApiResponse<GetProductsResponse[]>;
};

export interface GetProductsAdminResponse extends GetProductsResponse {
  price_buy: number;
  category_id: number;
}

export const getProductsAdmin = async (): Promise<
  ApiResponse<GetProductsAdminResponse[]>
> => {
  const result = await axios.get("/product/all?sector=admin");

  return result.data as ApiResponse<GetProductsAdminResponse[]>;
};

type CleanProduct = Omit<GetProductsResponse, "category_name" | "created_by">;

export interface GetProductByCodeResponse extends CleanProduct {
  created_by: number;
  categories: {
    name: string;
  };
  employees: {
    fullname: true;
  };
}

export const getProductByCode = async (
  code: string,
  keyValue: "admin" | "default" = "default"
): Promise<ApiResponse<GetProductByCodeResponse>> => {
  const url =
    keyValue === "admin" ? `/product/${code}?sector=admin` : `/product/${code}`;

  const result = await axios.get(url);

  return result.data as ApiResponse<GetProductByCodeResponse>;
};

export type ProductPayload = {
  title: string;
  description: string;
  price_buy: number;
  price_sell: number;
  stock: number;
  category_id: number;
  images: string;
};

export const addProduct = async (
  payload: ProductPayload
): Promise<ApiResponse<null>> => {
  const response = await axios.post("/product/create", payload);

  return response.data as ApiResponse<null>;
};

export const updateProduct = async (
  payload: ProductPayload,
  code: string
): Promise<ApiResponse<null>> => {
  const response = await axios.patch(`/product/update/${code}`, payload);

  return response.data as ApiResponse<null>;
};
