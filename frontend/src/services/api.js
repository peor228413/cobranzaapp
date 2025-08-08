export async function getClientes() {
  const response = await fetch("/api/clientes");

  if (!response.ok) {
    throw new Error("Error al obtener clientes");
  }

  return response.json();
}
