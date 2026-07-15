import React, { useState } from 'react';
import { MessageSquare, Calendar, User, Send, CheckCircle2 } from 'lucide-react';

export default function CommentSection({ initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !content) return;

    setSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        name,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80", // default user avatar
        date: new Date().toISOString().split('T')[0],
        content
      };

      setComments([newComment, ...comments]);
      setName('');
      setEmail('');
      setContent('');
      setSubmitting(false);
      setSuccess(true);

      // Clear success notification after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-4">
        <h4 className="font-serif text-base font-bold text-slate-800 dark:text-white">
          Join the conversation
        </h4>

        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 flex gap-2 items-start animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
            <div className="text-xs font-medium">
              Comment posted! Your message is currently in moderation and has been rendered locally for preview.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-charcoal text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-charcoal text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Message *
            </label>
            <textarea
              id="content"
              required
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What are your thoughts on this article?"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-charcoal text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow"
          >
            <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-brand-charcoal border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-800 flex-shrink-0"
              />
              <div className="space-y-2 min-w-0 flex-grow">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-slate-800 dark:text-white">
                    {comment.name}
                  </h5>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(comment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
