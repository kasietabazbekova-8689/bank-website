import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { blogApi } from '../services/api';
import { updateSEO } from '../utils/seo';
import Breadcrumb from '../components/Breadcrumb';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    updateSEO({
      title: "Contact & Connection",
      description: "Send a message to Alex Johnson or subscribe to the weekly My Private Journal newsletter."
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setSubmitting(true);
    try {
      const response = await blogApi.submitContact({ name, email, subject, message });
      if (response.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      alert(err.message || "Failed to submit message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[]} />

      {/* Header */}
      <div className="text-left max-w-2xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">CONNECT PANEL</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Let's Stay in Touch
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Have an engineering issue, a travel question, or just want to discuss some books? Drop your details in the contact portal below. I usually respond within 48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Form Panel */}
        <div className="md:col-span-7 bg-white dark:bg-brand-charcoal rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 text-left">
          <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white">
            Send a Digital Note
          </h2>

          {success ? (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-3 animate-fadeIn">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-300/90 mt-1">
                  Thank you for writing! Your transmission has successfully bypassed our mock gateway. I'll read it and respond to your inbox shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-3 text-xs font-bold text-emerald-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Inquiry about React Consulting"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows="5"
                  placeholder="Write your thoughts here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <span>{submitting ? 'Sending...' : 'Transmit Message'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info Panel */}
        <div className="md:col-span-5 space-y-6 text-left">

          {/* Contact Cards */}
          <div className="bg-white dark:bg-brand-charcoal border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800/60">
              Information
            </h3>

            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-semibold text-slate-400 uppercase">EMAIL ADDRESS</span>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 block truncate">
                    hello@myprivatejournal.com
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-semibold text-slate-400 uppercase">CONTACT PHONE</span>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 block">
                    +1 (415) 555-0199
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-semibold text-slate-400 uppercase">OFFICE HEADQUARTERS</span>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 block">
                    San Francisco, California, USA
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="bg-white dark:bg-brand-charcoal border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800/60">
              Social Connections
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              I post design snippets and work updates regularly on social feeds. Let's engage!
            </p>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="GitHub">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="LinkedIn">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
