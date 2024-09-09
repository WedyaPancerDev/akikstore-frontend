import { VITE_APP_ENV } from "./env";

export const getEnv = (): "prod" | "dev" => {
  const env = VITE_APP_ENV === "production" ? "prod" : "dev";

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
