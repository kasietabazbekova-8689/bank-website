import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import ScrollToTop from './components/ScrollToTop';
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ShopProvider>
      <HashRouter>
        {/* Scroll restoration on route changes */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </ShopProvider>
  );
}
