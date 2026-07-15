import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_POSTS, CATEGORIES } from '../data/posts';
import { blogApi } from '../services/api';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categoriesWithCount, setCategoriesWithCount] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSidebarData() {
      const popular = await blogApi.getPopularPosts(4);
      const recent = await blogApi.getRecentPosts(4);
      const cats = await blogApi.getCategories();
      setPopularPosts(popular);
      setRecentPosts(recent);
      setCategoriesWithCount(cats.slice(0, 8)); // Top 8 categories
    }
    loadSidebarData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    try {
      await blogApi.submitNewsletter(newsletterEmail);
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err) {
      alert(err.message || "An error occurred");
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Extract all distinct tags and count their frequency
  const allTags = MOCK_POSTS.flatMap(p => p.tags);
  const tagCounts = allTags.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  // Sort tags by frequency and pick top 10
  const popularTags = Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .slice(0, 10);

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      {/* 1. Live Search */}
      <div className="bg-white dark:bg-brand-charcoal p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4">
          Search Journal
        </h3>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Type and hit enter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* 2. Author Profile Card */}
      <div className="bg-gradient-to-br from-brand-navy to-slate-900 text-white p-6 rounded-2xl shadow-sm transition-all hover:shadow-md relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full"></div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Alex Johnson Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-inner"
            />
            <div>
              <h4 className="font-serif text-lg font-bold text-white">Alex Johnson</h4>
              <p className="text-xs text-indigo-300 font-medium tracking-wide">SOFTWARE CREATOR & WRITER</p>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            Welcome to my private journal! I document ideas, build software tutorials, and share lessons learned from building web applications and exploring remote places.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-all text-white focus:outline-none focus:ring-1 focus:ring-indigo-300" aria-label="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-all text-white focus:outline-none focus:ring-1 focus:ring-indigo-300" aria-label="Twitter">
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-all text-white focus:outline-none focus:ring-1 focus:ring-indigo-300" aria-label="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-all text-white focus:outline-none focus:ring-1 focus:ring-indigo-300" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Popular Posts */}
      <div className="bg-white dark:bg-brand-charcoal p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-50 dark:border-slate-800">
          Popular Articles
        </h3>
        <div className="space-y-4">
          {popularPosts.map(post => (
            <div key={post.id} className="flex gap-3 group items-start">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-slate-100 dark:bg-slate-800 shadow-sm"
              />
              <div className="min-w-0">
                <Link to={`/article/${post.slug}`} className="block text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 focus:outline-none focus:underline">
                  {post.title}
                </Link>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                  {post.views} views • {post.readingTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Posts */}
      <div className="bg-white dark:bg-brand-charcoal p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-50 dark:border-slate-800">
          Recent Entries
        </h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <div key={post.id} className="flex gap-3 group items-start">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-slate-100 dark:bg-slate-800 shadow-sm"
              />
              <div className="min-w-0">
                <Link to={`/article/${post.slug}`} className="block text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 focus:outline-none focus:underline">
                  {post.title}
                </Link>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                  {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Categories */}
      <div className="bg-white dark:bg-brand-charcoal p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-50 dark:border-slate-800">
          Categories
        </h3>
        <ul className="space-y-2.5">
          {categoriesWithCount.map(cat => (
            <li key={cat.slug} className="group">
              <Link
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all focus:outline-none focus:underline"
              >
                <span className="font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  {cat.name}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Popular Tags */}
      <div className="bg-white dark:bg-brand-charcoal p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-50 dark:border-slate-800">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="text-xs px-2.5 py-1.5 rounded-lg font-medium bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-600 hover:text-white dark:text-slate-300 dark:hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Newsletter Signup Card */}
      <div id="sidebar-newsletter" className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-100/60 dark:border-indigo-900/30 shadow-sm transition-all hover:shadow-md">
        <h3 className="font-serif text-lg font-bold text-indigo-950 dark:text-indigo-200 mb-2">
          Weekly Newsletter
        </h3>
        <p className="text-sm text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed mb-4">
          Stay updated! Receive my private thoughts, code explanations, and books recommendations directly in your inbox. No spam.
        </p>

        {newsletterSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex gap-2 items-start animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold block">Awesome choice!</span>
              We've successfully registered your subscription. Talk to you soon!
            </div>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-indigo-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all flex justify-center items-center gap-1.5 cursor-pointer"
            >
              {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
