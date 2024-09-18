import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  getProducts,
  getProductsAdmin,
  getProductByCode,
  type GetProductsResponse,
  type GetProductsAdminResponse,
} from "services/products";

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

const useProductsAdmin = (): UseQueryResult<
  ApiResponse<GetProductsAdminResponse[]>,
  Error
> => {
  const QUERY_KEY = ["products-admin"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getProductsAdmin(),
    staleTime: staleOneDay,
    retry: false,
  });
};

const useProductByCodeAdmin = (
  code: string
): UseQueryResult<ApiResponse<GetProductsAdminResponse>, Error> => {
  const QUERY_KEY = ["products-code-admin", code];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () =>
      code !== "" ? await getProductByCode(code, "admin") : null,
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useProducts, useProductsAdmin, useProductByCodeAdmin };
