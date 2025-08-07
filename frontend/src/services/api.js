const BASE_URL = "http://localhost:3000"; // Cambia de puerto si usas otro

export async function getClientes() {
  const response = await fetch(`${BASE_URL}/clientes`);

  if (!response.ok) {
    throw new Error("Error al obtener clientes");
  }

  return response.json();
}
