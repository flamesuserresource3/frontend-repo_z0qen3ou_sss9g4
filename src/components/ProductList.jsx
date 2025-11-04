export default function ProductList({ products, onAdd }) {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Menu</h2>
          <p className="text-sm text-gray-500">Handpicked dishes from our kitchen</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-tight">{p.name}</h3>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-600">
                  ₹{p.price}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{p.desc}</p>
              <button
                onClick={() => onAdd(p)}
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
