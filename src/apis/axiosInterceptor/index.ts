import axios, { AxiosError, AxiosResponse } from "axios";

// API 에러 응답 타입 정의
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

export const instance = axios.create({
  baseURL: "/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err: AxiosError<ApiErrorResponse>) => {
    const status = err.response?.status;
    const data = err.response?.data;
    const message =
      data?.message || data?.error || "알 수 없는 오류가 발생했습니다.";
    const code = err.code;

    // 에러 로깅
    console.error(`[${status || "NETWORK"}] ${message}`);
    if (code) {
      console.error("에러코드:", code);
    }

    // 상태 코드별 처리
    switch (status) {
      case 400:
        console.error("잘못된 요청입니다.");
        break;
      case 401:
        console.error("인증이 필요합니다.");
        // 필요시 로그인 페이지로 리다이렉트
        break;
      case 403:
        console.error("접근 권한이 없습니다.");
        break;
      case 404:
        console.error("요청한 리소스를 찾을 수 없습니다.");
        break;
      case 500:
        console.error("서버 내부 오류입니다.");
        break;
      default:
        if (status) {
          console.error(`HTTP ${status} 오류가 발생했습니다.`);
        } else {
          console.error("네트워크 오류가 발생했습니다.");
        }
    }

    // 에러를 다시 throw해서 컴포넌트에서 catch할 수 있도록 함
    return Promise.reject(err);
  }
);
