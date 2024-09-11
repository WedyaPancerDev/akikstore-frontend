import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  getShippingCost,
  type GetShippingCostResponse,
} from "services/shippingCost";

const useShippingCost = (): UseQueryResult<
  ApiResponse<GetShippingCostResponse[]>,
  Error
> => {
  const QUERY_KEY = ["shipping-cost"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getShippingCost(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useShippingCost };
