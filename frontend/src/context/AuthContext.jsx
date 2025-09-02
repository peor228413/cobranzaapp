import { createContext, useContext, useMemo, useState } from "react";
import {
  login as loginRequest,
  logout as logoutRequest,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const isAuth = !!token;

  async function login(email, password) {
    const t = await loginRequest({ email, password });
    localStorage.setItem("token", t);
    setToken(t);
    return t;
  }

  function logout() {
    logoutRequest();
    setToken(null);
  }

  const value = useMemo(() => ({ token, isAuth, login, logout }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
