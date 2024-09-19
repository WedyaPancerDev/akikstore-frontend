import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { getDashboard, type GetDashboardResponse } from "services/dashboard";

const useDashboardAdmin = (): UseQueryResult<
  ApiResponse<GetDashboardResponse>,
  Error
> => {
  const QUERY_KEY = ["dashboard-admin"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getDashboard(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useDashboardAdmin };
