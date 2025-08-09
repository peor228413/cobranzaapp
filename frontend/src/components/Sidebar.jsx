const links = [
  { key: "clientes", label: "Clientes", path: "#" },
  { key: "cuentas", label: "Cuentas", path: "#" },
  { key: "avales", label: "Avales", path: "#" },
  { key: "productos", label: "Productos", path: "#" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay móvil */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 md:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Drawer / Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r transition-transform
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="h-14 border-b px-4 flex items-center font-semibold tracking-tight">
          Menú
        </div>
        <nav className="p-2">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.path}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto p-3 text-xs text-slate-500">
          <p>CobranzaApp • v0.1</p>
        </div>
      </aside>
    </>
  );
}
