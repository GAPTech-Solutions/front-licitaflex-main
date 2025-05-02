import { useAuth } from "@/Context/AuthContext";
import { Token } from "@/data/types/Token";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const tokenExpired = (token?: Token) => {
  const timeAtual = Date.now() / 1000;
  if (token && timeAtual < token.exp) return false;
  return true;
};
export default function useHttpRequest(acessoPublico: boolean = true) {
  const auth = useAuth();
  if (acessoPublico) return axios;
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  if (auth.token && auth.refreshToken) {
    axiosInstance.interceptors.request.use(
      async function (config) {
        if (acessoPublico) {
          return config;
        }
        let token = auth.token;
        if (tokenExpired(auth.tokenData)) {
          token = (await auth.atualizarToken()) as string;
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  return axiosInstance;
}
