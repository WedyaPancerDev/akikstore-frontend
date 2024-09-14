import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  transactionDetailCustomer,
  transactionHistoryCustomerCount,
  type TransactionHistoryCustomerResponse,
  type TransactionHistoryCustomerCountResponse,
} from "services/orders";

const useHistoryTransactionCustomer = (
  customerId: number
): UseQueryResult<ApiResponse<TransactionHistoryCustomerResponse[]>, Error> => {
  const QUERY_KEY = ["history-transaction", customerId];
  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () =>
      customerId !== 0 ? await transactionDetailCustomer(customerId) : null,
    staleTime: staleOneDay,
    enabled: !!customerId,
    retry: false,
    
  });
};

const useHistoryTransactionCustomerCount = (
  customerId: number
): UseQueryResult<
  ApiResponse<TransactionHistoryCustomerCountResponse>,
  Error
> => {
  const QUERY_KEY = ["history-transaction-count", customerId];
  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () =>
      customerId !== 0
        ? await transactionHistoryCustomerCount(customerId)
        : null,
    staleTime: staleOneDay,
    enabled: !!customerId,
    retry: false,
  });
};

export { useHistoryTransactionCustomer, useHistoryTransactionCustomerCount };
