export default function Dashboard() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Dashboard
      </h1>
      <p className="text-slate-600">Resumen general de tu app.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "clientes", t: "Clientes", v: 0 },
          { k: "cuentas", t: "Cuentas", v: 0 },
          { k: "avales", t: "Avales", v: 0 },
          { k: "productos", t: "Productos", v: 0 },
        ].map((card) => (
          <div key={card.k} className="rounded-xl border bg-white p-4">
            <div className="text-sm text-slate-500">{card.t}</div>
            <div className="mt-1 text-2xl font-semibold">{card.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
