import { useAuth } from "../context/AuthContext";

export default function Topbar({ onToggleSidebar }) {
  const { logout } = useAuth();
  return (
    <header className="h-14 sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="h-full px-4 flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden inline-flex items-center justify-center rounded-lg border px-2.5 py-1.5 hover:bg-slate-50"
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="opacity-80"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-sky-600"></div>
          <span className="font-semibold tracking-tight">CobranzaApp</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={logout}
            className="text-sm rounded-lg border px-3 py-1.5 hover:bg-slate-50"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
