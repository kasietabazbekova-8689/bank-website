import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Calendar, BookOpen, Clock, Tag, X, ListFilter } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Read filters from query parameters
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');

  useEffect(() => {
    // Dynamic SEO update based on filters
    let seoTitle = "Articles Directory";
    let seoDesc = "Explore software engineering, design patterns, philosophy, books, and lifestyle writeups.";

    if (categoryFilter) {
      seoTitle = `Articles in category "${categoryFilter}"`;
      seoDesc = `Explore all articles cataloged under ${categoryFilter} inside My Private Journal.`;
    } else if (tagFilter) {
      seoTitle = `Articles tagged with #${tagFilter}`;
      seoDesc = `Explore articles tagging #${tagFilter} inside My Private Journal.`;
    }

    updateSEO({
      title: seoTitle,
      description: seoDesc
    });

    async function loadFilteredPosts() {
      setLoading(true);
      setCurrentPage(1); // Reset page on filter shift
      try {
        let results = [];
        if (categoryFilter) {
          results = await blogApi.getPostsByCategory(categoryFilter);
        } else if (tagFilter) {
          results = await blogApi.getPostsByTag(tagFilter);
        } else {
          results = await blogApi.getPosts();
        }
        setPosts(results);
      } catch (err) {
        console.error("Failed to load blog posts", err);
      } finally {
        setLoading(false);
      }
    }

    loadFilteredPosts();
  }, [categoryFilter, tagFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  // Breadcrumbs construction
  const breadcrumbItems = [{ label: 'Blog', path: '/blog' }];
  if (categoryFilter) {
    breadcrumbItems.push({ label: categoryFilter, path: `/blog?category=${encodeURIComponent(categoryFilter)}` });
  } else if (tagFilter) {
    breadcrumbItems.push({ label: `#${tagFilter}`, path: `/blog?tag=${encodeURIComponent(tagFilter)}` });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems.slice(0, breadcrumbItems.length - 1)} />

      {/* Page Header */}
      <div className="text-left max-w-3xl space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white tracking-tight">
          {categoryFilter
            ? `Category: ${categoryFilter}`
            : tagFilter
            ? `Tag: #${tagFilter}`
            : 'All Publications'}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {categoryFilter
            ? `Displaying all digital entries categorized under "${categoryFilter}".`
            : tagFilter
            ? `Displaying all entries tagged with #${tagFilter}.`
            : 'A comprehensive collection of software engineering guidelines, travel diaries, productivity reflections, and books retrospectives.'}
        </p>

        {/* Active Filter Pill */}
        {(categoryFilter || tagFilter) && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide inline-flex items-center gap-1">
              <ListFilter className="w-3.5 h-3.5" />
              Active Filter:
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-900/40">
              <span>{categoryFilter ? `Category: ${categoryFilter}` : `#${tagFilter}`}</span>
              <button
                onClick={handleClearFilters}
                className="hover:bg-indigo-100 dark:hover:bg-indigo-900 p-0.5 rounded transition-colors"
                title="Clear filter"
                aria-label="Clear active filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 underline transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Posts Area */}
        <div className="lg:col-span-8 space-y-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <EmptyState
              title="No Articles Match This Tag/Category"
              message="It looks like there are currently no publications registered under this specific stream. Check out other categories in the sidebar!"
              actionText="Back to Blog Directory"
              onActionClick={handleClearFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>

              {/* Dynamic pagination with bounds */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>

      </div>
    </div>
  );
}
