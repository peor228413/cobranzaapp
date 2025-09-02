// Helper para llamadas con token.
// Usa `noLogoutOn401: true` cuando NO quieras que borre el token si el server responde 401.
export async function apiFetch(path, options = {}) {
  const { noLogoutOn401 = false, ...rest } = options;

  const headers = new Headers(rest.headers || {});
  const token = localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  // si es POST/PUT/PATCH y no mandaste Content-Type, lo establecemos
  if (!headers.has("Content-Type") && rest.method && rest.method !== "GET") {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(path, { ...rest, headers });

  if (res.status === 401) {
    if (noLogoutOn401) return res; // deja que el que llama decida
    localStorage.removeItem("token");
    throw new Error("No autorizado");
  }

  return res;
}

// ---- AUTH ----
// POST /api/clientes/login -> { success, message, data: { token } }
export async function login({ email, password }) {
  const res = await fetch("/api/clientes/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const raw = await res.text();

  if (!res.ok) {
    let msg = `Error de login (${res.status})`;
    try {
      msg = JSON.parse(raw)?.message || msg;
    } catch {
      if (raw) msg = raw;
    }
    throw new Error(msg);
  }

  let token;
  try {
    const j = JSON.parse(raw);
    token = j?.data?.token || j?.token || (typeof j === "string" ? j : null);
  } catch {
    token = raw; // si el backend devolviera un string plano
  }

  const isJwt = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(
    token || ""
  );
  if (!isJwt) throw new Error("Backend no devolvió un JWT válido");
  return token;
}

export function logout() {
  localStorage.removeItem("token");
}
