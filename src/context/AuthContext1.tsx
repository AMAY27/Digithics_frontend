import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  AuthContextProps,
  AuthProviderProps,
  User,
  UserCredentials,
  UserRegistrationCredentials,
} from "../types";
import {
  getUserDetails,
  loginUser as loginUserAPI,
  registerUser,
} from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialUserDetails: User = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

type userToken = {
  email: string;
  exp: string;
  iat: string;
  role: string;
  sub: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState<string | null>(() =>
    localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null
  );
  const [user, setUser] = useState<User>(initialUserDetails);

  const loginUser = async (user: UserCredentials): Promise<boolean> => {
    try {
      const response = await loginUserAPI(user);
      const token = response.data.accessToken;
      const userDetails: userToken = jwtDecode(token)

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userDetails.sub || "");
      localStorage.setItem("userRole", userDetails.role || "");

      setAuthTokens(token);

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          `User not authenticated. Please check email and password and try again`
        );
      } else {
        toast.error("An unknown error occurred.");
      }
      return false;
    }
  };

  const signUpUser = async (
    user: UserRegistrationCredentials
  ): Promise<boolean> => {
    try {
      await registerUser(user);

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(initialUserDetails);
    const role = localStorage.getItem("userRole") || "Client";
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    toast.success("You have been signed out");

    if (role === "Expert") {
      navigate("/expertsignin");
    } else if (role === "SuperAdmin"){
      navigate("/adminsignin");
    } else {
      navigate("/signin");
    }
  };

  const fetchUser = async () => {
    try {
      const fetchedUser = await getUserDetails();
      setUser(fetchedUser);
    } catch (error) {
      console.error("error >>>> ", error);
    }
  };

  const contextData: AuthContextProps = {
    user,
    authTokens,
    setAuthTokens,
    setUser,
    loginUser,
    signUpUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) fetchUser();
  }, [authTokens]);  

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
