import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import TagList from './TagList';

export default function ArticleCard({ post }) {
  if (!post) return null;

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="flex flex-col bg-white dark:bg-brand-charcoal rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
      {/* Thumbnail with lazy-loading */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link to={`/article/${post.slug}`} className="focus:outline-none">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-4 left-4">
          <Link
            to={`/blog?category=${encodeURIComponent(post.category)}`}
            className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400 backdrop-blur-sm shadow-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all focus:outline-none"
          >
            {post.category}
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
            {post.comments && post.comments.length > 0 && (
              <span className="flex items-center gap-1 hidden sm:inline-flex">
                <MessageSquare className="w-3.5 h-3.5" />
                {post.comments.length}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
            <Link to={`/article/${post.slug}`} className="focus:outline-none focus:underline">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Footer Area: Tags & Action Button */}
        <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800/60">
          <TagList tags={post.tags.slice(0, 3)} />

          <div className="flex items-center justify-between">
            {/* Author Small Icon */}
            <div className="flex items-center gap-2">
              <img
                src={post.author?.avatar}
                alt={post.author?.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {post.author?.name}
              </span>
            </div>

            <Link
              to={`/article/${post.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all group-hover:translate-x-1 focus:outline-none focus:underline"
            >
              <span>Read More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
