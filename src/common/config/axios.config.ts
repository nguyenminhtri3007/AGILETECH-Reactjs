import axios, { AxiosError } from "axios";
import { AppConfig } from "./app.config";

const appConfig = new AppConfig();

const CustomAxios = axios.create();

CustomAxios.interceptors.request.use(
  async (config) => {
    const accessToken = await appConfig.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
  },
  (error: AxiosError) => {
    console.error(">>> Lỗi khi gửi request:", error);
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
)

export default CustomAxios;