import { rotas } from "@/Router/rotas";
import {
  generatePath,
  RouteObject,
  useNavigate,
  useParams,
} from "react-router-dom";

export type NavigateLicita = (
  id: string,
  params?: Record<string, string>,
  state?: any
) => void;
export default function useNavigateLicitaFlex() {
  const navigateRoute = useNavigate();
  const paramsRoute = useParams();
  const getPath = (id: string, route: RouteObject): string | undefined => {
    if (route.id === id) return route.path ?? "";
    if (!route.children) return;
    for (const child of route.children) {
      const pathChild = getPath(id, child);
      if (pathChild !== undefined) return `${route.path}/${pathChild}`;
    }
  };
  const link = (id: string, params?: Record<string, string>) => {
    let path: undefined | string = undefined;
    for (let rota of rotas) {
      path = getPath(id, rota)?.replace("//", "/");
      if (path) break;
    }

    const pathComplete = generatePath(path ?? "/", {
      ...paramsRoute,
      ...params,
    });
    return pathComplete;
  };

  const navigate: NavigateLicita = (
    id: string,
    params?: Record<string, string>,
    state?: any
  ) => {
    navigateRoute(link(id, params), { state: state });
  };

  return { navigate, link };
}
