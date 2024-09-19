import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  getProvince,
  getShippingCost,
  type RajaOngkirCityResponse,
  type RajaOngkirProvinceResponse,
  type GetShippingCostResponse,
  getCity,
  getCourier,
} from "services/shippingCost";
import useCookie from "hooks/useCookie";

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

const useShippingProvince = (): UseQueryResult<
  ApiResponse<RajaOngkirProvinceResponse[]>,
  Error
> => {
  const { getCurrentCookie } = useCookie();
  const token = getCurrentCookie();

  const QUERY_KEY = ["shipping-province"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (token ? await getProvince() : null),
    staleTime: staleOneDay,
    retry: false,
  });
};

const useShippingCity = (
  provinceId: number
): UseQueryResult<ApiResponse<RajaOngkirCityResponse[]>, Error> => {
  const QUERY_KEY = ["shipping-city", provinceId];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (provinceId !== 0 ? await getCity(provinceId) : null),
    staleTime: staleOneDay,
    retry: false,
  });
};

const useGetCourier = (
  isShow: boolean
): UseQueryResult<ApiResponse<RajaOngkirCityResponse[]>, Error> => {
  const QUERY_KEY = ["shipping-courier", isShow];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => (isShow ? await getCourier() : null),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useShippingCost, useShippingProvince, useShippingCity, useGetCourier };
