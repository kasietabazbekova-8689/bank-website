import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, CornerDownRight } from 'lucide-react';
import { updateSEO } from '../utils/seo';

export default function NotFound() {
  useEffect(() => {
    updateSEO({
      title: "Page Not Found (404)",
      description: "The page you are looking for does not exist on My Private Journal."
    });
  }, []);

  return (
    <div className="max-w-xl mx-auto px-6 py-20 sm:py-32 flex flex-col items-center justify-center text-center space-y-6">
      {/* Decorative floating icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl scale-125 animate-pulse"></div>
        <div className="relative p-5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 shadow-sm border border-indigo-100/40 dark:border-indigo-900/40">
          <HelpCircle className="w-16 h-16" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <span className="text-4xl font-black font-sans text-indigo-500 tracking-wider">404</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
          We're sorry, but the page you are looking for does not exist, has been removed, or has had its name changed.
        </p>
      </div>

      {/* Helpful redirect items */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs uppercase tracking-wider transition-all focus:outline-none"
        >
          <span>Browse Articles</span>
          <CornerDownRight className="w-4 h-4 text-indigo-500" />
        </Link>
      </div>

      <div className="text-xs text-slate-400 dark:text-slate-500 pt-8 max-w-xs leading-relaxed">
        Tip: Try matching your query by keywords using the Search box inside the Navigation header.
      </div>
    </div>
  );
}
