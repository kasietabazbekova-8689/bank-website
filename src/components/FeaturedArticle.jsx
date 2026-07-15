import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import TagList from './TagList';

export default function FeaturedArticle({ post }) {
  if (!post) return null;

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="bg-white dark:bg-brand-charcoal rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 group">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Landscape cover image */}
        <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 dark:bg-slate-800 min-h-[250px] sm:min-h-[350px]">
          <Link to={`/article/${post.slug}`} className="focus:outline-none">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </Link>
          <div className="absolute top-6 left-6">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-colors focus:outline-none"
            >
              {post.category}
            </Link>
          </div>
        </div>

        {/* Text and context details */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
              {post.comments && post.comments.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  {post.comments.length} comments
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-3.5xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              <Link to={`/article/${post.slug}`} className="focus:outline-none focus:underline">
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {post.excerpt}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800/60">
            {/* Tags list */}
            <TagList tags={post.tags} />

            <div className="flex items-center justify-between pt-2">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <img
                  src={post.author?.avatar}
                  alt={post.author?.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                    {post.author?.name}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Journal Creator
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/article/${post.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-slate-900 hover:bg-indigo-600 text-white dark:bg-slate-800 dark:hover:bg-indigo-600 rounded-xl transition-all shadow-sm focus:outline-none focus:underline"
              >
                <span>Continue Reading</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
