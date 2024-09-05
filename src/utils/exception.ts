import type { AxiosError } from "axios";
import {
  ERROR_CODE_SERVER,
  ERROR_CODE_BAD_GATEWAY,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_SERVICE_UNAVAILABLE,
  ERROR_CODE_GATEWAY_TIMEOUT,
  ERROR_CORS,
} from "./http";
import toast from "react-hot-toast";

export const exceptionResponse = (error: AxiosError): void => {
  if (error.response) {
    const codeStatus = error.response.status as number;

    switch (codeStatus) {
      case ERROR_CODE_SERVER:
        toast.error(`Oops, server lagi penuh nih, sabar yaa :${codeStatus}`);
        break;
      case ERROR_CODE_UNAUTHORIZED:
        toast.error(
          `Oops, kamu tidak memiliki akses untuk melakukan aksi ini :${codeStatus}`
        );
        break;
      case ERROR_CODE_BAD_GATEWAY:
        toast.error(
          `Oops, server ada masalah nih, silahkan coba lagi nanti ya :${codeStatus}`
        );
        break;
      case ERROR_CODE_SERVICE_UNAVAILABLE:
        toast.error(
          `Oops, server lagi tidak bisa diakses nih, silahkan coba lagi nanti ya :${codeStatus}`
        );
        break;
      case ERROR_CODE_GATEWAY_TIMEOUT:
        toast.error(
          `Oops, server tidak menerima tanggapan, silahkan coba lagi nanti ya :${codeStatus}`
        );
        break;
      case ERROR_CORS:
        toast.error(
          `Oops, terjadi kesalahan. silahkan coba lagi nanti ya :${codeStatus}`
        );
        break;
    }
  } else if (error.request) {
    const codeReqStatus = error.request.status as number;

    toast.error(
      `Oops, terjadi kesalahan. Tidak ada respon dari server :${codeReqStatus}`
    );
  }
};
