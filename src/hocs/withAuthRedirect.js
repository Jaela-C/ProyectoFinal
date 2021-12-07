import { useAuth } from "../hocs/useAuth";
import { useRouter } from "next/router";
import Routes from "../constants/routes";

export default function withAuthRedirect({
  WrappedComponent,
  expectedAuth,
  location,
}) {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();
    if (user === null) {
      return <div>Cargando...</div>
    }
    const isAuthenticated = !!user;
    const shouldRedirect = expectedAuth !== isAuthenticated;
    if (shouldRedirect) {
      router.push(location || Routes.HOME);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
}