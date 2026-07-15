import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight, Compass, Terminal, Sparkles, MessageSquare } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';
import Newsletter from '../components/Newsletter';
import Pagination from '../components/Pagination';

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamic SEO update for home page
    updateSEO({
      title: "Thoughts, Ideas & Stories",
      description: "A personal space where I share experiences, tutorials, reflections, technology insights, travel stories, and life lessons.",
      type: "website"
    });

    async function loadHomeData() {
      setLoading(true);
      try {
        const featured = await blogApi.getFeaturedPosts();
        // Limit to top 6 featured as requested
        setFeaturedPosts(featured.slice(0, 6));

        const allPosts = await blogApi.getPosts();
        setLatestPosts(allPosts);
      } catch (err) {
        console.error("Failed to load homepage articles", err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(latestPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentLatestPosts = latestPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to latest posts section header
    const postsHeader = document.getElementById('latest-posts-section');
    if (postsHeader) {
      postsHeader.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReadLatestClick = () => {
    const featuredSection = document.getElementById('featured-posts-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-brand-charcoal border-b border-slate-100 dark:border-slate-800 py-16 sm:py-24">
        {/* Abstract decorative patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/20 to-transparent dark:from-indigo-950/10 pointer-events-none"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/40 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WELCOME TO MY DIGITAL HOME</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Thoughts, Ideas & Stories
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                A personal space where I share experiences, tutorials, reflections, technology insights, travel stories, and life lessons. Created to offer a clean, premium, minimalist reading experience.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleReadLatestClick}
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Read Latest Articles
                </button>
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm tracking-wide transition-all focus:outline-none"
                >
                  About Me
                </Link>
              </div>
            </div>

            {/* Right Cover Art Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500 to-indigo-600 opacity-20 blur-xl"></div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
                  alt="Elegant Notebook and Writing Quill Placeholder"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-left">
                    <p className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">Featured Quote</p>
                    <p className="font-serif italic text-sm sm:text-base mt-1 text-slate-200">
                      "We write to taste life twice, in the moment and in retrospection."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Articles Slider/Grid (6 Articles) */}
      <section id="featured-posts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Curated Reads</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
              Featured Articles
            </h2>
          </div>
          <Link
            to="/blog"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
          >
            <span>Browse All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Single Featured Large Card */}
            {featuredPosts.length > 0 && <FeaturedArticle post={featuredPosts[0]} />}

            {/* Next 5 Featured Articles in horizontal lists or standard sub-grid */}
            {featuredPosts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.slice(1).map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 3. Latest Posts and Sidebar Layout */}
      <section id="latest-posts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Chronological Stream</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
              Latest Posts
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Posts Column */}
          <div className="lg:col-span-8 space-y-8">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentLatestPosts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* 4. Full Width Newsletter Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Newsletter />
      </section>
    </div>
  );
}
