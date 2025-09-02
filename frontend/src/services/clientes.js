import { apiFetch } from "./api";

function extractList(json) {
  return Array.isArray(json?.data?.cliente)
    ? json.data.cliente
    : Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json)
    ? json
    : [];
}

export async function listClientes() {
  const res = await apiFetch("/api/clientes");
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Respuesta no es JSON");
  }
  return extractList(json);
}

// Backend: router.patch("/:id") usa request.body.id 🙃
// → Enviamos el id en la URL y también en el body.
export async function updateCliente(id, payload) {
  const res = await apiFetch(`/api/clientes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    let msg = `Error al actualizar (${res.status})`;
    try {
      const j = await res.json();
      msg = j?.message || msg;
    } catch {
      const t = await res.text();
      if (t) msg = t;
    }
    throw new Error(msg);
  }
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function deleteCliente(id) {
  const res = await apiFetch(`/api/clientes/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let msg = `Error al eliminar (${res.status})`;
    try {
      const j = await res.json();
      msg = j?.message || msg;
    } catch {
      const t = await res.text();
      if (t) msg = t;
    }
    throw new Error(msg);
  }
  try {
    return await res.json();
  } catch {
    return {};
  }
}
