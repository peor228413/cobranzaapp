import { apiFetch } from "./api";

export async function getAvales() {
  const res = await apiFetch("/api/avalctes");
  if (!res.ok) throw new Error("No se pudo obtener avales");
  const json = await res.json();
  return Array.isArray(json) ? json : json.data || [];
}

export async function createAval(data) {
  const res = await apiFetch("/api/avalctes", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al crear aval");
  }
  return res.json();
}

export async function updateAval(id, data) {
  const res = await apiFetch(`/api/avalctes/${id}`, {
    method: "PUT", // o PATCH si tu router lo usa
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al actualizar aval");
  }
  return res.json();
}

export async function deleteAval(id) {
  const res = await apiFetch(`/api/avalctes/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al eliminar aval");
  }
  return res.json();
}
