import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { getCustomer, type CustomerResponse } from "services/user";
import useCookie from "hooks/useCookie";
import { ValidateProps } from "types";

const useGetCustomers = (): UseQueryResult<
  ApiResponse<CustomerResponse[]>,
  Error
> => {
  const { getCurrentCookie, getFromLocalStorage } = useCookie();

  const token = getCurrentCookie();
  const secureValue = getFromLocalStorage("validate");
  const currentRole = (secureValue as unknown as ValidateProps)?.role;

  const QUERY_KEY = ["customer-active"];
  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () =>
      token && currentRole === "admin" ? await getCustomer() : null,
    staleTime: staleOneDay,
    enabled: !!token,
    retry: false,
  });
};

export { useGetCustomers };
