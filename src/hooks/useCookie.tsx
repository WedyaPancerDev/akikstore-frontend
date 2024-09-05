import nookies, { setCookie, destroyCookie } from "nookies";
import secureStorage from "react-secure-storage";

type ReturnTypes = {
  saveCookie: (args: SaveCookieProps) => void;
  getCurrentCookie: (keyActive?: string) => string | null;
  removeFromCookie: (currentCookie: string) => void;

  saveToLocalStorage: (key: string, value: string) => void;
  getFromLocalStorage: (key: string) => string | null;
  removeFromLocalStorage: (key: string) => void;
};

type SaveCookieProps = {
  token: string;
  keyActive?: string;
  exp?: number;
};

const key = "@key";

const useCookie = (): ReturnTypes => {
  const getCurrentCookie = (keyActive: string = key): string | null => {
    const currentToken = nookies.get();

    return currentToken[keyActive] || null;
  };

  const saveCookie = ({
    token,
    keyActive = key,
    exp,
  }: SaveCookieProps): void => {
    const currentToken = getCurrentCookie();

    if (!currentToken) {
      setCookie(null, keyActive, String(token), {
        maxAge: exp || 1 * 60 * 60 * 24,
        path: "/",
      });
    }
  };

  const removeFromCookie = (currentKey: string): void => {
    destroyCookie(null, currentKey);
  };

  const saveToLocalStorage = (key: string, value: string): void => {
    typeof window !== "undefined" && secureStorage.setItem(key, value);
  };

  const getFromLocalStorage = (key: string): string | null => {
    const result = secureStorage.getItem(key) as string | null;

    if (!result) return null;

    return JSON.parse(result);
  };

  const removeFromLocalStorage = (key: string): void => {
    typeof window !== "undefined" && secureStorage.removeItem(key);
  };

  return {
    saveCookie,
    getCurrentCookie,
    removeFromCookie,

    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
  };
};

export default useCookie;
