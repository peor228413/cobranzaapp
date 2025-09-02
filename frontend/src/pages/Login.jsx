import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email y contraseña son obligatorios");
      return;
    }

    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password); // ← devuelve token
      navigate("/clientes", { replace: true }); // ← entra a la zona protegida
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
          {submitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
