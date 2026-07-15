import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Archive, ChevronDown, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import Breadcrumb from '../components/Breadcrumb';

export default function ArchivePage() {
  const [archiveMap, setArchiveMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState({});

  useEffect(() => {
    updateSEO({
      title: "Archive Timeline",
      description: "Browse articles published in My Private Journal sorted chronologically by year and month."
    });

    async function loadArchive() {
      setLoading(true);
      try {
        const results = await blogApi.getArchive();
        setArchiveMap(results);

        // Initialize expanded months: Expand all months of the first year by default
        const initialExpanded = {};
        const years = Object.keys(results).sort((a, b) => b - a);
        if (years.length > 0) {
          const latestYear = years[0];
          Object.keys(results[latestYear]).forEach(month => {
            initialExpanded[`${latestYear}-${month}`] = true;
          });
        }
        setExpandedMonths(initialExpanded);
      } catch (err) {
        console.error("Failed to load archive data", err);
      } finally {
        setLoading(false);
      }
    }
    loadArchive();
  }, []);

  const toggleMonth = (year, month) => {
    const key = `${year}-${month}`;
    setExpandedMonths(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const yearsSorted = Object.keys(archiveMap).sort((a, b) => b - a);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[]} />

      {/* Header */}
      <div className="text-left space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-sans">Chronology Logs</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
          Journal Archive
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Walk back through time. A structured overview of our posts indexed by year and month. Tap on a month to inspect matching entries.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : yearsSorted.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No articles in archive.
        </div>
      ) : (
        /* Archive List */
        <div className="space-y-10 text-left">
          {yearsSorted.map(year => {
            const months = archiveMap[year];
            const monthsSorted = Object.keys(months).sort((a, b) => {
              // Convert month names to indices for proper reverse chronological sorting
              const monthsIndex = {
                January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
                July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
              };
              return monthsIndex[b] - monthsIndex[a];
            });

            // Calculate total posts in this year
            const totalYearPosts = Object.values(months).reduce((sum, list) => sum + list.length, 0);

            return (
              <div key={year} className="space-y-6 relative pl-4 sm:pl-6 border-l border-slate-200 dark:border-slate-800">
                {/* Year Marker */}
                <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-brand-charcoal shadow-sm"></div>

                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white leading-none">
                    {year}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {totalYearPosts} {totalYearPosts === 1 ? 'post' : 'posts'}
                  </span>
                </div>

                {/* Months of this Year */}
                <div className="space-y-4">
                  {monthsSorted.map(month => {
                    const postsInMonth = months[month];
                    const isExpanded = expandedMonths[`${year}-${month}`];

                    return (
                      <div key={month} className="bg-white dark:bg-brand-charcoal border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        {/* Month Row Trigger */}
                        <button
                          onClick={() => toggleMonth(year, month)}
                          className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-left focus:outline-none"
                        >
                          <div className="flex items-center gap-3">
                            <CalendarDays className="w-5 h-5 text-indigo-500" />
                            <span className="font-serif font-bold text-slate-800 dark:text-slate-200">
                              {month}
                            </span>
                            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold px-2 py-0.5 rounded-full">
                              {postsInMonth.length} {postsInMonth.length === 1 ? 'post' : 'posts'}
                            </span>
                          </div>
                          <div>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* Expandable Articles List */}
                        {isExpanded && (
                          <div className="border-t border-slate-50 dark:border-slate-800/60 divide-y divide-slate-50 dark:divide-slate-800/40 bg-slate-50/50 dark:bg-brand-charcoal/20">
                            {postsInMonth.map(post => (
                              <div key={post.id} className="p-4 sm:px-6 hover:bg-white dark:hover:bg-brand-charcoal transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
                                  <Link
                                    to={`/article/${post.slug}`}
                                    className="font-sans text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:underline"
                                  >
                                    {post.title}
                                  </Link>
                                  <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 flex-shrink-0">
                                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                                      {post.category}
                                    </span>
                                    <span>
                                      {new Date(post.publishDate).toLocaleDateString('en-US', { day: 'numeric' })} {month.slice(0, 3)}
                                    </span>
                                    <span className="flex items-center gap-1 hidden sm:inline-flex">
                                      <Clock className="w-3 h-3" />
                                      {post.readingTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
