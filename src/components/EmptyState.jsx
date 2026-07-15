import React from 'react';
import { SearchCode } from 'lucide-react';

export default function EmptyState({
  title = "No articles found",
  message = "We couldn't find any articles matching your search criteria. Try checking your spelling or selecting another filter.",
  actionText,
  onActionClick
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white dark:bg-brand-charcoal rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 space-y-5 shadow-sm max-w-xl mx-auto">
      <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
        <SearchCode className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
          {message}
        </p>
      </div>
      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow cursor-pointer focus:outline-none"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
