import { useContext } from "react";
import { AuthContextProps } from "../types";
import AuthContext from "../context/AuthContext1";
import { Navigate } from "react-router-dom";

const withSuperAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const authContext = useContext<AuthContextProps | undefined>(AuthContext);

    if (!authContext || !authContext.user || !authContext.authTokens) {
      // || !authContext.checkTokenExpiration(authContext.token)  <- add this when you have refresh token method in authcontext
      return <Navigate to="/adminsignin" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withSuperAdminAuth;
