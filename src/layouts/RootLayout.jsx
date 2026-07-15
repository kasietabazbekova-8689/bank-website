import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-brand-charcoal text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
