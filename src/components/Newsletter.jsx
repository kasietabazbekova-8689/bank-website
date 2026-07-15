import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { blogApi } from '../services/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await blogApi.submitNewsletter(email);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      alert(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter-section"
      className="bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-navy text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg border border-indigo-900/40"
    >
      {/* Decorative vector meshes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 mb-2">
          <Mail className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
          Stay Updated
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Subscribe to receive new articles, coding tutorials, and life reflections directly in your inbox. No fluff, no advertisements. Just pure knowledge.
        </p>

        {success ? (
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-3 text-left animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-400 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Subscription Confirmed!</h4>
              <p className="text-xs text-emerald-300/90 mt-1">
                You've successfully joined my reader circle. Keep an eye on your inbox for our next digital letter!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
            <div className="relative flex-grow">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          We protect your data. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
}
