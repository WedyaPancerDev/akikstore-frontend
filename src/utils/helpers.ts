import { VITE_APP_ENV } from "./env";

export const getEnv = (): "prod" | "dev" => {
  const env = VITE_APP_ENV === "production" ? "prod" : "dev";

  return env;
};
