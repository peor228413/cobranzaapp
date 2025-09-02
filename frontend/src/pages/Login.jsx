// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Email y contraseña son obligatorios");
      return;
    }
    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      navigate("/clientes", { replace: true });
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-slate-600 mt-1">
          Accede con tus credenciales.
        </p>

        <label className="block mt-4 text-sm font-medium">Email</label>
        <input
          className="w-full mt-1 rounded-lg border px-3 py-2"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          autoComplete="email"
          required
        />

        <label className="block mt-3 text-sm font-medium">Contraseña</label>
        <input
          className="w-full mt-1 rounded-lg border px-3 py-2"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          autoComplete="current-password"
          required
        />

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full rounded-lg bg-sky-600 text-white py-2 hover:bg-sky-700 disabled:opacity-60"
        >
          {submitting ? "Ingresando..." : "Iniciar sesión"}
        </button>

        {/* Botón Registrarse */}
        <button
          type="button"
          onClick={() => setShowSignup(true)}
          className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-slate-700 hover:bg-slate-50"
        >
          Registrarse
        </button>
      </form>

      {/* Modal de Registro */}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={async ({ email, password }) => {
            // Login automático tras registrarse
            await login(email.trim(), password);
            setShowSignup(false);
            navigate("/clientes", { replace: true });
          }}
        />
      )}
    </div>
  );
}

function SignupModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    curp: "",
    ineCveElector: "",
    nomNegocio: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.nombre) {
      setError("Nombre, email y contraseña son obligatorios");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/clientes/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const txt = await res.text();
      if (!res.ok) {
        let msg = "Error al registrarse";
        try {
          msg = JSON.parse(txt)?.message || msg;
        } catch {
          if (txt) msg = txt;
        }
        throw new Error(msg);
      }
      // Registro ok → login automático
      await onSuccess({ email: form.email, password: form.password });
    } catch (err) {
      setError(err.message || "Error al registrarse");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Crear cuenta</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Nombre*</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.nombre}
              onChange={(e) =>
                setForm((f) => ({ ...f, nombre: e.target.value }))
              }
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Email*</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">
              Contraseña* (mín. 8)
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              required
            />
          </div>

          {/* Campos opcionales */}
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.telefono}
              onChange={(e) =>
                setForm((f) => ({ ...f, telefono: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CURP</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.curp}
              onChange={(e) => setForm((f) => ({ ...f, curp: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              INE Clave Elector
            </label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.ineCveElector}
              onChange={(e) =>
                setForm((f) => ({ ...f, ineCveElector: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Negocio</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.nomNegocio}
              onChange={(e) =>
                setForm((f) => ({ ...f, nomNegocio: e.target.value }))
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Dirección</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={form.direccion}
              onChange={(e) =>
                setForm((f) => ({ ...f, direccion: e.target.value }))
              }
            />
          </div>

          {error && (
            <div className="md:col-span-2 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <div className="md:col-span-2 mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {submitting ? "Creando…" : "Crear cuenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
