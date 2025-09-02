import { useEffect } from "react";

import { useAuth } from "./useAuth";
import { axiosClient } from "../lib";

export const useAxios = () => {
  const { token, logout } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosClient.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const resInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [token, logout]);

  return axiosClient;
};
