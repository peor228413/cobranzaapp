import { useEffect, useState } from "react";
import {
  listClientes,
  updateCliente,
  deleteCliente,
} from "../services/clientes";
//import { apiFetch } from "../services/api"; // lo usamos para debug si hace falta

export default function Clientes() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  // modales
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // estados de acción
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function load() {
    try {
      setState("loading");
      const list = await listClientes();
      setData(list);
      setState("success");
    } catch (e) {
      console.error("[Clientes] error:", e);
      setError(e.message || "Error desconocido");
      setState("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openView(item) {
    setViewItem(item);
  }
  function openEdit(item) {
    setEditItem(item);
  }
  function openDelete(item) {
    setDeleteItem(item);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!editItem?._id && !editItem?.id) return;
    const id = editItem._id || editItem.id;

    const form = new FormData(e.currentTarget);
    const payload = {
      // el backend espera id en body
      id,
      nombre: form.get("nombre") || "",
      email: form.get("email") || "",
      telefono: form.get("telefono") || "",
      direccion: form.get("direccion") || "",
      curp: form.get("curp") || "",
      ineCveElector: form.get("ineCveElector") || "",
      nomNegocio: form.get("nomNegocio") || "",
    };

    setSaving(true);
    try {
      await updateCliente(id, payload);
      setEditItem(null);
      await load();
    } catch (e) {
      alert(e.message || "Error al actualizar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteItem?._id && !deleteItem?.id) return;
    const id = deleteItem._id || deleteItem.id;
    setRemoving(true);
    try {
      await deleteCliente(id);
      setDeleteItem(null);
      await load();
    } catch (e) {
      alert(e.message || "Error al eliminar");
    } finally {
      setRemoving(false);
    }
  }

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
        <div className="mt-4 flex gap-2">
          <button
            className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
            onClick={load}
          >
            Reintentar
          </button>
        </div>
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
        <button
          className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
          disabled
        >
          Nuevo cliente (pronto)
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Negocio</th>
              <th className="px-4 py-3 text-left">Creado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map((c) => (
              <tr key={c._id || c.id} className="border-t">
                <td className="px-4 py-3">{c.nombre || "-"}</td>
                <td className="px-4 py-3">{c.email || "-"}</td>
                <td className="px-4 py-3">{c.telefono || "-"}</td>
                <td className="px-4 py-3">{c.nomNegocio || "-"}</td>
                <td className="px-4 py-3">
                  {c.createAt ? new Date(c.createAt).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1 rounded-md border hover:bg-slate-50"
                      onClick={() => openView(c)}
                    >
                      Ver
                    </button>
                    <button
                      className="px-3 py-1 rounded-md border hover:bg-slate-50"
                      onClick={() => openEdit(c)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded-md border text-red-600 hover:bg-red-50"
                      onClick={() => openDelete(c)}
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

      {/* Modal VER */}
      {viewItem && (
        <Modal onClose={() => setViewItem(null)} title="Detalle de cliente">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Field label="Nombre" value={viewItem.nombre} />
            <Field label="Email" value={viewItem.email} />
            <Field label="Teléfono" value={viewItem.telefono} />
            <Field label="Negocio" value={viewItem.nomNegocio} />
            <Field label="Dirección" value={viewItem.direccion} colSpan />
            <Field label="CURP" value={viewItem.curp} />
            <Field label="INE" value={viewItem.ineCveElector} />
            <Field
              label="Creado"
              value={
                viewItem.createAt
                  ? new Date(viewItem.createAt).toLocaleString()
                  : "-"
              }
            />
          </div>
          <div className="mt-5 text-right">
            <button
              className="rounded-lg border px-4 py-2 hover:bg-slate-50"
              onClick={() => setViewItem(null)}
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}

      {/* Modal EDITAR */}
      {editItem && (
        <Modal onClose={() => setEditItem(null)} title="Editar cliente">
          <form onSubmit={handleUpdate} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                name="nombre"
                label="Nombre"
                defaultValue={editItem.nombre || ""}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                defaultValue={editItem.email || ""}
              />
              <Input
                name="telefono"
                label="Teléfono"
                defaultValue={editItem.telefono || ""}
              />
              <Input
                name="nomNegocio"
                label="Negocio"
                defaultValue={editItem.nomNegocio || ""}
              />
              <Input
                name="curp"
                label="CURP"
                defaultValue={editItem.curp || ""}
              />
              <Input
                name="ineCveElector"
                label="INE"
                defaultValue={editItem.ineCveElector || ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Dirección
              </label>
              <textarea
                name="direccion"
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                defaultValue={editItem.direccion || ""}
                rows={3}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2 hover:bg-slate-50"
                onClick={() => setEditItem(null)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
              >
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal ELIMINAR */}
      {deleteItem && (
        <Modal onClose={() => setDeleteItem(null)} title="Eliminar cliente">
          <p className="text-slate-700">
            ¿Seguro que deseas eliminar a{" "}
            <b>{deleteItem.nombre || deleteItem.email}</b>? Esta acción no se
            puede deshacer.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              className="rounded-lg border px-4 py-2 hover:bg-slate-50"
              onClick={() => setDeleteItem(null)}
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={removing}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
            >
              {removing ? "Eliminando…" : "Eliminar"}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

/** ---------- UI helpers ---------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-slate-100"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, value, colSpan }) {
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="mt-1 text-slate-800">{value ?? "-"}</div>
    </div>
  );
}

function Input({ label, name, type = "text", defaultValue = "" }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
      />
    </div>
  );
}
