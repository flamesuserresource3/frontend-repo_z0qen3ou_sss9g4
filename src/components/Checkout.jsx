import { CreditCard, Wallet } from "lucide-react";
import { useState } from "react";

const COUPONS = {
  SAVE10: { type: "percent", value: 10, label: "Save 10% on your order" },
  FLAT50: { type: "flat", value: 50, label: "Flat ₹50 off" },
};

export default function Checkout({ subtotal, onPlaceOrder }) {
  const [payment, setPayment] = useState("cod");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 29;

  const discount = (() => {
    if (!applied) return 0;
    if (applied.type === "percent") return Math.floor((subtotal * applied.value) / 100);
    if (applied.type === "flat") return Math.min(applied.value, subtotal);
    return 0;
  })();

  const total = Math.max(subtotal + delivery - discount, 0);

  function applyCoupon() {
    const key = code.trim().toUpperCase();
    if (COUPONS[key]) {
      setApplied({ code: key, ...COUPONS[key] });
    } else {
      setApplied(null);
      alert("Invalid coupon code. Try SAVE10 or FLAT50");
    }
  }

  return (
    <section className="w-full">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Checkout</h2>
          <p className="text-sm text-gray-500">Choose payment and apply offers</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-2 text-sm font-medium">Discounts & Coupons</p>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={applyCoupon}
              className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Apply
            </button>
          </div>
          {applied ? (
            <p className="mt-2 text-xs text-emerald-600">
              Applied {applied.code} – {applied.label}
            </p>
          ) : (
            <p className="mt-2 text-xs text-gray-500">Offers section ready — more deals coming soon.</p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-4">
          <p className="mb-2 text-sm font-medium">Payment Method</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <label className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
              payment === "cod" ? "border-rose-500 ring-2 ring-rose-200" : "hover:border-gray-300"
            }`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              <Wallet className="h-4 w-4" /> Cash on Delivery
            </label>
            <label className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
              payment === "card" ? "border-rose-500 ring-2 ring-rose-200" : "hover:border-gray-300"
            }`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
              <CreditCard className="h-4 w-4" /> Card
            </label>
            <label className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
              payment === "upi" ? "border-rose-500 ring-2 ring-rose-200" : "hover:border-gray-300"
            }`}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={payment === "upi"}
                onChange={() => setPayment("upi")}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/UPI-Logo-vector.svg/320px-UPI-Logo-vector.svg.png"
                alt="UPI"
                className="h-4"
              />
              UPI
            </label>
          </div>
        </div>

        <div className="space-y-2 rounded-xl border bg-white p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Delivery</span>
            <span className="font-medium">{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
          <div className="flex items-center justify-between text-emerald-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="border-t pt-2"></div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            disabled={subtotal === 0}
            onClick={() => onPlaceOrder({ payment, subtotal, delivery, discount, total, coupon: applied?.code || null })}
            className="mt-3 w-full rounded-lg bg-emerald-600 px-3 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Place Order
          </button>
          <p className="mt-1 text-xs text-gray-500">No online payment collected here — this is a demo checkout flow.</p>
        </div>
      </div>
    </section>
  );
}
