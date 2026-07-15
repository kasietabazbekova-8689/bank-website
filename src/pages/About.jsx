import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seo';
import Breadcrumb from '../components/Breadcrumb';
import { Sparkles, Terminal, Compass, BookOpen, Brain, Briefcase, Camera, Award, Code2 } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';

export default function About() {
  useEffect(() => {
    updateSEO({
      title: "Who I Am & My Journey",
      description: "Get to know Alex Johnson, the creator of My Private Journal. Read about his background, journey, topics of interest, and core skills."
    });
  }, []);

  const topics = [
    {
      icon: Terminal,
      title: "Technology & Coding",
      desc: "Deep-dives into JavaScript, React ecosystem updates, CSS architecture, and robust automated build systems."
    },
    {
      icon: Brain,
      title: "Productivity & AI",
      desc: "Practical note-taking frameworks (like PARA/CODE), self-improvement books, and leveraging LLMs as programming companions."
    },
    {
      icon: Compass,
      title: "Slow Travel & Diaries",
      desc: "Visual travel diaries, cultural highlights from cities like Kyoto and Bergen, and solo backpacking safety principles."
    }
  ];

  const skills = [
    { icon: Code2, label: "Frontend Architecture" },
    { icon: Sparkles, label: "UI / UX Design Systems" },
    { icon: Briefcase, label: "Product Engineering" },
    { icon: Camera, label: "Travel Photography" },
    { icon: BookOpen, label: "Technical Writing" },
    { icon: Award, label: "Accessibility Specialist" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[]} />

      {/* Header Bio Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
        <div className="md:col-span-4 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 opacity-30 blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80"
              alt="Alex Johnson"
              className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-xl"
            />
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CREATOR PROFILE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            Hi, I'm Alex Johnson.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            I am a lead frontend engineer, landscape photographer, and self-taught writer. Based in beautiful San Francisco, I spend my days designing intuitive user interfaces and compiling my thoughts in this private journal.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Writing helps me slow down, deconstruct my learning parameters, and share knowledge that I hope will prove useful to developers and creators around the globe.
          </p>

          <div className="flex gap-4 pt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="GitHub">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="Twitter">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 text-slate-500 hover:text-white dark:text-slate-400 dark:hover:text-white rounded-xl transition-all" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* My Journey Section */}
      <section className="bg-white dark:bg-brand-charcoal rounded-2xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 text-left space-y-4 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white">
          My Journey
        </h2>
        <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 space-y-4">
          <p>
            My Private Journal began in late 2022 as an offline folder of markdown text files. I was experiencing information overload: reading hundreds of development articles, bookmarking infinite resource lists, and forgetting almost all of them.
          </p>
          <p>
            I decided to build a 'Second Brain'—a structured repository where I didn't just bookmark content, but actually summarized it, wrote code extensions, and published lessons from my mistakes. Moving these files into a public-facing blog was the natural next step. It pushed me to improve my communication, write clean code examples, and build an intentional community of fellow learners.
          </p>
        </div>
      </section>

      {/* Topics I Write About */}
      <section className="space-y-6 text-left">
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800/60 pb-3">
          Topics I Write About
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div key={idx} className="p-6 bg-white dark:bg-brand-charcoal rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3 transition-all hover:shadow">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills & Interests Section */}
      <section className="space-y-6 text-left">
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800/60 pb-3">
          Skills & Core Focuses
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {skills.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/80 text-center flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white hover:dark:bg-slate-850">
                <Icon className="w-6 h-6 text-indigo-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
