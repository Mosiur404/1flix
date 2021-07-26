import { createContext, useReducer } from "react";
import { parseJwt } from "../lib/util/decoders";

const initialState = {
  user: null,
};

const auth = {
  user: null,
  login: (payload) => {},
  logout: () => {},
};

export const AuthContext = createContext(auth);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return helpSetupToken(state, action.payload.access_token);
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: null };
    case "REGISTER":
      return helpSetupToken(state, action.payload.access_token);
    default:
      return state;
  }
};

function helpSetupToken(state, token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    const { username, isAdmin } = parseJwt(token);
    return { ...state, user: { username, isAdmin } };
  }
}

export const AuthProvider = ({ children }) => {
  if (typeof window !== "undefined" && localStorage.getItem("token")) {
    const decodedToken = parseJwt(localStorage.getItem("token"));
    if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem("token");
    else
      initialState.user = {
        username: decodedToken.username,
        isAdmin: decodedToken.isAdmin,
      };
  }
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = (userData) => {
    dispatch({ type: "REGISTER", payload: userData });
  };
  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const contextValue = { user: state.user, login, logout, register };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
