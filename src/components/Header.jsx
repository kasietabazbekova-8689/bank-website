import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, BookOpen } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll detection for sticky premium effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  const closeMenu = () => setMobileMenuOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/categories', label: 'Categories' },
    { path: '/archive', label: 'Archive' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleSubscribeClick = () => {
    // Smooth scroll to subscribe / newsletter section, or prompt
    const newsletterSection = document.getElementById('newsletter-section');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we are on an article reading page and newsletter is in the sidebar/footer, scroll to footer
      const footerNewsletter = document.getElementById('footer-newsletter') || document.getElementById('sidebar-newsletter');
      if (footerNewsletter) {
        footerNewsletter.scrollIntoView({ behavior: 'smooth' });
        const input = footerNewsletter.querySelector('input');
        if (input) input.focus();
      } else {
        alert("Thank you for your interest! Please subscribe via the newsletter section in the footer.");
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-brand-charcoal/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800'
            : 'bg-white dark:bg-brand-charcoal border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1" onClick={closeMenu}>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-all">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-brand-navy dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                My Private Journal
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-sans text-[15px] font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                        : 'text-slate-600 dark:text-slate-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44 lg:w-56"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Search posts"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Subscribe Button */}
              <button
                onClick={handleSubscribeClick}
                className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </div>

            {/* Mobile Controls (Menu & Theme toggle only on narrowest) */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none"
                aria-label="Toggle Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Laptop/Tablet menu toggle */}
            <div className="hidden sm:flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {searchOpen && (
          <div className="sm:hidden border-t border-slate-100 dark:border-slate-800 px-4 py-3 bg-white dark:bg-brand-charcoal">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700"
              >
                Go
              </button>
            </form>
          </div>
        )}

        {/* Mobile Slide-out Drawer */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu}></div>

          {/* Slider Drawer content */}
          <nav
            className={`fixed top-0 bottom-0 right-0 w-4/5 max-w-sm bg-white dark:bg-brand-charcoal shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out z-50 ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="font-serif text-lg font-bold text-brand-navy dark:text-white">
                  Navigation
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `font-sans text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Mobile Actions in Drawer Footer */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <button
                onClick={handleSubscribeClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                <span>Subscribe to Journal</span>
              </button>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
                &copy; {new Date().getFullYear()} My Private Journal
              </p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
