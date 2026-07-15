import React from 'react';
import { Link } from 'react-router-dom';

export default function TagList({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link
          key={tag}
          to={`/blog?tag=${encodeURIComponent(tag)}`}
          className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-950/40 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
