import axios, { type AxiosRequestConfig } from "axios";
import type { Macro, RollResult } from "./types";

const AUTHURL = import.meta.env.VITE_AUTH_HOST_URL;
const BASEURL =
  import.meta.env.VITE_DICE_HOST_URL?.includes("simaptics")
    ? import.meta.env.VITE_DICE_HOST_URL
    : import.meta.env.VITE_MAIN_HOST_URL;

export const axiosInstance = axios.create({
  baseURL: `${BASEURL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export interface AxiosRequestConfigWithSkip extends AxiosRequestConfig {
  _skipInterceptor?: boolean;
}

// ---------------- Interceptor setup ----------------
export const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // ✅ Skip interceptor if _skipInterceptor flag is set
      if (originalRequest?._skipInterceptor) {
        return Promise.reject(error);
      }

      // Handle 401/403 for normal requests
      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await axiosInstance.post("/oauth/refresh"); // refresh token
          return axiosInstance(originalRequest); // retry original request
        } catch {
          // Redirect to login if refresh fails
          window.location.href = AUTHURL!;
        }
      }

      return Promise.reject(error);
    }
  );
};

// ---------------- API FUNCTIONS ----------------
export async function rollDice(
  num_dice: number,
  sides: number,
  modifier: number
): Promise<RollResult> {
  const { data } = await axiosInstance.post("/api/roll/", {
    num_dice,
    sides,
    modifier,
  });
  return data;
}

export async function getMacros(): Promise<Macro[]> {
  const { data } = await axiosInstance.get("/api/macros/");
  return data;
}

export async function createOrUpdateMacro(macro: Partial<Macro>): Promise<Macro> {
  try {
    if (macro.id) {
      const { data } = await axiosInstance.patch(`/api/macros/${macro.id}/`, macro);
      return data;
    } else {
      const { data } = await axiosInstance.post("/api/macros/", macro);
      return data;
    }
  } catch (err: any) {
    if (err.response?.status === 400 && err.response.data) {
      const data = err.response.data;

      // Try non_field_errors first
      if (Array.isArray(data.non_field_errors) && data.non_field_errors[0]) {
        throw new Error(data.non_field_errors[0]);
      }

      // Then try first field error
      const firstFieldError = Object.values(data).find(
        (val: any) => Array.isArray(val) && val.length > 0
      ) as string[] | undefined; // ✅ assert type here

      if (firstFieldError) {
        throw new Error(firstFieldError[0]); // now TS knows it's an array
      }

      // Fallback
      throw new Error("Failed to save macro.");
    }
    throw err;
  }
}





export async function deleteMacro(id: number) {
  await axiosInstance.delete(`/api/macros/${id}/`);
}


export async function loggedIn(): Promise<boolean> {
  try {
    const response = await axiosInstance.get("/user", {
      _skipInterceptor: true, // ✅ now allowed
    } as AxiosRequestConfigWithSkip);

    if ("userId" in response.data) return true;
  } catch (err) {
    // Not logged in, silently fail
  }
  return false;
}
