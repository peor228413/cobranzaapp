import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginRequest } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const isAuth = Boolean(token);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  async function login(credentials) {
    setLoading(true);
    try {
      const t = await loginRequest(credentials);
      setToken(t);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.message };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
  }

  const value = useMemo(
    () => ({ token, isAuth, loading, login, logout }),
    [token, isAuth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
