import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Info, HelpCircle } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import ArticleCard from '../components/ArticleCard';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';

  useEffect(() => {
    updateSEO({
      title: query ? `Search results for "${query}"` : "Search Journal",
      description: `Browse matching search results for "${query}" inside My Private Journal.`
    });

    async function executeSearch() {
      if (!query.trim()) {
        setPosts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const results = await blogApi.searchPosts(query);
        setPosts(results);
      } catch (err) {
        console.error("Search query failed", err);
      } finally {
        setLoading(false);
      }
    }

    executeSearch();
  }, [query]);

  const handleNewSearch = (newQuery) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={[{ label: 'Search Results', path: '/search' }]} />

      {/* Header */}
      <div className="text-left space-y-4 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">INDEX FINDER</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
          {query ? `Search Results for "${query}"` : 'Search Articles'}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {query
            ? `We found ${posts.length} ${posts.length === 1 ? 'article' : 'articles'} matching your search keywords.`
            : 'Looking for a particular software tutorial, travel diary, or productivity technique? Type your keywords below.'}
        </p>
      </div>

      {/* Inline Search Bar */}
      <div className="max-w-2xl text-left">
        <SearchBar
          initialQuery={query}
          placeholder="Search title, content, category, tags..."
          onSearch={handleNewSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : !query.trim() ? (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-brand-charcoal border border-slate-100 dark:border-slate-800 text-slate-500 max-w-2xl">
          <HelpCircle className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
          <p className="text-sm font-medium">Please enter a search keyword above to browse matching posts.</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-left max-w-2xl">
          <EmptyState
            title={`No results matching "${query}"`}
            message="We searched high and low but couldn't find any articles matching your search criteria. Try using simpler tags, category names, or different phrases."
            actionText="View All Publications"
            onActionClick={() => navigate('/blog')}
          />
        </div>
      ) : (
        /* Matching Articles Grid */
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>Matching Publications Grid</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
