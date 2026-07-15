import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = "Search for topics, articles, tags...", initialQuery = "", onSearch }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-5 pr-14 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-charcoal text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm focus:shadow-md transition-all text-base"
        />
        <button
          type="submit"
          className="absolute right-3 p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm cursor-pointer"
          aria-label="Submit search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
