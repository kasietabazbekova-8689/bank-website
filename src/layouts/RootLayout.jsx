import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-stone-200 selection:text-stone-900">
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
