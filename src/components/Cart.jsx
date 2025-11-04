import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart({ items, onInc, onDec, onRemove, subtotal, onClear }) {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Your Cart</h2>
          <p className="text-sm text-gray-500">Review your selections</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            Clear all
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-center text-sm text-gray-500">
          Your cart is empty. Start adding delicious items!
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border bg-white p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">₹{item.price} each</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onDec(item.id)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                  <button
                    onClick={() => onInc(item.id)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-rose-600"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <p className="mt-auto font-semibold">₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border bg-gray-50 p-4">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-base font-semibold">₹{subtotal}</span>
          </div>
        </div>
      )}
    </section>
  );
}
