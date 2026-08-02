import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, Menu, X, Trash2, Check, User } from 'lucide-react';

export default function Header() {
  const { cart, wishlist, removeFromCart, updateCartQuantity, getSubtotal, toggleWishlist } = useShop();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Promo banner */}
      <div className="bg-stone-100 text-stone-700 text-xs py-2 px-4 text-center tracking-widest uppercase font-light">
        Free Worldwide Shipping over $100 • Use code <span className="font-semibold text-amber-800">WELCOME10</span> for 10% off
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 py-4 px-6 md:px-12 flex items-center justify-between">
        {/* Left: Mobile menu triggers & desktop nav */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-stone-700 hover:text-stone-900 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-light text-stone-600">
            <Link to="/" className="hover:text-stone-950 transition">Home</Link>
            <Link to="/shop" className="hover:text-stone-950 transition">Shop Pajamas</Link>
            <Link to="/about" className="hover:text-stone-950 transition">Our Story</Link>
            <Link to="/faq" className="hover:text-stone-950 transition">FAQ</Link>
            <Link to="/contact" className="hover:text-stone-950 transition">Contact</Link>
          </nav>
        </div>

        {/* Center: Brand name */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link to="/" className="block">
            <h1 className="text-xl md:text-2xl font-serif font-semibold tracking-[0.15em] text-stone-900 hover:opacity-80 transition uppercase">
              Sommeil
            </h1>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-stone-400 font-light block -mt-1 uppercase">
              Organic &amp; Silk
            </span>
          </Link>
        </div>

        {/* Right: Icon Buttons */}
        <div className="flex items-center space-x-4 md:space-x-5">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-stone-600 hover:text-stone-950 transition"
            aria-label="Search items"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          <Link to="/account" className="text-stone-600 hover:text-stone-950 transition" aria-label="Customer Profile">
            <User className="w-5 h-5 stroke-[1.5]" />
          </Link>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative text-stone-600 hover:text-stone-950 transition"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-200 text-rose-800 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-stone-600 hover:text-stone-950 transition"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-stone-800 text-stone-100 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartTotalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Slide-out mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex justify-start">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between shadow-2xl animate-slide-in">
            <div>
              <div className="flex justify-between items-center mb-10 border-b border-stone-100 pb-4">
                <span className="font-serif font-semibold tracking-wider text-stone-900 uppercase">Sommeil Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6 text-base tracking-widest font-light uppercase text-stone-800">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-stone-950">Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-stone-950">Shop Pajamas</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-stone-950">Our Story</Link>
                <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-stone-950">FAQ</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-stone-950">Contact</Link>
              </nav>
            </div>
            <div className="border-t border-stone-100 pt-6">
              <p className="text-xs text-stone-400 tracking-wider">SOMMEIL PREMIUM SLEEPWEAR</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif tracking-wide text-stone-800">Search Our Pajama Collection</h3>
              <button onClick={() => setIsSearchOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Search by material, size, color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow border border-stone-200 rounded-lg px-3 py-2 text-stone-800 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
                autoFocus
              />
              <button type="submit" className="bg-stone-800 text-white rounded-lg px-4 py-2 text-sm hover:bg-stone-950 transition uppercase tracking-wider font-light">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 flex flex-col justify-between shadow-2xl animate-slide-in">
            <div className="flex-grow flex flex-col min-h-0">
              <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                <h3 className="text-lg font-serif text-stone-800 tracking-wide flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  Your Shopping Cart ({cartTotalItems})
                </h3>
                <button onClick={() => setIsCartOpen(false)} aria-label="Close cart drawer">
                  <X className="w-5 h-5 text-stone-500 hover:text-stone-800" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 stroke-[1] text-stone-300" />
                  </div>
                  <div>
                    <p className="text-stone-600 font-serif">Your cart is empty</p>
                    <p className="text-xs text-stone-400 mt-1">Discover organic luxury sleepwear for peaceful nights.</p>
                  </div>
                  <button
                    onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                    className="border border-stone-800 text-stone-800 text-xs tracking-widest px-6 py-2.5 rounded-full hover:bg-stone-800 hover:text-white transition uppercase font-light"
                  >
                    Shop Collection
                  </button>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto py-4 space-y-4 min-h-0">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-2.5 bg-stone-50 rounded-xl relative border border-transparent hover:border-stone-100 transition">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-lg bg-stone-200"
                      />
                      <div className="flex-grow text-xs space-y-1">
                        <h4 className="font-serif text-stone-800 text-sm font-medium">{item.product.name}</h4>
                        <p className="text-stone-400 capitalize">Color: {item.color} • Size: {item.size}</p>
                        <div className="flex items-center space-x-2 mt-1.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-5 h-5 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-5 h-5 bg-white border border-stone-200 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between text-xs">
                        <span className="font-semibold text-stone-800">${item.product.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-stone-400 hover:text-rose-500 transition"
                          aria-label="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-stone-100 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-stone-800">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-lg">${getSubtotal().toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-stone-400">Shipping and taxes calculated at checkout.</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="border border-stone-200 rounded-full py-2.5 text-stone-600 text-xs tracking-wider uppercase hover:bg-stone-50 font-light"
                  >
                    Keep Shopping
                  </button>
                  <button
                    onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                    className="bg-stone-800 text-white rounded-full py-2.5 text-xs tracking-wider uppercase hover:bg-stone-900 font-light text-center flex items-center justify-center"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 flex flex-col justify-between shadow-2xl animate-slide-in">
            <div className="flex-grow flex flex-col min-h-0">
              <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                <h3 className="text-lg font-serif text-stone-800 tracking-wide flex items-center gap-2">
                  <Heart className="w-5 h-5 stroke-[1.5] text-rose-500" />
                  Your Wishlist ({wishlist.length})
                </h3>
                <button onClick={() => setIsWishlistOpen(false)} aria-label="Close wishlist drawer">
                  <X className="w-5 h-5 text-stone-500 hover:text-stone-800" />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 stroke-[1] text-stone-300" />
                  </div>
                  <div>
                    <p className="text-stone-600 font-serif">Your wishlist is empty</p>
                    <p className="text-xs text-stone-400 mt-1">Keep track of your luxury favorites here.</p>
                  </div>
                  <button
                    onClick={() => { setIsWishlistOpen(false); navigate('/shop'); }}
                    className="border border-stone-800 text-stone-800 text-xs tracking-widest px-6 py-2.5 rounded-full hover:bg-stone-800 hover:text-white transition uppercase font-light"
                  >
                    Browse Items
                  </button>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto py-4 space-y-4 min-h-0">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 p-2.5 bg-stone-50 rounded-xl relative border border-transparent hover:border-stone-100 transition">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-lg bg-stone-200"
                      />
                      <div className="flex-grow text-xs space-y-1">
                        <h4 className="font-serif text-stone-800 text-sm font-medium">{item.name}</h4>
                        <p className="text-stone-400 capitalize">{item.material}</p>
                        <p className="text-stone-800 font-semibold">${item.price}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between text-xs">
                        <button
                          onClick={() => { setIsWishlistOpen(false); navigate(`/product/${item.id}`); }}
                          className="bg-stone-800 text-white rounded px-2.5 py-1 text-[10px] hover:bg-stone-900 transition uppercase tracking-wider"
                        >
                          View Product
                        </button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-stone-400 hover:text-rose-500 transition"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-stone-100 pt-4">
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full bg-stone-800 text-white rounded-full py-2.5 text-xs tracking-wider uppercase hover:bg-stone-900 font-light"
              >
                Back To Store
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
