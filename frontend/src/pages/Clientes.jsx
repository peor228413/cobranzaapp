import { useEffect, useState } from "react";

export default function Clientes() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setState("loading");
        const res = await fetch("/api/clientes"); // proxy de Vite
        if (!res.ok) throw new Error("No se pudo obtener clientes");
        const json = await res.json();
        // si tu backend responde { success, data } ajusta aquí:
        const list = Array.isArray(json) ? json : json.data || [];
        setData(list);
        setState("success");
      } catch (err) {
        setError(err.message || "Error desconocido");
        setState("error");
      }
    }
    load();
  }, []);

  if (state === "loading") {
    return (
      <div className="grid place-items-center py-16">
        <div className="size-10 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600" />
        <p className="mt-3 text-slate-600">Cargando clientes…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Error</h2>
        <p className="text-slate-600">{error}</p>
        <button
          className="mt-4 px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
          onClick={() => location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (state === "success" && data.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Sin clientes aún</h2>
        <p className="text-slate-600 mt-1">
          Crea tu primer cliente para empezar.
        </p>
        <button className="mt-4 px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
          Nuevo cliente
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Clientes
        </h1>
        <button className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
          Nuevo cliente
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c._id || c.id} className="border-t">
                <td className="px-4 py-3">{c.nombre || c.name || "-"}</td>
                <td className="px-4 py-3">{c.email || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-md border hover:bg-slate-50">
                      Ver
                    </button>
                    <button className="px-3 py-1 rounded-md border hover:bg-slate-50">
                      Editar
                    </button>
                    <button className="px-3 py-1 rounded-md border text-red-600 hover:bg-red-50">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
