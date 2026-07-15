import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';

export default function AuthorCard({ author, className = '' }) {
  if (!author) return null;

  return (
    <div className={`p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-brand-charcoal shadow-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left transition-all hover:shadow-md ${className}`}>
      <img
        src={author.avatar}
        alt={author.name}
        className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 dark:border-slate-700 shadow-md flex-shrink-0"
        loading="lazy"
      />
      <div className="space-y-2 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              WRITTEN BY
            </span>
            <h4 className="font-serif text-lg font-bold text-slate-800 dark:text-white leading-tight">
              {author.name}
            </h4>
          </div>
          <div className="flex justify-center gap-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/30 text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/30 text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors" aria-label="Twitter">
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/30 text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
