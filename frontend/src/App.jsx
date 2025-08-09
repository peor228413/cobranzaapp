import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          {/* puedes ir sumando: /ctedectes, /avales, /productos */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Quick links temporales si aún no bindearon el Sidebar */}
        <div className="mt-6 flex gap-3 text-sm text-sky-700">
          <Link className="underline" to="/">
            Dashboard
          </Link>
          <Link className="underline" to="/clientes">
            Clientes
          </Link>
        </div>
      </Layout>
    </BrowserRouter>
  );
}
