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

export async function getCuentas() {
  const res = await apiFetch("/api/ctedectes/689537954c8b918ae5b9734c");
   const text = await res.text();
   let json;
   try {
     json = JSON.parse(text);
   } catch {
     throw new Error("Respuesta no es JSON");
   }
   return extractList(json);
}

export async function createCuenta(data) {
  const res = await apiFetch("/api/ctedectes", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al crear cuenta");
  }
  return res.json();
}

export async function updateCuenta(id, data) {
  const res = await apiFetch(`/api/ctedectes/${id}`, {
    method: "PUT", // o PATCH, según tu router
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al actualizar cuenta");
  }
  return res.json();
}

export async function deleteCuenta(id) {
  const res = await apiFetch(`/api/ctedectes/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al eliminar cuenta");
  }
  return res.json();
}
