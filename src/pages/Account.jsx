import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Box, User, Clipboard, MapPin, Search } from 'lucide-react';

export default function Account() {
  const { orders, userProfile, setUserProfile } = useShop();
  const [activeTab, setActiveTab] = useState("orders");
  const [profileForm, setProfileForm] = useState(userProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Dynamic tracking ID search state
  const [trackId, setTrackId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [searchError, setSearchError] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(profileForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTrackIdSearch = (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchedOrder(null);

    const found = orders.find(o => o.id.toLowerCase() === trackId.trim().toLowerCase());
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchError("No order matching this ID could be found. Check format (e.g., ORD-9824-A).");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-10">
      {/* Editorial Title */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-stone-400 block">Personal Portal</span>
        <h2 className="text-3xl font-serif text-stone-900 font-semibold uppercase">Customer Space</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Navigation Tabs */}
        <aside className="bg-white p-5 rounded-2xl border border-stone-100 flex flex-col space-y-2">
          <button
            onClick={() => { setActiveTab("orders"); setSearchedOrder(null); setTrackId(""); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2 ${activeTab === "orders" ? "bg-stone-900 text-stone-50" : "text-stone-600 hover:bg-stone-50"}`}
          >
            <ShoppingBag className="w-4 h-4" /> Order History
          </button>
          <button
            onClick={() => { setActiveTab("tracking"); setSearchedOrder(null); setTrackId(""); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2 ${activeTab === "tracking" ? "bg-stone-900 text-stone-50" : "text-stone-600 hover:bg-stone-50"}`}
          >
            <Box className="w-4 h-4" /> Order Tracking
          </button>
          <button
            onClick={() => { setActiveTab("profile"); setSearchedOrder(null); setTrackId(""); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2 ${activeTab === "profile" ? "bg-stone-900 text-stone-50" : "text-stone-600 hover:bg-stone-50"}`}
          >
            <User className="w-4 h-4" /> Account Profile
          </button>
        </aside>

        {/* Dynamic Display Area */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm min-h-[400px]">
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-stone-800 border-b border-stone-100 pb-2.5">Your Orders</h3>

              {orders.length === 0 ? (
                <p className="text-stone-500 font-light text-xs">You have not placed any orders yet.</p>
              ) : (
                <div className="space-y-6">
                  {orders.map((o) => (
                    <div key={o.id} className="border border-stone-200/60 rounded-xl p-5 space-y-4">
                      <div className="flex flex-wrap justify-between items-center text-xs gap-2">
                        <div>
                          <p className="text-stone-400 font-light">Order Number</p>
                          <p className="font-bold font-mono text-amber-800 text-sm">{o.id}</p>
                        </div>
                        <div>
                          <p className="text-stone-400 font-light">Order Date</p>
                          <p className="font-semibold text-stone-800">{o.date}</p>
                        </div>
                        <div>
                          <p className="text-stone-400 font-light">Total Paid</p>
                          <p className="font-bold text-stone-950">${o.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full font-semibold text-[10px] uppercase tracking-wider">{o.status}</span>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="border-t border-stone-100 pt-3 space-y-2">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-light text-stone-600">
                            <span>{it.name} ({it.color}, {it.size}) <strong className="font-semibold text-stone-800">x{it.quantity}</strong></span>
                            <span>${it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "tracking" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-lg font-serif text-stone-800">Order Tracking Service</h3>
                <p className="text-xs text-stone-400 font-light">Enter your unique order tracking code to retrieve live delivery logs.</p>
              </div>

              <form onSubmit={handleTrackIdSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Order ID (e.g., ORD-9824-A)"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="flex-grow border border-stone-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-stone-400"
                />
                <button type="submit" className="bg-stone-900 text-white rounded-lg px-4 text-xs font-semibold uppercase flex items-center gap-1">
                  <Search className="w-3.5 h-3.5" /> Track
                </button>
              </form>

              {searchError && (
                <p className="text-xs text-rose-600 font-light">{searchError}</p>
              )}

              {/* Mock tracking status tracking logs */}
              {searchedOrder && (
                <div className="border border-stone-200/60 rounded-xl p-6 space-y-6 bg-stone-50/50 animate-slide-in">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase">Registered Tracking ID</span>
                      <h4 className="font-mono font-bold text-amber-800 text-sm">{searchedOrder.id}</h4>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-semibold uppercase">{searchedOrder.status}</span>
                  </div>

                  {/* Shipment process flow chart */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5">✓</div>
                      <div>
                        <p className="text-xs font-semibold text-stone-800">Order Placed &amp; Bio-packaged</p>
                        <p className="text-[10px] text-stone-400">{searchedOrder.date} — Warehouse Gothenburg</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 ${searchedOrder.status === 'Delivered' ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'}`}>
                        {searchedOrder.status === 'Delivered' ? '✓' : '•'}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-800">In Transit — European Logistics Hub</p>
                        <p className="text-[10px] text-stone-400">Departed local sorting dispatch facility.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 ${searchedOrder.status === 'Delivered' ? 'bg-emerald-600' : 'bg-stone-200'}`}>
                        {searchedOrder.status === 'Delivered' ? '✓' : ''}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-stone-800">Delivered</p>
                        <p className="text-[10px] text-stone-400">Signed and delivered to address: {searchedOrder.shippingAddress.address}.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-lg font-serif text-stone-800">Account Profile</h3>
                <p className="text-xs text-stone-400 font-light">Keep your default checkout address, email details, and household delivery profiles updated.</p>
              </div>

              {savedSuccess && (
                <p className="text-xs text-emerald-600 font-medium">Your profile details saved successfully!</p>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Default Contact Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Phone Connection</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 block">Delivery Street Address</label>
                  <input
                    type="text"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    required
                    className="w-full border border-stone-200 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-stone-900 text-white rounded-xl text-xs tracking-widest uppercase px-6 py-3 hover:bg-stone-950 transition font-semibold"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
