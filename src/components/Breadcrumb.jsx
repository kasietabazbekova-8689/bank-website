import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 py-3 text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-500" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 flex-shrink-0" />
            {isLast ? (
              <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-[400px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
