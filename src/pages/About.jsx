import React from 'react';
import { Leaf, Award, Compass, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-16 pb-16">
      {/* Editorial Header */}
      <section className="bg-stone-100 py-16 px-6 md:px-12 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-400 block">Our Philosophy</span>
        <h2 className="text-4xl font-serif text-stone-900 font-semibold uppercase">The Story of Sommeil</h2>
        <p className="text-sm text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
          Woven from a dream to replace synthetic nightwear with pure organic, natural fibers. Dedicated to beautiful, comfortable, and eco-certified childhood sleep.
        </p>
      </section>

      {/* Narrative grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-amber-800 font-semibold">Sustainable Beginnings</span>
          <h3 className="text-3xl font-serif text-stone-900 leading-tight">Born out of Parental Care</h3>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Sommeil was founded in 2021 by Sofia and Henrik Lindqvist, parents of two beautiful, sensitive-skinned children. Guided by Scandinavian simplicity and sustainable standards, we set out to craft a luxurious alternative to standard nylon and heavy-polyester pajamas.
          </p>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            We discovered that high-quality sleep is heavily tied to fabric breathability. By selecting only GOTS-certified organic cotton and high-grade 19 Momme mulberry silk, we created sleepwear that keeps children cooling during heatwaves and warm during dark, icy Scandinavian winters.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
            alt="Family cuddling together wearing premium pajamas"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Sustainable Values Checklist */}
      <section className="bg-stone-50 py-16 border-t border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400">Our Commitments</span>
            <h3 className="text-3xl font-serif text-stone-900">Crafted with Pure Integrity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-3">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <h4 className="font-serif text-stone-800 text-sm font-semibold">GOTS-Certified</h4>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">Woven with 100% certified organic cotton devoid of chemical bleaches or heavy metal pesticides.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-3">
              <Award className="w-5 h-5 text-amber-600" />
              <h4 className="font-serif text-stone-800 text-sm font-semibold">Grade 6A Mulberry Silk</h4>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">The finest organic thread, naturally hypo-allergenic and soothing to help minimize bedtime eczema.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-3">
              <Compass className="w-5 h-5 text-stone-600" />
              <h4 className="font-serif text-stone-800 text-sm font-semibold">Ethical European Mills</h4>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">We support fair-wage, safe working conditions at boutique factories in Portugal and Italy.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-100 flex flex-col items-center text-center space-y-3">
              <Heart className="w-5 h-5 text-rose-600" />
              <h4 className="font-serif text-stone-800 text-sm font-semibold">Slow Fashion Standard</h4>
              <p className="text-[11px] text-stone-400 font-light leading-relaxed">Timeless, neutral colors made to survive active hand-me-downs for subsequent siblings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Craft Story Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 text-center max-w-2xl space-y-4">
        <h3 className="text-2xl font-serif text-stone-900 font-semibold">“Safe sleep starts with the cleanest fabrics.”</h3>
        <p className="text-xs text-stone-500 font-light italic leading-relaxed">
          Sofia &amp; Henrik Lindqvist, Founders
        </p>
      </section>
    </div>
  );
}
