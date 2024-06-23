import { AuthContext } from "../../contexts/authContext";
import NotFound from "../../pages/NotFound";

export default function PrivateRoute({
  role,
  nav,
  location,
  userRole,
  component: Component,
  ...rest
}) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated && role && !role.includes(user.role)) {
    return (
      <Route {...rest} render={(props) => <NotFound isErrorRole={true} />} />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <Component {...props} user={user} />
          </>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}