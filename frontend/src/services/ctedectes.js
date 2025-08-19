import { apiFetch } from "./api";

export async function getCuentas() {
  const res = await apiFetch("/api/ctedectes");
  if (!res.ok) throw new Error("No se pudo obtener cuentas");
  const json = await res.json();
  return Array.isArray(json) ? json : json.data || [];
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
