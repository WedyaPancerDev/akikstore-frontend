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
