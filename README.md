# My Private Journal

A premium, elegant, fully responsive, personal blog and digital reading experience built using modern frontend technologies. Designed with generous whitespace, elegant serif typography, subtle transitions, and persistent dark mode.

Website Name: **My Private Journal**

---

## 🚀 Live Preview & Features

This personal journal is engineered to deliver a clean, minimalist, high-end reading flow.

### Core Features:
- **Responsive Layouts**: Fully mobile-friendly sticky header, Hamburger menu, and a slide-out smooth navigation drawer.
- **Dynamic Dark Mode**: Persistent theme selection preserved inside the user's `LocalStorage`.
- **Search System**: Live search queries processing matches across article titles, full content, categories, and tags.
- **Taxonomy Filtering**: Fully operational Category and Tag filter page trees.
- **Archive Timeline**: Interactive, cascading accordion timelines organized by Year and Month showing active publication counts.
- **Single Article Layout**:
  - **Reading Progress Bar**: Visual scroll tracking indicator at the top of the reading frame.
  - **Table of Contents**: Dynamically parsed from article headings allowing click-to-scroll smooth viewport jumps.
  - **Rich Typography & Prose**: Support for lists, headings, code blocks, images, and pull quotes.
  - **Social Sharing**: Standard mock share buttons supporting clipboard copy confirmations.
  - **Commentary Section**: Fully functional comment box allowing real-time commentary previews.
- **Interactive Forms**: Contact form with visual success responses, and a newsletter join-in form.

---

## 🛠️ Technology Stack

- **React** (v19) - Component architecture and virtual DOM.
- **Vite** (v8) - Lightning-fast ESM dev server and build packager.
- **Tailwind CSS** (v4) - Ultra-optimized, CSS-first modern utility layout framework.
- **React Router** (v7) - Seamless dynamic routing and scroll restoration.
- **Lucide Icons** - High-quality, modern, and accessible interface icons.
- **JavaScript** - ES6+ programming logic.

---

## 📂 Folder Structure

The project has been carefully organized to support clean, modular React component patterns:

```text
src/
├── assets/          # Static branding resources and vectors
├── components/      # Reusable UI widgets
│   ├── ArticleCard.jsx
│   ├── AuthorCard.jsx
│   ├── Breadcrumb.jsx
│   ├── CommentSection.jsx
│   ├── EmptyState.jsx
│   ├── FeaturedArticle.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Newsletter.jsx
│   ├── Pagination.jsx
│   ├── ScrollToTop.jsx
│   ├── SearchBar.jsx
│   ├── Sidebar.jsx
│   ├── SocialIcons.jsx
│   └── ThemeToggle.jsx
├── context/         # Global state context
│   └── ThemeContext.jsx
├── data/            # 25 realistic mock blog articles
│   └── posts.js
├── layouts/         # Page shell wrappers
│   └── RootLayout.jsx
├── pages/           # Dynamic view screens
│   ├── Home.jsx
│   ├── Blog.jsx
│   ├── About.jsx
│   ├── Archive.jsx
│   ├── Categories.jsx
│   ├── Contact.jsx
│   ├── NotFound.jsx
│   ├── PrivacyPolicy.jsx
│   ├── SearchResults.jsx
│   └── SingleArticle.jsx
├── services/        # Mock REST API endpoints & latency loops
│   └── api.js
├── utils/           # SEO dynamic metadata scripts
│   └── seo.js
├── App.jsx          # Route mappings and context injections
├── index.css        # Global CSS, fonts, and prose styles
└── main.jsx         # React DOM engine mounting
```

---

## 💡 Future Backend Integration

The frontend has been prepared with modular, asynchronous mock service structures inside `src/services/api.js`. These mock methods return structured JS `Promises` and simulate network latencies:

- **Node.js & Express**: API endpoints can easily map to `/api/posts`, `/api/posts/:slug`, and `/api/subscribe` routes.
- **PostgreSQL / MongoDB**: Post records match relational or document structures, storing titles, categories, tags arrays, content strings, and authors.
- **Headless CMS**: Easily substitute `blogApi` queries with fetch payloads pointing to Strapi, Contentful, or Sanity.

---

## ⚙️ Development & Production Build

### Install dependencies:
```bash
npm install
```

### Run the development server:
```bash
npm run dev
```

### Compile production bundle:
```bash
npm run build
```
The build process leverages Tailwind CSS v4 and output compilation optimizations, producing highly optimized static bundles under 500ms.
