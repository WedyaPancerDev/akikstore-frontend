import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type GetShippingCostResponse = {
  id: number;
  shipping_code: string;
  name: string;
  city: string;
  cost: number;
  area: string;
};

export const getShippingCost = async (): Promise<
  ApiResponse<GetShippingCostResponse[]>
> => {
  const result = await axios.get("/shippingcost/all");

  return result.data as ApiResponse<GetShippingCostResponse[]>;
};
