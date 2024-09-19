import axios from "utils/axios";
import type { ApiResponse } from "types/response";

export type GeneratePDFPayload = {
  first_date: string;
};

export type GetGeneratePDFResponse = {
  url: string;
};

export const getGeneratePDF = async (
  payload: GeneratePDFPayload
): Promise<ApiResponse<GetGeneratePDFResponse>> => {
  const result = await axios.post("/pdf/pdf-generate", payload);

  return result.data as ApiResponse<GetGeneratePDFResponse>;
};
