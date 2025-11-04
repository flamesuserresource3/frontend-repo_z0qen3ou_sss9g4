import { ShoppingCart } from "lucide-react";

export default function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 text-white grid place-items-center font-bold">
            R
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">RestoShop</h1>
            <p className="text-xs text-gray-500">Delicious food, quick checkout</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-rose-600 px-1.5 text-xs font-medium text-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
