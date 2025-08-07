import { useEffect, useState } from "react";
import { getClientes } from "../services/api";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClientes()
      .then(setClientes)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
