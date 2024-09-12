import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  getUserProfile,
  type GetProfileResponse,
  getStatusToken,
  type GetStatusTokenResponse,
} from "services/auth";
import useCookie from "hooks/useCookie";

const useProfileUser = (): UseQueryResult<
  ApiResponse<GetProfileResponse>,
  Error
> => {
  const { getCurrentCookie } = useCookie();
  const token = getCurrentCookie();

  const QUERY_KEY = ["user-profile", token];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (token ? await getUserProfile() : null),
    staleTime: staleOneDay,
    enabled: !!token,
    retry: false,
  });
};

const useStatusToken = (token: string): UseQueryResult<
  ApiResponse<GetStatusTokenResponse>,
  Error
> => {
  const QUERY_KEY = ["user-token", token];

  const staleOneHour = 1000 * 60 * 60 * 1;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (token ? await getStatusToken() : null),
    staleTime: staleOneHour,
    retry: false,
  });
};

export { useProfileUser, useStatusToken };
