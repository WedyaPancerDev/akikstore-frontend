import { ApiResponse } from "types/response";
import axios from "utils/axios";

export interface UploadFileResponse {
  url: string;
}

export const uploadFile = async (
  payload: FormData,
  type?: string
): Promise<ApiResponse<UploadFileResponse>> => {
  const { data } = await axios.post(`/file/uploads?type=${type}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data as ApiResponse<UploadFileResponse>;
};
