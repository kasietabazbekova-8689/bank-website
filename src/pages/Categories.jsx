import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Code2, Globe, Brain, CheckSquare, Briefcase, Heart, Compass, BookOpen, Camera, MessageSquare, ArrowRight } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import Breadcrumb from '../components/Breadcrumb';

// Dynamic icon mapping helper
const iconMap = {
  Cpu: Cpu,
  Code2: Code2,
  Globe: Globe,
  Brain: Brain,
  CheckSquare: CheckSquare,
  Briefcase: Briefcase,
  Heart: Heart,
  Compass: Compass,
  BookOpen: BookOpen,
  Camera: Camera,
  MessageSquare: MessageSquare
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateSEO({
      title: "Blog Categories",
      description: "Browse all topics and articles cataloged inside My Private Journal."
    });

    async function loadCategories() {
      setLoading(true);
      try {
        const results = await blogApi.getCategories();
        setCategories(results);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={[]} />

      {/* Header */}
      <div className="text-left max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Taxonomy Index</span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white tracking-tight">
          Blog Categories
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Explore my publications by theme. From full-stack programming and artificial intelligence to slower, intentional lifestyle notes and travel stories.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        /* Categories Card Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || MessageSquare;

            return (
              <Link
                key={cat.slug}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 bg-white dark:bg-brand-charcoal rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-left flex flex-col justify-between h-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Explore our detailed writing on {cat.name.toLowerCase()}.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/40">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.count} {cat.count === 1 ? 'article' : 'articles'}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
