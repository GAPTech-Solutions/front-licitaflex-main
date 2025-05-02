import { Token } from "@/data/types/Token";

export default function JWTDecode(token: string | null): Token | undefined {
  if (!token) return undefined;
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const tokenObjeto = JSON.parse(jsonPayload);
  if (tokenObjeto) return tokenObjeto as Token;
  return undefined;
}
