import { useAuth } from "@/Context/AuthContext";
import useQuery from "@/hooks/requests/useQuery";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";

export default function Logout() {
  const { logout } = useAuth();
  const { navigate } = useNavigateLicitaFlex();

  useQuery({
    fetchFn: () => logout(),
    options: {
      onSuccess() {
        navigate("login");
      },
    },
  });

  return <>Saindo</>;
}
