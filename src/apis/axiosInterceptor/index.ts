import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    const status = err.response?.status;
    const message = (err.response?.data as {message?: string}).message;
    const code = err.code;
    switch (status) {
      case 400:
        console.error(`[400] ${message}`);
        console.error("에러코드:", code);
        break;
      case 404:
        console.error(`[404] ${message}`);
        console.error("에러코드:", code);
        break;
    }
  }
);
