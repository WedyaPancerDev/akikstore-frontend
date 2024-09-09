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
  code: string
): Promise<ApiResponse<GetProductByCodeResponse>> => {
  const result = await axios.get(`/product/${code}`);

  return result.data as ApiResponse<GetProductByCodeResponse>;
};
