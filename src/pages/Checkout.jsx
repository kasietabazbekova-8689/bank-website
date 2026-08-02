import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Tag, CreditCard, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cart,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    placeOrder
  } = useShop();

  // Form Details
  const [shippingAddress, setShippingAddress] = useState({
    name: "Marie Sterling",
    email: "marie@sterlingkids.com",
    address: "12 Rue de la Paix",
    city: "Paris",
    zip: "75002",
    country: "France"
  });

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoInput("");
    } else {
      setPromoError("This promo code is invalid or expired.");
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const confirmedOrder = placeOrder(shippingAddress);
    setOrderConfirmed(confirmedOrder);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-stone-900 font-semibold uppercase">Your Order is Placed!</h2>
          <p className="text-xs text-stone-500 font-light max-w-md mx-auto">
            Thank you for choosing Sommeil organic sleepwear. Your order has been registered, and a tracking confirmation was dispatched to your email address.
          </p>
        </div>

        <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-stone-800">Order ID:</span>
            <span className="font-bold font-mono text-amber-800">{orderConfirmed.id}</span>
          </div>
          <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-2.5">
            <span className="font-semibold text-stone-800">Status:</span>
            <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-medium text-[10px]">{orderConfirmed.status}</span>
          </div>

          <div className="space-y-1 text-[11px] text-stone-500 font-light">
            <p className="font-semibold text-stone-800">Shipping To:</p>
            <p>{orderConfirmed.shippingAddress.name}</p>
            <p>{orderConfirmed.shippingAddress.address}, {orderConfirmed.shippingAddress.city}</p>
            <p>{orderConfirmed.shippingAddress.country}</p>
          </div>

          <div className="border-t border-stone-100 pt-3 flex justify-between text-xs font-semibold text-stone-800">
            <span>Total Amount Paid:</span>
            <span>${orderConfirmed.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="border border-stone-800 text-stone-800 text-xs tracking-widest px-6 py-3 rounded-full uppercase hover:bg-stone-800 hover:text-white transition font-semibold"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/account')}
            className="bg-stone-900 text-white text-xs tracking-widest px-6 py-3 rounded-full uppercase hover:bg-stone-950 transition font-semibold"
          >
            Track Order Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-stone-400">Secure Process</span>
        <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-semibold uppercase">Luxury Checkout</h2>
      </div>

      {cart.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-stone-100 space-y-4 max-w-md mx-auto">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-stone-700 font-serif text-lg">Your Cart is Currently Empty</h3>
          <p className="text-xs text-stone-400">Add some luxury pajamas before entering the secure checkout desk.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-stone-800 text-white rounded-full text-xs tracking-widest uppercase px-6 py-2.5"
          >
            Browse Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Shipping Address Form (LHS) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm space-y-6">
            <h3 className="text-lg font-serif text-stone-800 border-b border-stone-100 pb-2.5">Shipping Details</h3>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Full Name</label>
                <input
                  type="text"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  required
                  className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Email Address</label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  required
                  className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Street Address</label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  required
                  className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={shippingAddress.zip}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Country</label>
                  <input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>

              {/* Secure Payment section */}
              <div className="pt-4 space-y-3.5">
                <h4 className="text-sm font-serif font-semibold text-stone-800">Payment Information</h4>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3 text-xs text-stone-700">
                    <CreditCard className="w-5 h-5 text-amber-800" />
                    <span>Mock Secure Gateway (Credit/Debit Card)</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-stone-400">Payment is securely processed via 256-bit SSL encrypted protocols. No actual payment will be deducted.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-stone-100 text-xs font-semibold tracking-widest uppercase py-4 rounded-xl hover:bg-stone-950 transition"
              >
                Place Secure Order (${getTotal().toFixed(2)})
              </button>
            </form>
          </div>

          {/* Checkout Bag Summary (RHS) */}
          <div className="lg:col-span-5 bg-stone-100/50 p-6 rounded-2xl border border-stone-200/50 space-y-6">
            <h3 className="text-lg font-serif text-stone-800 border-b border-stone-200/50 pb-2.5">Your Bag</h3>

            <div className="space-y-4 max-h-60 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-16 object-cover rounded bg-stone-200" />
                  <div className="flex-grow text-xs">
                    <h4 className="font-serif font-semibold text-stone-800">{item.product.name}</h4>
                    <p className="text-stone-400 capitalize">{item.color} • {item.size}</p>
                    <p className="text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-stone-800">${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Discount / Promo input form */}
            <div className="border-t border-b border-stone-200/50 py-4">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. WELCOME10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-grow border border-stone-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-stone-400 bg-white"
                />
                <button
                  type="submit"
                  className="bg-stone-800 text-white rounded-lg px-4 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900"
                >
                  Apply
                </button>
              </form>
              {promoError && (
                <p className="text-[10px] text-rose-600 mt-1.5">{promoError}</p>
              )}
              {appliedPromo && (
                <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 px-3 py-2 rounded-lg text-xs mt-3">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5" /> Code: {appliedPromo} Applied
                  </span>
                  <button onClick={removePromoCode} className="text-rose-600 hover:underline">Remove</button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs font-light text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-800">${getSubtotal().toFixed(2)}</span>
              </div>
              {getDiscountAmount() > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span>-${getDiscountAmount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span>{getShippingCost() === 0 ? "FREE" : `$${getShippingCost().toFixed(2)}`}</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-semibold text-stone-900">
                <span>Total Amount:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
