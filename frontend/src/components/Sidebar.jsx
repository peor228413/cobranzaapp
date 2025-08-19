import { NavLink } from "react-router-dom";

const links = [
  { key: "dashboard", label: "Dashboard", path: "/" },
  { key: "clientes", label: "Clientes", path: "/clientes" },
  { key: "cuentas", label: "Cuentas", path: "/cuentas" },
  { key: "productos", label: "Productos", path: "/productos" },
  { key: "avales", label: "Avales", path: "/avales" },
  // luego: cuentas, avales, productos…
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 md:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r transition-transform
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="h-14 border-b px-4 flex items-center font-semibold tracking-tight">
          Menú
        </div>
        <nav className="p-2 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.key}
              to={link.path}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm hover:bg-slate-50 ${
                  isActive
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-700"
                }`
              }
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-3 text-xs text-slate-500">
          <p>CobranzaApp • v0.1</p>
        </div>
      </aside>
    </>
  );
}
