import React from 'react';

export function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function PinterestIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <path d="M12 2a10 10 0 0 0-10 10c0 4.27 2.67 7.92 6.46 9.42-.08-.78-.15-1.98.03-2.83.17-.76 1.09-4.63 1.09-4.63s-.28-.56-.28-1.39c0-1.31.76-2.28 1.7-2.28.8 0 1.19.6 1.19 1.32 0 .81-.51 2.01-.78 3.13-.22.94.47 1.71 1.39 1.71 1.67 0 2.96-1.76 2.96-4.3 0-2.25-1.62-3.83-3.93-3.83-2.68 0-4.25 2.01-4.25 4.09 0 .81.31 1.68.7 2.15.08.09.09.18.07.27-.07.31-.24.97-.27 1.1-.04.17-.15.21-.34.12-1.29-.6-2.09-2.48-2.09-4c0-3.25 2.36-6.24 6.81-6.24 3.58 0 6.36 2.55 6.36 5.96 0 3.55-2.24 6.41-5.35 6.41-1.04 0-2.03-.54-2.36-1.18l-.64 2.45c-.23.88-.86 1.99-1.29 2.69.94.29 1.94.45 2.98.45a10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Sleek Minimalist X Logo */}
      <path d="M4 4l11.733 11.667h4.267l-11.733 -11.667z" />
      <path d="M4 20l6.768 -6.708m2.46 -2.441l6.772 -6.851" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
