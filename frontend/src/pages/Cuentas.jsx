import { useEffect, useState } from "react";
import { getCuentas } from "../services/ctedectes";

// helper para elegir el primer campo disponible
function pick(val, keys, fallback = "-") {
  for (const k of keys) {
    if (val?.[k] !== undefined && val?.[k] !== null && val?.[k] !== "")
      return val[k];
  }
  return fallback;
}

export default function Cuentas() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  async function load() {
    try {
      setState("loading");
      const list = await getCuentas();
      setItems(list);
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
        <p className="mt-3 text-slate-600">Cargando cuentas…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Error</h2>
        <p className="text-slate-600">{error}</p>
        <button
          onClick={load}
          className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cuentas</h1>
        {/* Botón para “Nueva cuenta” lo activamos cuando confirmemos el schema */}
        <button
          className="rounded-lg border px-4 py-2 hover:bg-slate-50"
          disabled
        >
          Nueva cuenta (pronto)
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">Sin cuentas</h2>
          <p className="text-slate-600 mt-1">
            Cuando tengamos el esquema exacto, habilitamos creación.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Número / Alias</th>
                <th className="px-4 py-3 text-left">Saldo / Monto</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => {
                const id = c._id || c.id;
                const numero = pick(c, [
                  "numeroCuenta",
                  "cta",
                  "alias",
                  "nombre",
                ]);
                const saldo = pick(c, ["saldo", "monto", "importe", "valor"]);
                // populate("clientes"): puede llegar objeto; si fuera string, lo mostramos igual
                const cli =
                  (c.clientes &&
                    (pick(c.clientes, ["nombre", "name", "email"]) ||
                      c.clientes._id)) ||
                  (typeof c.clientes === "string" ? c.clientes : "-");

                return (
                  <tr key={id} className="border-t">
                    <td className="px-4 py-3">{numero}</td>
                    <td className="px-4 py-3">{saldo}</td>
                    <td className="px-4 py-3">{cli}</td>
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
                          disabled
                          className="px-3 py-1 rounded-md border opacity-60"
                        >
                          Editar
                        </button>
                        <button
                          disabled
                          className="px-3 py-1 rounded-md border text-red-600 opacity-60"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
