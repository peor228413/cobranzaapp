import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="mx-auto max-w-[120rem]">
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr]">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
