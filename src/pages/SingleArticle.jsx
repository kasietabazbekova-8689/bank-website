import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, ChevronLeft, ChevronRight, Share2, Copy, Check, ArrowLeft, Bookmark } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import Breadcrumb from '../components/Breadcrumb';
import AuthorCard from '../components/AuthorCard';
import TagList from '../components/TagList';
import CommentSection from '../components/CommentSection';
import Sidebar from '../components/Sidebar';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../components/SocialIcons';

export default function SingleArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [adjacent, setAdjacent] = useState({ prevPost: null, nextPost: null });
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor window scroll to update custom reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadPostData() {
      setLoading(true);
      setError(null);
      try {
        const article = await blogApi.getPostBySlug(slug);
        setPost(article);

        // Update Dynamic SEO with article specific data
        updateSEO({
          title: article.title,
          description: article.excerpt,
          image: article.featuredImage,
          type: "article",
          slug: article.slug,
          articleData: article
        });

        // Load adjacent and related posts
        const adjacentResults = await blogApi.getAdjacentPosts(article.id);
        setAdjacent(adjacentResults);

        const relatedResults = await blogApi.getRelatedPosts(article.id, article.category, 3);
        setRelatedPosts(relatedResults);
      } catch (err) {
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    }
    loadPostData();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareClick = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || "");
    let shareUrl = "";

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Article Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300">The article you are trying to read doesn't exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all focus:outline-none">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles Directory</span>
        </Link>
      </div>
    );
  }

  // Dynamic Table of Contents calculation:
  // We look at the HTML in fullContent and pull out text inside <h2> tags as our anchors
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  const tocHeadings = [];
  let match;
  while ((match = h2Regex.exec(post.fullContent)) !== null) {
    tocHeadings.push(match[1].replace(/<[^>]*>/g, '')); // Strip any nested tags
  }

  return (
    <div className="relative pb-20">
      {/* Dynamic top Reading Progress indicator bar */}
      <div
        className="fixed top-16 sm:top-20 left-0 right-0 h-1 bg-indigo-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb path */}
        <Breadcrumb
          items={[
            { label: 'Blog', path: '/blog' },
            { label: post.category, path: `/blog?category=${encodeURIComponent(post.category)}` },
            { label: post.title, path: `/article/${post.slug}` }
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main Reading Column */}
          <article className="lg:col-span-8 space-y-8 text-left">

            {/* Header metadata details */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 dark:text-indigo-400 rounded-full transition-all focus:outline-none"
                >
                  {post.category}
                </Link>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              {/* Author & Read stats */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author?.avatar}
                    alt={post.author?.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                  />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">{post.author?.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">Author & Creator</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    {post.readingTime}
                  </span>
                  {post.comments && (
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-indigo-500" />
                      {post.comments.length} Comments
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Large cover image */}
            <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Table of Contents Box (TOC) */}
            {tocHeadings.length > 0 && (
              <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 max-w-xl">
                <h4 className="font-serif text-base font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-500" />
                  Table of Contents
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {tocHeadings.map((heading, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-indigo-500 font-bold font-sans">0{index + 1}.</span>
                      <a
                        href={`#section-${index}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(`section-${index}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors leading-relaxed"
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rich Text Prose Content (renders with formatting support) */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              {/* Parse the fullContent dynamically adding sections to match TOC */}
              {post.fullContent.split('<h2>').map((chunk, index) => {
                if (index === 0) {
                  return <div key={index} dangerouslySetInnerHTML={{ __html: chunk }} />;
                }
                const parts = chunk.split('</h2>');
                const headingText = parts[0];
                const bodyText = parts[1];

                return (
                  <div key={index} className="scroll-mt-24" id={`section-${index - 1}`}>
                    <h2 className="font-serif font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-2 flex items-baseline gap-2">
                      <span className="text-xs text-indigo-500 font-sans tracking-widest">0{index}</span>
                      {headingText}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: bodyText }} />
                  </div>
                );
              })}
            </div>

            {/* Tags footer */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap justify-between items-center gap-4">
              <TagList tags={post.tags} />

              {/* Share Action row */}
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  Share Article:
                </span>
                <button
                  onClick={() => handleShareClick('twitter')}
                  className="p-2 rounded bg-slate-100 hover:bg-indigo-500 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 transition-all focus:outline-none"
                  aria-label="Share on Twitter"
                >
                  <TwitterIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleShareClick('facebook')}
                  className="p-2 rounded bg-slate-100 hover:bg-indigo-500 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 transition-all focus:outline-none"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShareClick('linkedin')}
                  className="p-2 rounded bg-slate-100 hover:bg-indigo-500 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 transition-all focus:outline-none"
                  aria-label="Share on LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded bg-slate-100 hover:bg-indigo-500 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 transition-all text-slate-500 hover:text-white focus:outline-none relative"
                  aria-label="Copy link"
                  title="Copy Link to Clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Author Profile card bio */}
            <AuthorCard author={post.author} className="mt-8" />

            {/* Previous / Next Article Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              {adjacent.prevPost ? (
                <Link
                  to={`/article/${adjacent.prevPost.slug}`}
                  className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 bg-white dark:bg-brand-charcoal hover:bg-indigo-50/10 transition-all text-left flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <ChevronLeft className="w-6 h-6 text-indigo-500 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">PREVIOUS ENTRY</span>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate mt-1">
                      {adjacent.prevPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="p-5 rounded-2xl border border-dashed border-slate-100 dark:border-slate-800/40 text-slate-400 text-left flex items-center justify-center text-xs italic">
                  No older entries available.
                </div>
              )}

              {adjacent.nextPost ? (
                <Link
                  to={`/article/${adjacent.nextPost.slug}`}
                  className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 bg-white dark:bg-brand-charcoal hover:bg-indigo-50/10 transition-all text-right flex items-center justify-end gap-4 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="min-w-0 text-right">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">NEXT ENTRY</span>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate mt-1">
                      {adjacent.nextPost.title}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-indigo-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              ) : (
                <div className="p-5 rounded-2xl border border-dashed border-slate-100 dark:border-slate-800/40 text-slate-400 text-right flex items-center justify-center text-xs italic">
                  No newer entries available.
                </div>
              )}
            </div>

            {/* Related Articles list */}
            {relatedPosts.length > 0 && (
              <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800/60">
                <h4 className="font-serif text-lg font-bold text-slate-800 dark:text-white">
                  Related Publications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map(rel => (
                    <Link
                      key={rel.id}
                      to={`/article/${rel.slug}`}
                      className="group block p-4 bg-white dark:bg-brand-charcoal border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <img
                        src={rel.featuredImage}
                        alt={rel.title}
                        className="aspect-[16/10] w-full object-cover rounded-lg bg-slate-100 dark:bg-slate-800 mb-3"
                      />
                      <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                        {rel.category}
                      </span>
                      <h5 className="font-sans text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {rel.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comment Section Panel (mocked) */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800/60">
              <CommentSection initialComments={post.comments || []} />
            </div>

          </article>

          {/* Sidebar Area Column */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
