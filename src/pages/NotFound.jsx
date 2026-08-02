import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center space-y-6">
      <h2 className="text-6xl font-serif text-stone-300 font-bold">404</h2>
      <div className="space-y-2">
        <h3 className="text-xl font-serif text-stone-800 font-semibold">Page Not Found</h3>
        <p className="text-xs text-stone-500 font-light leading-relaxed">
          The premium page or design model you are looking for has slept or relocated elsewhere.
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="bg-stone-900 text-stone-50 text-xs tracking-widest px-8 py-3.5 rounded-full uppercase hover:bg-stone-950 transition font-semibold"
      >
        Back To Safe Haven (Home)
      </button>
    </div>
  );
}
