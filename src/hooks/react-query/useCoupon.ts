import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  getCoupon,
  getAllCoupon,
  type GetCouponResponse,
} from "services/coupon";
import useCookie from "hooks/useCookie";

const useAllGetCoupon = (): UseQueryResult<
  ApiResponse<GetCouponResponse[]>,
  Error
> => {
  const { getCurrentCookie } = useCookie();
  const token = getCurrentCookie();

  const QUERY_KEY = ["coupon-all"];
  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (token ? await getAllCoupon() : null),
    staleTime: staleOneDay,
    enabled: !!token,
    retry: false,
  });
};

const useGetCouponFirst = (): UseQueryResult<
  ApiResponse<GetCouponResponse>,
  Error
> => {
  const { getCurrentCookie } = useCookie();
  const token = getCurrentCookie();

  const QUERY_KEY = ["coupon"];
  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (token ? await getCoupon() : null),
    staleTime: staleOneDay,
    enabled: !!token,
    retry: false,
  });
};

export { useGetCouponFirst, useAllGetCoupon };
