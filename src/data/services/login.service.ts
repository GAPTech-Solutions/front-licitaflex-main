import useHttpRequest from "@/hooks/useHttpRequest";
import { ServiceBase } from "./service.base";

export default class LoginService extends ServiceBase {
  protected getNameRecurso(): string {
    return "";
  }

  async login(email: string, password: string) {
    return this.post<any, { token: string; refresh_token: string }>(
      "login_check",
      { email, password }
    );
  }

  async logout(token: string) {
    return this.post<any, any>("token/invalidate", { refresh_token: token });
  }

  async refreshToken(refreshToken: string, options?: Record<string, any>) {
    return this.post<any, { token: string; refresh_token: string }>(
      "token/refresh",
      {
        refresh_token: refreshToken,
        ...options,
      }
    );
  }
}

export function useLoginService() {
  const http = useHttpRequest();
  return new LoginService(http);
}
