import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type GetDashboardResponse = {
  customer: number;
  order: number;
  product: number;
  courier: number;
};

export const getDashboard = async (): Promise<
  ApiResponse<GetDashboardResponse>
> => {
  const response = await axios.get<ApiResponse<GetDashboardResponse>>(
    "/dashboard/public"
  );

  return response.data;
};
