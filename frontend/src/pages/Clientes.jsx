import { useEffect, useState } from "react";
import { apiFetch } from "../services/api"; // asegúrate de que existe

export default function Clientes() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [debugOpen, setDebugOpen] = useState(false);
  const [debug, setDebug] = useState({
    status: 0,
    url: "",
    ctype: "",
    raw: "",
  });

  async function load() {
    try {
      setState("loading");

      const res = await apiFetch("/api/clientes"); // requiere token válido
      const status = res.status;
      const url = res.url;
      const ctype = res.headers.get("content-type") || "";
      const raw = await res.text();
      setDebug({ status, url, ctype, raw });

      if (!ctype.includes("application/json")) {
        throw new Error(`Respuesta no-JSON (status ${status}). Ver "Debug".`);
      }

      let json;
      try {
        json = JSON.parse(raw);
      } catch {
        throw new Error("Respuesta no es JSON válido. Ver 'Debug'.");
      }

      const list = Array.isArray(json?.data?.cliente)
        ? json.data.cliente
        : Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
        ? json
        : [];

      setData(list);
      setState("success");
      console.log("[Clientes] list length:", list.length);
    } catch (e) {
      console.error("[Clientes] error:", e);
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
      <div className="space-y-4">
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Error</h2>
          <p className="text-slate-600">{error}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
              onClick={load}
            >
              Reintentar
            </button>
            <button
              className="rounded-lg border px-4 py-2 hover:bg-slate-50"
              onClick={() => setDebugOpen((v) => !v)}
            >
              {debugOpen ? "Ocultar Debug" : "Ver Debug"}
            </button>
          </div>
        </div>

        {debugOpen && (
          <div className="rounded-xl border bg-white p-4">
            <h3 className="font-medium">Debug</h3>
            <div className="mt-2 grid gap-1 text-sm">
              <div>
                <b>Status:</b> {debug.status}
              </div>
              <div>
                <b>URL:</b> {debug.url}
              </div>
              <div>
                <b>Content-Type:</b> {debug.ctype || "(vacío)"}
              </div>
            </div>
            <pre className="mt-3 max-h-72 overflow-auto rounded bg-slate-50 p-2 text-xs">
              {debug.raw}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (state === "success" && (!Array.isArray(data) || data.length === 0)) {
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
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <div className="flex gap-2">
          <button
            className="rounded-lg border px-4 py-2 hover:bg-slate-50"
            onClick={() => setDebugOpen((v) => !v)}
          >
            {debugOpen ? "Ocultar Debug" : "Ver Debug"}
          </button>
          <button className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
            Nuevo cliente
          </button>
        </div>
      </div>

      {debugOpen && (
        <div className="rounded-xl border bg-white p-4">
          <h3 className="font-medium">Debug</h3>
          <div className="mt-2 grid gap-1 text-sm">
            <div>
              <b>Status:</b> {debug.status}
            </div>
            <div>
              <b>URL:</b> {debug.url}
            </div>
            <div>
              <b>Content-Type:</b> {debug.ctype || "(vacío)"}
            </div>
          </div>
          <pre className="mt-3 max-h-72 overflow-auto rounded bg-slate-50 p-2 text-xs">
            {debug.raw}
          </pre>
        </div>
      )}

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
            {(Array.isArray(data) ? data : []).map((c) => (
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
