import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { getCategory, type GetCategoryResponse } from "services/category";

const useCategories = (): UseQueryResult<
  ApiResponse<GetCategoryResponse>,
  Error
> => {
  const QUERY_KEY = ["categories"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getCategory(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useCategories };
