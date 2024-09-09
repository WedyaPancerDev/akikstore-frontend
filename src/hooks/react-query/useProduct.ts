import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { getProducts, type GetProductsResponse } from "services/products";

const useProducts = (): UseQueryResult<
  ApiResponse<GetProductsResponse[]>,
  Error
> => {
  const QUERY_KEY = ["products"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getProducts(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useProducts };
