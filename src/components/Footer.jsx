import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 px-6 md:px-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand section */}
        <div className="space-y-4">
          <Link to="/" className="block">
            <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-[0.15em] text-white uppercase">
              Sommeil
            </h2>
            <span className="text-[9px] tracking-[0.3em] text-stone-500 font-light block uppercase">
              Organic &amp; Silk
            </span>
          </Link>
          <p className="text-xs text-stone-400 font-light leading-relaxed max-w-xs">
            A family-owned sustainable sleepwear brand dedicated to peaceful nights, safety, and environmentally responsible luxury.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white transition" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider font-medium text-white">The Collections</h3>
          <ul className="space-y-2 text-xs text-stone-400 font-light">
            <li><Link to="/shop" className="hover:text-white transition">Shop All Sleepwear</Link></li>
            <li><Link to="/shop?material=Organic Cotton" className="hover:text-white transition">Certified Organic Cotton</Link></li>
            <li><Link to="/shop?material=Natural Silk" className="hover:text-white transition">Pure Mulberry Silk</Link></li>
            <li><Link to="/shop?price=50" className="hover:text-white transition">Under $50 Pajamas</Link></li>
          </ul>
        </div>

        {/* Brand Information */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider font-medium text-white">Customer Care</h3>
          <ul className="space-y-2 text-xs text-stone-400 font-light">
            <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">Sizing Chart &amp; Laundry Guide</Link></li>
            <li><Link to="/faq#returns" className="hover:text-white transition">Returns &amp; Exchanges</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Support</Link></li>
          </ul>
        </div>

        {/* Elegant Subscription */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider font-medium text-white">Join Our Family</h3>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            Subscribe to discover new collection arrivals, exclusive family offers, and organic care tips.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-stone-800 border border-stone-700 text-xs px-3 py-2.5 rounded text-white focus:outline-none focus:border-stone-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs font-semibold"
              >
                Join
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-emerald-400 tracking-wide font-light">Welcome! Thank you for subscribing.</p>
            )}
          </form>
        </div>
      </div>

      {/* Underbar */}
      <div className="max-w-7xl mx-auto border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-stone-500 font-light space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} Sommeil Luxury Sleepwear. All Rights Reserved.</p>
        <div className="flex space-x-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Eco Certifications</span>
        </div>
      </div>
    </footer>
  );
}
