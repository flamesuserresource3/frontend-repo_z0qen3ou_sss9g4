import { useMemo, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "Margherita Pizza",
    price: 249,
    desc: "Classic cheese pizza with basil and our signature sauce.",
    image:
      "https://images.unsplash.com/photo-1548365328-9f547fb09530?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Paneer Tikka",
    price: 199,
    desc: "Smoky paneer cubes marinated in aromatic spices.",
    image:
      "https://images.unsplash.com/photo-1625944529266-1222d3ef8e0a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Veg Biryani",
    price: 229,
    desc: "Fragrant basmati rice cooked with veggies and herbs.",
    image:
      "https://images.unsplash.com/photo-1633945274405-2f4252803b6d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Masala Dosa",
    price: 159,
    desc: "Crispy dosa stuffed with spiced potato filling.",
    image:
      "https://images.unsplash.com/photo-1671530673241-6df69ffb5da7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Chocolate Brownie",
    price: 129,
    desc: "Gooey, rich brownie served warm.",
    image:
      "https://images.unsplash.com/photo-1614707267537-1545b61a8777?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Cold Coffee",
    price: 99,
    desc: "Chilled coffee topped with a creamy froth.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function App() {
  const [products] = useState(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState([]);

  function addToCart(prod) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === prod.id);
      if (exists) {
        return prev.map((i) => (i.id === prod.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty: 1 }];
    });
  }

  function inc(id) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }
  function dec(id) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );
  }
  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }
  function clearCart() {
    setCart([]);
  }

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  function handlePlaceOrder(summary) {
    // For now, just show a friendly confirmation. Backend integration can be added later.
    alert(
      `Order placed!\nItems: ${count}\nPayment: ${summary.payment.toUpperCase()}\nTotal: ₹${summary.total}\n${summary.coupon ? `Coupon: ${summary.coupon}` : ""}`
    );
    clearCart();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-rose-50 text-gray-900">
      <Header cartCount={count} />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProductList products={products} onAdd={addToCart} />
        </div>
        <div className="space-y-6">
          <Cart
            items={cart}
            onInc={inc}
            onDec={dec}
            onRemove={removeItem}
            onClear={clearCart}
            subtotal={subtotal}
          />
          <Checkout subtotal={subtotal} onPlaceOrder={handlePlaceOrder} />
        </div>
      </main>
      <footer className="border-t bg-white/70 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RestoShop — Built for a delightful ordering experience.
      </footer>
    </div>
  );
}
