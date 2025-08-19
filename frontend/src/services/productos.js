import { apiFetch } from "./api";

export async function getProductos() {
  const res = await apiFetch("/api/productoctes");
  if (!res.ok) throw new Error("No se pudo obtener productos");
  // Tu backend puede responder arreglo directo o { data: [...] }
  const json = await res.json();
  return Array.isArray(json) ? json : json.data || [];
}

// Dejar preparados (usaremos cuando definamos los campos)
export async function createProducto(data) {
  const res = await apiFetch("/api/productoctes", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al crear producto");
  }
  return res.json();
}

export async function updateProducto(id, data) {
  const res = await apiFetch(`/api/productoctes/${id}`, {
    method: "PUT", // o PATCH según tu router
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al actualizar producto");
  }
  return res.json();
}

export async function deleteProducto(id) {
  const res = await apiFetch(`/api/productoctes/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Error al eliminar producto");
  }
  return res.json();
}
