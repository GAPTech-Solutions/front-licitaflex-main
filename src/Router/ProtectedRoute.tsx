import { useAuth } from "@/Context/AuthContext";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props: PropsWithChildren) {
  const { tokenData } = useAuth();

  if (!tokenData) {
    return <Navigate to="/login" />;
  }
  return <>{props.children}</>;
}
