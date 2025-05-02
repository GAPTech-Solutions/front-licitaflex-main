import { useLoginService } from "@/data/services/login.service";
import { Token } from "@/data/types/Token";
import useLocalStorage from "@/hooks/useLocalStorage";

import JWTDecode from "@/utils/jwt.decode";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type AuthContextProps = {
  tokenData?: Token;
  token?: string | null;
  refreshToken?: string | null;
  isLogin?: boolean;
  login: (email: string, senha: string) => Promise<Boolean>;
  logout: () => Promise<boolean>;
  atualizarToken: (options?: Record<string, any>) => Promise<Boolean | string>;
};
const AuthContext = createContext<AuthContextProps>({
  login: async () => false,
  logout: async () => true,
  atualizarToken: async () => false,
});

export const AuthProvider = (props: PropsWithChildren) => {
  const loginService = useLoginService();
  const [tokenEncode, setTokenEncode] = useLocalStorage<string>("token");
  const [refreshToken, setRefreshToken] =
    useLocalStorage<string>("refresh_token");

  const login = async (email: string, senha: string) => {
    try {
      const resp = await loginService.login(email, senha);
      setRefreshToken(resp.refresh_token);
      setTokenEncode(resp.token);
      return true;
    } catch (error) {
      setRefreshToken(null);
      setTokenEncode(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await loginService.logout(refreshToken ?? "");
      return true;
    } catch {
      return false;
    } finally {
      setTokenEncode(null);
      setRefreshToken(null);
    }
  };

  const atualizarToken = async (options?: Record<string, any>) => {
    try {
      const token = JWTDecode(tokenEncode);
      const resp = await loginService.refreshToken(refreshToken ?? "", {
        tipoAcesso: token?.tipoAcesso,
        providerId: token?.providerId,
        ...options,
      });
      setRefreshToken(resp.refresh_token);
      setTokenEncode(resp.token);
      return resp.token;
    } catch (error) {
      setRefreshToken(null);
      setTokenEncode(null);
      return false;
    }
  };

  const isLogin = (token?: Token) => {
    if (token) return true;
    return false;
  };

  const value = useMemo(() => {
    const tokenData = JWTDecode(tokenEncode);
    return {
      token: tokenEncode,
      tokenData: tokenData,
      refreshToken,
      isLogin: isLogin(tokenData),
      login,
      logout,
      atualizarToken,
    };
  }, [tokenEncode, refreshToken]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
