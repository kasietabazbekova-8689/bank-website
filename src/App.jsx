import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Categories from './pages/Categories';
import Archive from './pages/Archive';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import SingleArticle from './pages/SingleArticle';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        {/* Scroll restoration on route changes */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="categories" element={<Categories />} />
            <Route path="archive" element={<Archive />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="article/:slug" element={<SingleArticle />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
