import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { extractArray } from "../utils/extract";

export default function Clientes() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  async function load() {
    try {
      setState("loading");
      const res = await apiFetch("/api/clientes");
      if (!res.ok) throw new Error("No se pudo obtener clientes");
      const json = await res.json();

      // ⬇️ Ahora sí: leemos data.cliente (y con fallback si cambia el formato)
      const list = extractArray(json, ["data", "cliente"]);
      setData(list);
      setState("success");
    } catch (e) {
      setError(e.message || "Error desconocido");
      setState("error");
    }
  }

  useEffect(() => {
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
          onClick={load}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <button
          className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
          disabled
        >
          Nuevo cliente (pronto)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">Sin clientes aún</h2>
          <p className="text-slate-600 mt-1">
            Crea tu primer cliente para empezar.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Teléfono</th>
                <th className="px-4 py-3 text-left">CURP</th>
                <th className="px-4 py-3 text-left">INE</th>
                <th className="px-4 py-3 text-left">Creado</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr key={c._id || c.id} className="border-t">
                  <td className="px-4 py-3">{c.nombre || "-"}</td>
                  <td className="px-4 py-3">{c.email || "-"}</td>
                  <td className="px-4 py-3">{c.telefono || "-"}</td>
                  <td className="px-4 py-3">{c.curp || "-"}</td>
                  <td className="px-4 py-3">{c.ineCveElector || "-"}</td>
                  <td className="px-4 py-3">
                    {c.createAt
                      ? new Date(c.createAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <details>
                        <summary className="cursor-pointer px-3 py-1 rounded-md border hover:bg-slate-50">
                          Ver JSON
                        </summary>
                        <pre className="m-2 max-w-xl overflow-auto rounded-lg bg-slate-50 p-2 text-[12px]">
                          {JSON.stringify(c, null, 2)}
                        </pre>
                      </details>
                      <button
                        className="px-3 py-1 rounded-md border hover:bg-slate-50"
                        disabled
                      >
                        Editar
                      </button>
                      <button
                        className="px-3 py-1 rounded-md border text-red-600 hover:bg-red-50"
                        disabled
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
