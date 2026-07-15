import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Rss, Mail, MapPin, Phone } from 'lucide-react';
import { MOCK_POSTS, CATEGORIES } from '../data/posts';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function Footer() {
  // Sort posts by date and get top 3 as latest posts
  const latestPosts = [...MOCK_POSTS]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 3);

  // Take top 5 categories
  const popularCategories = CATEGORIES.slice(0, 5);

  const handleRSSClick = (e) => {
    e.preventDefault();
    alert("RSS feed placeholder: In a production environment, this link will direct to /rss.xml containing the latest posts in RSS 2.0 XML format.");
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: About the Journal */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded bg-indigo-950 text-indigo-400 group-hover:bg-indigo-900 transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                My Private Journal
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A carefully curated digital library of ideas, software engineering tutorials, life lessons, travel diaries, and quiet reflections. Designed for curious readers who value deep content.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="/rss.xml" onClick={handleRSSClick} className="p-2 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="RSS Feed">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Latest Posts */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold tracking-wide text-white uppercase border-l-2 border-indigo-500 pl-3">
              Latest Posts
            </h3>
            <ul className="space-y-3">
              {latestPosts.map(post => (
                <li key={post.id} className="group">
                  <Link to={`/article/${post.slug}`} className="block focus:outline-none focus:underline">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </p>
                    <span className="text-xs text-slate-500 block mt-1">
                      {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold tracking-wide text-white uppercase border-l-2 border-indigo-500 pl-3">
              Categories
            </h3>
            <ul className="space-y-2">
              {popularCategories.map(cat => (
                <li key={cat.slug}>
                  <Link
                    to={`/blog?category=${encodeURIComponent(cat.name)}`}
                    className="text-sm text-slate-400 hover:text-indigo-400 flex justify-between items-center transition-colors focus:outline-none focus:underline"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full group-hover:bg-indigo-950">
                      {MOCK_POSTS.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold focus:outline-none focus:underline">
                  View All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Contact */}
          <div className="space-y-4" id="footer-newsletter">
            <h3 className="font-serif text-base font-semibold tracking-wide text-white uppercase border-l-2 border-indigo-500 pl-3">
              Contact & Journal
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>San Francisco, CA, USA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <a href="mailto:hello@myprivatejournal.com" className="hover:text-white transition-colors">
                  hello@myprivatejournal.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>+1 (415) 555-0199</span>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-2">Subscribe to our newsletter</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.elements.footerEmail.value;
                  if (email) {
                    alert(`Thank you for subscribing, ${email}! We'll keep you updated.`);
                    e.target.reset();
                  }
                }}
                className="flex"
              >
                <input
                  name="footerEmail"
                  type="email"
                  placeholder="Your email..."
                  required
                  className="px-3 py-2 text-xs rounded-l bg-slate-800 text-white border-none focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-grow"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-r hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-slate-950 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} My Private Journal. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors focus:outline-none focus:underline">
              Privacy Policy
            </Link>
            <Link to="/privacy-policy#terms" className="hover:text-slate-300 transition-colors focus:outline-none focus:underline">
              Terms of Service
            </Link>
            <a href="/rss.xml" onClick={handleRSSClick} className="hover:text-slate-300 transition-colors focus:outline-none focus:underline">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
