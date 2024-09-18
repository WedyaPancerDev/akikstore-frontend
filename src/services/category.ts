import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type GetCategoryResponse = {
  id: number;
  name: string;
};

export const getCategory = async (): Promise<
  ApiResponse<GetCategoryResponse[]>
> => {
  const result = await axios.get("/category/all");

  return result.data as ApiResponse<GetCategoryResponse[]>;
};

export type AddCategoryPayload = {
  name: string;
};

export const addCategory = async (
  payload: AddCategoryPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/category/create", payload);

  return result.data as ApiResponse<null>;
};

export const updateCategory = async (
  payload: AddCategoryPayload,
  id: number
): Promise<ApiResponse<null>> => {
  const result = await axios.patch(`/category/update/${id}`, payload);

  return result.data as ApiResponse<null>;
};
