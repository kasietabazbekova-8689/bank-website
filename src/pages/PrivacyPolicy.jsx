import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seo';
import Breadcrumb from '../components/Breadcrumb';
import { ShieldCheck, Info } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    updateSEO({
      title: "Privacy Policy & Terms",
      description: "Read the Privacy Policy and Terms of Service of My Private Journal."
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Breadcrumb */}
      <Breadcrumb items={[]} />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <ShieldCheck className="w-12 h-12 text-indigo-500" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
          Last Updated: March 1, 2025 • Official legal notice of My Private Journal website.
        </p>
      </div>

      {/* Main text cards */}
      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">

        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>My Private Journal</strong> ("we", "us", "our"). We respect your privacy and are committed to protecting any personal information that you may share with us through our website. This document explains how we collect, store, and process your data.
          </p>
          <p>
            By using our website, subscribing to our weekly newsletter, or commenting on our articles, you agree to the conditions stated inside this policy. If you do not agree, please do not share your contact details.
          </p>
        </section>

        {/* Section 2: Data Collection */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
            2. Data We Collect and How We Use It
          </h2>
          <p>
            We collect data in two ways:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Newsletter Subscriptions & Contact forms:</strong> When you subscribe to our newsletter or fill out our contact form, we collect your name, email address, subject, and message. We only use this data to send you news letters, respond to your specific inquiries, or send you updates. We will never sell or rent your email address to third parties.
            </li>
            <li>
              <strong>Article Commentary:</strong> When you post a comment on an article, we collect your name, email, and the comment text. Your comment is publicly viewable alongside your provided name. Your email address remains private.
            </li>
          </ul>
        </section>

        {/* Section 3: Cookies and Local Storage */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
            3. Cookies and Local Storage
          </h2>
          <p>
            Our website does not use cookies for advertisement tracking. We use modern browser <strong>LocalStorage</strong> to remember and persist your preference for dark/light mode. This is done locally on your machine and is never transmitted to any remote servers.
          </p>
        </section>

        {/* Section 4: Terms of Service */}
        <section id="terms" className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/60 scroll-mt-24">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" />
            Terms of Service
          </h2>
          <p>
            All content published on <strong>My Private Journal</strong> is protected by copyright laws. You are welcome to cite short paragraphs of our articles or share them on social media, provided that you give clear, visible credit and a backlink pointing to the original post on our platform.
          </p>
          <p>
            You may not copy whole articles, sell, or modify any code, designs, illustrations, or texts published on this website without written permission from the blog owner, Alex Johnson.
          </p>
          <p>
            Our mock services (like comments, newsletters, and contact forms) are for demonstration purposes. We do not guarantee server uptime, and we reserve the right to delete comments that contain hate speech, spam, advertisements, or offensive phrasing.
          </p>
        </section>

        {/* Section 5: Future Backend Mappings */}
        <section className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/60">
          <h3 className="font-serif text-base font-bold text-slate-800 dark:text-white mb-2">
            Backend Integrations Notice
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            In compliance with international guidelines, we note that this frontend is fully prepared for future secure integrations with database layers like MongoDB or PostgreSQL and server frameworks such as Express / Node.js. When connected, all user queries and subscriptions will be encrypted and transmitted under HTTPS standards.
          </p>
        </section>

      </div>
    </div>
  );
}
