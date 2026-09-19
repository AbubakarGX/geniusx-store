
import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type RouteGuardProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

function RouteGuard({
  children,
  adminOnly = false,
}: RouteGuardProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  if (
    adminOnly &&
    user.role !== "admin"
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default RouteGuard;
