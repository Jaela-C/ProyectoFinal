import withAuthRedirect from "./withAuthRedirect";
import Routes from "../constants/routes";

export default function withAuth(WrappedComponent, location = Routes.HOME) {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  });
}