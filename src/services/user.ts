import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type CustomerResponse = {
  fullname: string;
  phone: string;
  address: string;
  avatar: string | null;
  country: string;
  city: string;
  postal_code: number;
  users: {
    email: string;
    account_status: "active" | "inactive";
    role: "admin" | "staff" | "customer";
  };
};

export const getCustomer = async (): Promise<
  ApiResponse<CustomerResponse[]>
> => {
  const result = await axios.get("/user/customer");

  return result.data as ApiResponse<CustomerResponse[]>;
};
