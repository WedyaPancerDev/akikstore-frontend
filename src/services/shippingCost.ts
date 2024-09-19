import axios from "utils/axios";
import type { ApiResponse } from "types/response";
import { ReactSelectValueProps } from "types";

export type GetShippingCostResponse = {
  id: number;
  shipping_code: string;
  name: string;
  city: string;
  cost: number;
  area: string;
  description?: string;
  service?: string;
  code?: string;
  area_destination: string;
  city_destination: string;
};

export const getShippingCost = async (): Promise<
  ApiResponse<GetShippingCostResponse[]>
> => {
  const result = await axios.get("/shippingcost/all");

  return result.data as ApiResponse<GetShippingCostResponse[]>;
};

export type ShippingCostPayload = {
  name: string;
  city: string;
  cost: number;
  area: string;
  area_destination: string;
  city_destination: string;
};

export const createShippingCost = async (
  payload: ShippingCostPayload
): Promise<ApiResponse<null>> => {
  const result = await axios.post("/shippingcost/create", payload);

  return result.data as ApiResponse<null>;
};

export type RajaOngkirProvinceResponse = {
  province_id: string;
  province: string;
};

export const getProvince = async (): Promise<
  ApiResponse<RajaOngkirProvinceResponse[]>
> => {
  const result = await axios.get("/shippingcost/global/province/all");

  return result.data as ApiResponse<RajaOngkirProvinceResponse[]>;
};

export type RajaOngkirCityResponse = {
  city_id: string;
  province_id: string;
  province: string;
  type: "Kabupaten" | "Kota";
  city_name: string;
  postal_code: string;
};

export const getCity = async (
  provinceId: number
): Promise<ApiResponse<RajaOngkirCityResponse[]>> => {
  const result = await axios.get(`/shippingcost/global/city/${provinceId}/all`);

  return result.data as ApiResponse<RajaOngkirCityResponse[]>;
};

export const getCourier = async (): Promise<
  ApiResponse<ReactSelectValueProps>
> => {
  const result = await axios.get("/shippingcost/global/courier/all");

  return result.data as ApiResponse<ReactSelectValueProps>;
};

export type CourierPayload = {
  origin: string;
  destination: string;
  weight: string | number;
  courier: "jne" | "pos" | "tiki" | string;
};

export type RajaOngkirCost = {
  code: string;
  name: string;
  costs: Array<{
    service: string;
    description: string;
    cost: Array<{
      value: number;
      etd: string;
      note: string;
    }>;
  }>;
};

export type CourierCostResponse = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
};

export const getCost = async (
  payload: CourierPayload
): Promise<ApiResponse<CourierCostResponse[]>> => {
  const result = await axios.post("/shippingcost/global/cost", payload);

  return result.data as ApiResponse<CourierCostResponse[]>;
};
