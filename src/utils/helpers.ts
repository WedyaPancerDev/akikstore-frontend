import { VITE_APP_ENV } from "./env";
import CryptoJS from 'crypto-js';

export const getEnv = (): "prod" | "dev" => {
  const env = VITE_APP_ENV === "prod" ? "prod" : "dev";

  return env;
};

export const formatPrice = (amount: number): string => {
  if (typeof amount !== "number") {
    return "Rp 0";
  }

  const result = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

  return result;
};

const k = "d17e5fb4-352f-4263-a4c7-e271efd3b998";

export const encryptText = (text: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(text, k).toString();
  return ciphertext.split("/").join("---").split("+").join("@@");
};

export const decryptText = (text: string): string => {
  try {
    const encrypted = text
      .split("---")
      .join("/")
      .split("@@")
      .join("+")
      .split(" ")
      .join("+");
    const bytes = CryptoJS.AES.decrypt(encrypted, k);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    return "";
  }
};
