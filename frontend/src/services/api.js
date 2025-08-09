// src/services/api.js
const BASE = "http://localhost:3000"; // usamos el proxy de Vite: /api -> http://localhost:3000

function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    // token inválido/expirado
    localStorage.removeItem("token");
    throw new Error("No autorizado");
  }
  return res;
}

export async function login({ email, password }) {
  const res = await fetch("/api/clientes/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al iniciar sesión");
  }
  // tu backend devuelve un token (según tu usecase)
  const data = await res.json();
  // si devuelves solo string, ajusta:
  const token = data?.token || data;
  return token;
}
