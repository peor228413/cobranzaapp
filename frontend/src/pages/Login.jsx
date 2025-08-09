import { useState } from "react";
//import { useAuth } from "../context/AuthContext";
//import { useNavigate } from "react-router-dom";

export default function Login() {
  //const { login, loading } = useAuth();
  //const navigate = useNavigate();
  //const [form, setForm] = useState({ email: "", password: "" });
  //const [error, setError] = useState("");

  //async function onSubmit(e) {
  //  e.preventDefault();
  //  setError("");
  //  if (!form.email || !form.password) {
  //    setError("Email y contraseña son obligatorios");
  //    return;
  //  }
  //  const { ok, message } = await login(form);
  //  if (ok) navigate("/", { replace: true });
  //  else setError(message || "Error al iniciar sesión");
  //}

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-slate-600">
          Accede con tu cuenta de cliente.
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none ring-slate-200 focus:ring-2"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none ring-slate-200 focus:ring-2"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              placeholder="********"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </div>
      </form>
    </div>
  );
}
