import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Info } from 'lucide-react';
import { InstagramIcon, FacebookIcon, PinterestIcon } from '../components/SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16">
      {/* Editorial Title */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-400 block">Get in Touch</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-semibold uppercase">Connect With Our Family</h2>
        <p className="text-xs text-stone-500 font-light max-w-lg mx-auto leading-relaxed">
          Need styling assistance, custom size consulting, or tracking support? Send us a message below and we will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact form side */}
        <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm space-y-6">
          <h3 className="text-lg font-serif text-stone-800">Send an Enquiry</h3>

          {submitted ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100 space-y-2 text-center animate-slide-in">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-semibold text-sm">Thank You For Reaching Out</h4>
              <p className="text-xs font-light">We have received your message successfully! Our family representative will email you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Enter your name"
                    className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="Enter your email"
                    className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">Subject (Optional)</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Order enquiry, size question..."
                  className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">Message</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  placeholder="How can we help your family?"
                  className="w-full border border-stone-200 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-stone-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-stone-100 text-xs font-semibold tracking-widest uppercase py-3.5 rounded-xl hover:bg-stone-950 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info & Map side */}
        <div className="space-y-8">
          {/* Info blocks */}
          <div className="bg-stone-100/60 p-8 rounded-2xl border border-stone-200/40 space-y-6">
            <h3 className="text-lg font-serif text-stone-800">Our Boutique Headquarters</h3>

            <div className="space-y-4 text-xs font-light text-stone-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-stone-700 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-800">Swedish Studio</p>
                  <p>Kungsgatan 12, 411 19 Gothenburg, Sweden</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-stone-700 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-800">Email Support</p>
                  <p>hello@sommeilsleep.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-stone-700 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-800">International Telephone</p>
                  <p>+46 (0) 31 789 45 60</p>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="border-t border-stone-200/60 pt-6 mt-6">
              <p className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-3">Join our digital family</p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://instagram.com/sommeil_organic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-stone-600 hover:text-amber-800 transition text-xs"
                >
                  <InstagramIcon className="w-4 h-4 stroke-[1.5]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://facebook.com/sommeil_organic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-stone-600 hover:text-amber-800 transition text-xs"
                >
                  <FacebookIcon className="w-4 h-4 stroke-[1.5]" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://pinterest.com/sommeil_organic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-stone-600 hover:text-amber-800 transition text-xs"
                >
                  <PinterestIcon className="w-4 h-4 stroke-[1.5]" />
                  <span>Pinterest</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Mock Google Maps Integration */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 relative h-64 shadow-inner bg-stone-200/50 flex flex-col items-center justify-center p-6 text-center">
            {/* Background pattern mimicking map streets */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative space-y-3 z-10 max-w-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mx-auto">
                <MapPin className="w-6 h-6 text-amber-800 animate-bounce" />
              </div>
              <div>
                <p className="font-serif text-stone-800 text-sm font-semibold">Live Studio Location Map</p>
                <p className="text-[11px] text-stone-500 mt-0.5 font-light leading-relaxed">Click to load interactive maps direction from your address in Gothenburg.</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block border border-stone-800 text-stone-800 text-[10px] tracking-widest px-4 py-2 rounded-full uppercase hover:bg-stone-800 hover:text-white transition"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
