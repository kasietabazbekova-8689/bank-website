// Mock data for "My Private Journal"
// Contains 25 high-quality, realistic articles spanning 11 categories

export const AUTHORS = {
  alex: {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Lead software engineer and travel enthusiast. Passionate about web standards, clean code, and exploring the world through a camera lens."
  },
  sarah: {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "AI researcher, avid reader, and productivity hacker. Sarah loves demystifying complex technical topics and sharing tips for high-performance living."
  },
  marcus: {
    name: "Marcus Aurelius",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Writer, philosopher, and design specialist. Marcus writes about the human aspect of technology, minimalism, and personal growth."
  }
};

export const CATEGORIES = [
  { name: "Technology", slug: "technology", count: 3, icon: "Cpu" },
  { name: "Programming", slug: "programming", count: 2, icon: "Code2" },
  { name: "Web Development", slug: "web-development", count: 3, icon: "Globe" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", count: 2, icon: "Brain" },
  { name: "Productivity", slug: "productivity", count: 2, icon: "CheckSquare" },
  { name: "Business", slug: "business", count: 2, icon: "Briefcase" },
  { name: "Lifestyle", slug: "lifestyle", count: 2, icon: "Heart" },
  { name: "Travel", slug: "travel", count: 2, icon: "Compass" },
  { name: "Books", slug: "books", count: 2, icon: "BookOpen" },
  { name: "Photography", slug: "photography", count: 2, icon: "Camera" },
  { name: "Personal Thoughts", slug: "personal-thoughts", count: 3, icon: "MessageSquare" }
];

export const MOCK_POSTS = [
  {
    id: 1,
    title: "The Future of React: What to Expect in the Next Era",
    slug: "the-future-of-react-next-era",
    category: "Technology",
    tags: ["React", "JavaScript", "Frontend"],
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Explore the highly anticipated updates in React, from native compiler optimizations to enhanced server component models.",
    fullContent: `
<h2>The Evolution of Modern UI Development</h2>
<p>React has remained the cornerstone of web development for over a decade. As we look into the future, the ecosystem is shifting toward zero-runtime overhead, automated optimizations, and deeply integrated full-stack architectures. These updates aim to address long-standing developer pain points like manual performance tuning and state-hydration lag.</p>

<blockquote>"The best code is no code, and the next best code is code that is optimized automatically for you." - Frontend Philosophy</blockquote>

<h3>Introducing the React Compiler (React Forget)</h3>
<p>For years, developers have manually optimized renders using hooks like <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code>. The upcoming compiler automates this entire cycle. It analyzes your dependency graph and memoizes elements at the compiler level, delivering optimal rendering speed without manual intervention.</p>

<pre><code>// Before: Manual optimization
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// After: The compiler handles memoization under the hood automatically!
const value = computeExpensiveValue(a, b);</code></pre>

<h3>The Convergence of Client and Server</h3>
<p>React Server Components (RSC) are changing how we construct page hierarchies. By executing component logic on the server, we drastically reduce the client-side JavaScript bundle, resulting in instantaneous page transitions and better search engine rankings.</p>

<p>In conclusion, the future of React is not just about doing more, but about writing less and letting the tooling make our sites blazing-fast by default.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2025-02-28",
    readingTime: "5 min read",
    views: 1240,
    comments: [
      { id: 1, name: "Jessica Smith", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80", date: "2025-03-01", content: "Super excited for React Compiler! Manually managing useMemo was getting tedious." },
      { id: 2, name: "David Miller", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80", date: "2025-03-02", content: "Great summary of Server Components. I hope the ecosystem adopts it fully." }
    ],
    featured: true
  },
  {
    id: 2,
    title: "Vite 6 and Beyond: Accelerating Your Web Dev Bundles",
    slug: "vite-6-accelerating-web-dev",
    category: "Technology",
    tags: ["Vite", "Build Tools", "Performance"],
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover how Vite 6 leverages rust-based tooling, environmental configurations, and enhanced HMR to make builds faster than ever.",
    fullContent: `
<h2>Why Build Speeds Matter More Than Ever</h2>
<p>In the fast-paced landscape of frontend development, feedback loops determine productivity. If your Hot Module Replacement (HMR) takes three seconds, you lose focus. Vite 6 addresses this by refining module resolution and introducing specialized plugin pipelines.</p>

<blockquote>"Speed is the ultimate feature. It determines whether you enter a flow state or get distracted by your phone."</blockquote>

<h3>Environment API Updates</h3>
<p>Vite 6 introduces a fully customized Environment API. This allows developers to run client, server, and edge environments simultaneously within the same dev server session. This means your Server Side Rendering (SSR) pipeline and client code stay in perfect sync.</p>

<pre><code>// Example Vite config showing the Environment API pattern
export default {
  environments: {
    client: {
      resolve: { alias: { '@': '/src' } }
    },
    ssr: {
      resolve: { external: ['react-dom/server'] }
    }
  }
}</code></pre>

<p>With lightning-fast build times, Vite continues to dominate the builder ecosystem, proving that ESM-first is indeed the future of modern frontend compilation.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2025-02-20",
    readingTime: "4 min read",
    views: 950,
    comments: [
      { id: 1, name: "Robert Downey", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80", date: "2025-02-21", content: "Vite has completely changed my day-to-day coding. Highly recommended!" }
    ],
    featured: true
  },
  {
    id: 3,
    title: "Mastering Tailwind v4: A Deep Dive into CSS-First Layouts",
    slug: "mastering-tailwind-v4",
    category: "Web Development",
    tags: ["Tailwind", "CSS", "Design"],
    featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Learn the brand new CSS-first design system of Tailwind v4, including custom `@theme` variables, zero-config compilation, and dynamic utility APIs.",
    fullContent: `
<h2>The Renaissance of CSS-First Tailwind</h2>
<p>Tailwind v4 is here, and it represents a massive paradigm shift. Instead of a bulky <code>tailwind.config.js</code> written in JavaScript, Tailwind is now fully configured in CSS. It reads your style rules directly, yielding faster builds and native browser compatibility.</p>

<blockquote>"Tailwind v4 merges the best of utility CSS with the upcoming features of CSS Nesting and Custom Properties."</blockquote>

<h3>The Beautiful @theme Directive</h3>
<p>Instead of editing a JS object, you can customize your design system using standard CSS syntax. This makes your custom values accessible to CSS variables naturally!</p>

<pre><code>@import "tailwindcss";

@theme {
  --color-brand-accent: #4F46E5;
  --font-serif: "Lora", Georgia, serif;
}</code></pre>

<h3>Zero-Config Compilation</h3>
<p>The compiler is now fully written in Rust, leading to build speeds that are up to 10x faster. You no longer need PostCSS config or complex script wrappers to get your production bundle optimized.</p>

<p>Tailwind v4 is a triumph of design tooling, showing that CSS remains the supreme language of visual expression on the Web.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2025-02-15",
    readingTime: "6 min read",
    views: 1820,
    comments: [],
    featured: true
  },
  {
    id: 4,
    title: "Understanding Javascript Closures: Once and for All",
    slug: "understanding-javascript-closures",
    category: "Programming",
    tags: ["JavaScript", "Programming", "Interview"],
    featuredImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Demystify lexical scoping, execution contexts, and closures. Master this essential concept to write memory-efficient JavaScript.",
    fullContent: `
<h2>Closures: The Secret Weapon of Javascript</h2>
<p>Many developers use closures every day without realizing it. A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has returned.</p>

<blockquote>"Functions are values, and they remember the environment they were created in."</blockquote>

<h3>A Classic Example</h3>
<p>Let's look at a counter function to see closures in action:</p>

<pre><code>function createCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
</code></pre>

<p>Notice how the variable <code>count</code> is completely encapsulated. No outside code can touch it. This represents a powerful pattern for object state protection and variable isolation.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2025-02-10",
    readingTime: "5 min read",
    views: 2200,
    comments: [
      { id: 1, name: "Emily Green", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80", date: "2025-02-11", content: "This is the most straightforward explanation of closures I've ever read!" }
    ],
    featured: true
  },
  {
    id: 5,
    title: "A Comprehensive Guide to Web Accessibility (a11y)",
    slug: "guide-web-accessibility-a11y",
    category: "Web Development",
    tags: ["Accessibility", "a11y", "HTML"],
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Make your web applications accessible to everyone. Learn about screen readers, keyboard focus states, semantic HTML, and ARIA attributes.",
    fullContent: `
<h2>Why Accessibility is Non-Negotiable</h2>
<p>Web accessibility, commonly referred to as <strong>a11y</strong>, is about ensuring that anyone, regardless of permanent or situational impairments, can access and interact with your website. Creating an accessible site is not just a nice-to-have; it's a fundamental human right and a legal necessity in many jurisdictions.</p>

<blockquote>"Accessibility is not a feature list, it's a design mindset."</blockquote>

<h3>Semantic HTML Over Complex divs</h3>
<p>One of the easiest ways to improve accessibility is to use native, semantic HTML elements. A <code>&lt;button&gt;</code> has keyboard event handlers, focus indicators, and screen reader announcements built in. A <code>&lt;div&gt;</code> with an onClick handler does not.</p>

<pre><code><!-- Bad Practice -->
<div onclick="submitForm()" class="btn">Submit</div>

<!-- Good Practice -->
<button type="submit" onclick="submitForm()" class="btn">Submit</button></code></pre>

<h3>Focus States & Keyboard Navigation</h3>
<p>Never style away the focus outline (<code>outline: none</code>) without providing a clear, visually distinct alternative focus ring. People navigating using keyboard tabs depend entirely on this visual indicator to understand where they are on the screen.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2025-02-05",
    readingTime: "7 min read",
    views: 740,
    comments: [],
    featured: true
  },
  {
    id: 6,
    title: "Introduction to Large Language Models: How They Work",
    slug: "introduction-to-large-language-models",
    category: "Artificial Intelligence",
    tags: ["AI", "LLM", "Machine Learning"],
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Demystify transformers, tokenization, neural networks, and prompt response generation to understand the foundation of AI.",
    fullContent: `
<h2>Understanding the AI Revolution</h2>
<p>Large Language Models (LLMs) like GPT-4, Claude, and Llama have taken the tech world by storm. But how do they actually predict text? In simple terms, LLMs are statistical calculators trained on massive volumes of written text to predict the next token (word fragment) based on all preceding words.</p>

<blockquote>"LLMs do not think in the biological sense; they calculate statistical paths of highest probability."</blockquote>

<h3>The Magic of Transformers</h3>
<p>The core architecture behind all modern LLMs is the <strong>Transformer network</strong>, introduced in the landmark 2017 paper "Attention Is All You Need". The key component is "self-attention", which allows the model to analyze how words in a sentence relate to each other, regardless of their distance.</p>

<p>For example, in the sentence: <em>"The bank of the river had beautiful green moss,"</em> the model knows "bank" refers to the edge of water, not a financial repository, because the attention mechanism connects "bank" to "river" and "moss".</p>

<h3>What's Next?</h3>
<p>We are entering the age of agents. Models are no longer passive prompt-receivers; they can execute shell commands, perform calculations, write and debug code, and interact with web browsers to complete intricate pipelines autonomously.</p>
    `,
    author: AUTHORS.sarah,
    publishDate: "2025-01-28",
    readingTime: "8 min read",
    views: 3100,
    comments: [
      { id: 1, name: "Alice Kim", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80", date: "2025-01-29", content: "Great explanation of self-attention. It's the secret sauce of NLP." }
    ],
    featured: true
  },
  {
    id: 7,
    title: "Building a Second Brain: Organize Your Digital Life",
    slug: "building-a-second-brain",
    category: "Productivity",
    tags: ["Productivity", "Notes", "Organization"],
    featuredImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Stop forgetting your best ideas. Learn the PARA method (Projects, Areas, Resources, Archives) to capture, organize, and retrieve information.",
    fullContent: `
<h2>The Problem: Information Overload</h2>
<p>We consume more information in a single day than our ancestors did in an entire lifetime. Yet, when we need a crucial quote, a coding snippet, or a travel recommendation, we cannot find it. Building a "Second Brain" is a systematic methodology to store and organize information outside our heads so we can focus on creative processing.</p>

<blockquote>"Your mind is for having ideas, not holding them." - David Allen</blockquote>

<h3>The CODE Method</h3>
<p>There are four core steps to building a robust note-taking and knowledge engine:</p>
<ol>
  <li><strong>Capture</strong>: Collect the insights, quotes, and files that resonate with you instantly in a central inbox.</li>
  <li><strong>Organize</strong>: Use the PARA system to classify folders by actionability (Projects, Areas, Resources, Archives).</li>
  <li><strong>Distill</strong>: Highlight and summarize the most important core themes.</li>
  <li><strong>Express</strong>: Create your own output (blogs, projects, decisions) based on accumulated knowledge.</li>
</ol>

<p>By implementing this feedback loop, you turn passive reading into active, creative assets.</p>
    `,
    author: AUTHORS.sarah,
    publishDate: "2025-01-22",
    readingTime: "5 min read",
    views: 1450,
    comments: [],
    featured: false
  },
  {
    id: 8,
    title: "Starting a Solopreneur Journey: Bootstrapping in 2025",
    slug: "solopreneur-journey-bootstrapping",
    category: "Business",
    tags: ["Business", "Solopreneur", "SaaS"],
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Learn how to build profitable micro-SaaS and content business platforms as a single founder without venture funding.",
    fullContent: `
<h2>The Rise of the One-Person Unicorn</h2>
<p>With artificial intelligence accelerating code production, design, and marketing, a single individual can now build and run platforms that previously required a team of ten. Bootstrapping (self-funding) gives you complete creative freedom, immediate path to profitability, and zero investor pressure.</p>

<blockquote>"It is better to build a profitable business with 100 passionate customers than a massive venture-backed money sink with millions of casual visitors."</blockquote>

<h3>Valuable Lessons for Starters</h3>
<p>1. <strong>Solve your own problem</strong>: It is much easier to evaluate if a product works when you are the core customer.</p>
<p>2. <strong>Build in public</strong>: Share your struggles, metrics, and milestones on social media. People buy from humans, not faceless corporations.</p>
<p>3. <strong>Charge early</strong>: Never offer a completely free plan without checking if users are willing to pay. Validation is measured in money, not email signups.</p>
    `,
    author: AUTHORS.marcus,
    publishDate: "2025-01-15",
    readingTime: "6 min read",
    views: 1100,
    comments: [],
    featured: false
  },
  {
    id: 9,
    title: "Minimalism as a Way of Life: Finding Joy in Less",
    slug: "minimalism-way-of-life",
    category: "Lifestyle",
    tags: ["Minimalism", "Lifestyle", "Mindfulness"],
    featuredImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Declutter your mind and home. Learn how choosing fewer physical possessions can lead to profound emotional freedom and mental focus.",
    fullContent: `
<h2>The Clutter of Modern Existence</h2>
<p>We live in a world designed to make us want more. More clothes, more gadgets, more subscriptions, more storage. However, physical items require mental overhead: we have to clean them, organize them, secure them, and pay for their maintenance.</p>

<blockquote>"Simplicity is the ultimate sophistication." - Leonardo da Vinci</blockquote>

<p>Minimalism isn't about living in a sterile white box with three plates; it's about making conscious space for things that bring genuine value and joy, while gracefully discarding the rest.</p>

<h3>Practical Steps to Begin</h3>
<ul>
  <li><strong>The 90/90 Rule</strong>: Have you used this item in the last 90 days? Will you use it in the next 90? If not, let it go.</li>
  <li><strong>Digital Declutter</strong>: Unsubscribe from newsletters you don't read, archive desktop folders, and limit active social media apps.</li>
</ul>
    `,
    author: AUTHORS.marcus,
    publishDate: "2025-01-08",
    readingTime: "4 min read",
    views: 890,
    comments: [],
    featured: false
  },
  {
    id: 10,
    title: "A Weekend in Kyoto: Exploring Old Japan",
    slug: "weekend-in-kyoto-old-japan",
    category: "Travel",
    tags: ["Travel", "Japan", "Kyoto"],
    featuredImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Walk through whispering bamboo groves, ancient shrines, and hidden tea houses. Discover the perfect 48-hour Kyoto travel guide.",
    fullContent: `
<h2>The Cultural Heart of Japan</h2>
<p>Kyoto, the former imperial capital of Japan, is a city where time feels beautifully suspended. Unlike Tokyo's flashing neon lights and skyscrapers, Kyoto offers wooden machiya townhouses, stone-paved streets, and Zen gardens.</p>

<blockquote>"Kyoto is a reminder that beauty requires patience, preservation, and deep silence."</blockquote>

<h3>Must-Visit Sites</h3>
<p>1. <strong>Fushimi Inari-Taisha</strong>: Hike up the mountain passing through thousands of vibrant orange Torii gates. The best time is early morning (6:30 AM) to avoid tourist crowds.</p>
<p>2. <strong>Arashiyama Bamboo Grove</strong>: Stand amidst the towering green stalks and listen to the wind rustling through the leaves.</p>
<p>3. <strong>Gion District</strong>: If you're lucky, you might catch a fleeting glimpse of a geisha walking swiftly to an evening tea banquet.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2025-01-02",
    readingTime: "6 min read",
    views: 1670,
    comments: [
      { id: 1, name: "Satoshi Nakamoto", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80", date: "2025-01-03", content: "Kyoto is beautiful! Make sure to try the local matcha ice cream next time." }
    ],
    featured: false
  },
  {
    id: 11,
    title: "5 Books That Changed My Life: A Reading Retrospective",
    slug: "five-books-changed-my-life",
    category: "Books",
    tags: ["Books", "Self-Help", "Philosophy"],
    featuredImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    excerpt: "From stoic insights to practical behavior design, explore the five books that heavily shaped my mindset, habits, and career path.",
    fullContent: `
<h2>Reading as active conversation</h2>
<p>Books allow us to borrow another person's brain for a fraction of the cost and time it took them to live those experiences. Here are five books that completely altered my life trajectory:</p>

<h3>1. Meditations by Marcus Aurelius</h3>
<p>The private journal of the Roman emperor, reminding us that we control our thoughts, not external events. A masterclass in mental resilience.</p>

<h3>2. Atomic Habits by James Clear</h3>
<p>A highly practical guide explaining that self-improvement comes from tiny, 1% daily progress rather than massive, unsustainable overhauls.</p>

<h3>3. Man's Search for Meaning by Viktor Frankl</h3>
<p>A moving account of surviving concentration camps and the thesis that human meaning is derived from choosing our attitude in any given circumstance.</p>
    `,
    author: AUTHORS.marcus,
    publishDate: "2024-12-25",
    readingTime: "5 min read",
    views: 2040,
    comments: [],
    featured: false
  },
  {
    id: 12,
    title: "Mastering Street Photography: Capture the Decisive Moment",
    slug: "mastering-street-photography",
    category: "Photography",
    tags: ["Photography", "Art", "Street"],
    featuredImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Learn how to find beautiful lighting, frame human elements, and conquer your fear of taking photos of strangers in public.",
    fullContent: `
<h2>The Art of the Candid Snap</h2>
<p>Street photography is a beautiful discipline because it documents real, unfiltered human history. You don't need expensive cameras or massive telephoto lenses. In fact, a small, unobtrusive prime-lens camera is far better.</p>

<blockquote>"To take a photograph is to align the head, the eye and the heart. It is a way of life." - Henri Cartier-Bresson</blockquote>

<h3>Conquering the Fear</h3>
<p>The biggest barrier for beginner street photographers is fear. The fear of confrontation or making people uncomfortable. Start by looking for geometric shapes, interesting pools of light, and waiting for an interesting shadow or person to walk directly into your pre-composed frame.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2024-12-18",
    readingTime: "5 min read",
    views: 920,
    comments: [],
    featured: false
  },
  {
    id: 13,
    title: "What I Learned from 10 Years of Coding",
    slug: "ten-years-coding-lessons",
    category: "Personal Thoughts",
    tags: ["Career", "Programming", "Reflections"],
    featuredImage: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Ten principles about software engineering, system design, developer relations, and the importance of soft skills over raw syntax knowledge.",
    fullContent: `
<h2>Reflecting on a Decade of Code</h2>
<p>A decade ago, I pushed my first broken lines of CSS to production. Since then, I have built web apps used by millions, broke databases, worked in startups, and designed frameworks. Here are my top findings:</p>

<blockquote>"Programming is not about typing syntax; it is about managing system complexity and communication."</blockquote>

<h3>1. Simple Code is Harder but Better</h3>
<p>Amateur programmers write complex code to show off. Senior programmers write simple, straightforward code because they know they have to debug it at 3:00 AM on a Sunday.</p>

<h3>2. People Skills Outweigh Coding Skills</h3>
<p>You can be the most brilliant developer in the world, but if you cannot explain your technical ideas to business stakeholders or work harmoniously with a team, your growth will be capped.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2024-12-10",
    readingTime: "7 min read",
    views: 3400,
    comments: [
      { id: 1, name: "Chris Evans", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80", date: "2024-12-11", content: "So accurate. Simple code is indeed a superpower." }
    ],
    featured: false
  },
  {
    id: 14,
    title: "Prompt Engineering Techniques for Developer Efficiency",
    slug: "prompt-engineering-developer-efficiency",
    category: "Artificial Intelligence",
    tags: ["AI", "Programming", "Productivity"],
    featuredImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Learn how to prompt LLMs correctly to write robust tests, translate codebases, generate regex, and quickly discover API structures.",
    fullContent: `
<h2>Leveraging AI as a Coding Companion</h2>
<p>Generative AI tools aren't here to replace programmers; they are here to amplify them. A programmer who knows how to prompt LLMs effectively is like a developer with a 24/7 hyper-intelligent junior assistant.</p>

<h3>The 'Few-Shot' Prompting Technique</h3>
<p>Instead of just asking for a response, provide the AI with 1 or 2 examples of input-output pairs. This grounds the model and helps it mimic your specific coding conventions and formatting.</p>

<pre><code>// Example format
Given this input JSON: { "usr": "12" } -> Output format: { "userId": 12 }
Given this input JSON: { "usr": "99" } -> Output format: { "userId": 99 }</code></pre>

<p>By giving clear constraints and structures, you can generate incredibly reliable utility modules and test scripts instantly.</p>
    `,
    author: AUTHORS.sarah,
    publishDate: "2024-11-28",
    readingTime: "6 min read",
    views: 1150,
    comments: [],
    featured: false
  },
  {
    id: 15,
    title: "Deep Work in a Distracted World: A Practical Framework",
    slug: "deep-work-practical-framework",
    category: "Productivity",
    tags: ["Productivity", "Focus", "Mindfulness"],
    featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    excerpt: "How to carve out hours of uninterrupted focus, train your cognitive stamina, and eliminate toxic digital distractions.",
    fullContent: `
<h2>The Scarcity of Deep Attention</h2>
<p>We live in an attention economy. Social media feeds, Slack messages, and push notifications are actively engineered to fracture our focus. Yet, the ability to concentrate deeply on difficult concepts is one of the most valuable cognitive assets in our modern workforce.</p>

<blockquote>"Deep work is the ability to focus without distraction on a cognitively demanding task." - Cal Newport</blockquote>

<h3>The Rules of Deep Work</h3>
<p>1. <strong>Schedule your blocks</strong>: Attention is finite. Decide the day before exactly when you will enter your deep focus zone (e.g., 8:00 AM - 10:30 AM).</p>
<p>2. <strong>Disable all inputs</strong>: Close your email client, put your phone in another room, and let your team know you are 'deep-focusing'.</p>
<p>3. <strong>Define clear exit criteria</strong>: Know exactly what you are trying to output during this block, so you don't drift aimlessly.</p>
    `,
    author: AUTHORS.sarah,
    publishDate: "2024-11-15",
    readingTime: "5 min read",
    views: 1590,
    comments: [],
    featured: false
  },
  {
    id: 16,
    title: "How to Build a Powerful Personal Brand as a Developer",
    slug: "build-personal-brand-developer",
    category: "Business",
    tags: ["Business", "Career", "Writing"],
    featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Stop relying solely on resumes. Learn how writing a personal blog, sharing on Twitter/GitHub, and speaking opens doors to remote dream roles.",
    fullContent: `
<h2>The Developer's Unfair Advantage</h2>
<p>If two developers have the exact same level of technical knowledge, but one regularly shares their findings via articles, open source packages, and video essays, who do you think gets the premium contract or the high-level remote role?</p>

<blockquote>"Your brand is what people say about you when you're not in the room."</blockquote>

<p>Creating a developer brand doesn't mean becoming an influencer; it means documenting your learning path in public. Write about a tricky bug you solved, build small utilities on GitHub, and publish your findings. This builds authority and acts as a passive job generation engine.</p>
    `,
    author: AUTHORS.marcus,
    publishDate: "2024-11-05",
    readingTime: "6 min read",
    views: 1320,
    comments: [],
    featured: false
  },
  {
    id: 17,
    title: "The Power of Atomic Habits: Book Review & Implementation",
    slug: "atomic-habits-review-implementation",
    category: "Books",
    tags: ["Books", "Self-Help", "Habits"],
    featuredImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    excerpt: "A deep dive into James Clear's habit loop model. See how identity-driven habits and environmental design trigger exponential results.",
    fullContent: `
<h2>Tiny Habits, Massive Trajectories</h2>
<p>James Clear explains that we do not rise to the level of our goals; we fall to the level of our systems. A goal is a singular endpoint, whereas a system is a continuous daily pattern of actions.</p>

<h3>The Four Laws of Behavior Change</h3>
<ol>
  <li><strong>Make it obvious</strong>: Put your coding textbook on your pillow so you see it immediately.</li>
  <li><strong>Make it attractive</strong>: Pair a habit you need to do with a habit you want to do (e.g., listening to a podcast while folding clothes).</li>
  <li><strong>Make it easy</strong>: Scale your new habit down to 2 minutes or less (e.g., 'open my code editor' instead of 'write 100 lines of code').</li>
  <li><strong>Make it satisfying</strong>: Reward yourself instantly upon completing the routine.</li>
</ol>
    `,
    author: AUTHORS.marcus,
    publishDate: "2024-10-25",
    readingTime: "5 min read",
    views: 1890,
    comments: [],
    featured: false
  },
  {
    id: 18,
    title: "Solo Travel Safety Tips: Wander Wisely and Safely",
    slug: "solo-travel-safety-tips",
    category: "Travel",
    tags: ["Travel", "Safety", "Solo"],
    featuredImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Everything you need to navigate solo travels safely, from electronic passport backups to managing local navigation offline.",
    fullContent: `
<h2>The Liberation of Traveling Solo</h2>
<p>Solo traveling is one of the most rewarding challenges you can set for yourself. It forces you to rely entirely on your own wits, talk to people outside your circle, and plan schedules based solely on your own desires.</p>

<h3>Practical Safety Principles</h3>
<ul>
  <li><strong>Digital Safeguards</strong>: Upload copies of your passport, medical insurance, and hotel vouchers to an encrypted cloud folder accessible offline.</li>
  <li><strong>Emergency Cash</strong>: Keep emergency currency tucked inside separate areas of your gear, not just in your main wallet.</li>
  <li><strong>Stay Connected</strong>: Buy a local eSIM before you land, ensuring you have constant access to maps and translation software.</li>
</ul>
    `,
    author: AUTHORS.alex,
    publishDate: "2024-10-10",
    readingTime: "5 min read",
    views: 1100,
    comments: [],
    featured: false
  },
  {
    id: 19,
    title: "Mastering Mobile Photography: Pro Results with Your Phone",
    slug: "mastering-mobile-photography",
    category: "Photography",
    tags: ["Photography", "Mobile", "Editing"],
    featuredImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    excerpt: "No DSLR needed. Learn how exposure locks, grid compositions, leading lines, and subtle mobile lightroom presets yield high-end shots.",
    fullContent: `
<h2>The Camera You Have With You</h2>
<p>Chase Jarvis famously said, <em>"The best camera is the one that's with you."</em> Today's smartphone cameras feature dynamic ranges and sensor processing that rival old-school mirrorless cameras. All you need is proper composition and control of light.</p>

<h3>Composition Tricks</h3>
<p>Enable the 3x3 camera grid on your phone screen immediately. Use the 'Rule of Thirds' by aligning your subject along the grid lines or their intersections. Look for leading lines like bridges, fences, or highway markers that naturally pull the viewer's eyes toward your subject.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2024-09-28",
    readingTime: "4 min read",
    views: 790,
    comments: [],
    featured: false
  },
  {
    id: 20,
    title: "The Art of Writing Regularly: Staying Consistent",
    slug: "art-of-writing-regularly",
    category: "Personal Thoughts",
    tags: ["Writing", "Creativity", "Consistency"],
    featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Overcome writer's block and build a writing routine. Learn why writing for yourself is the ultimate clarity booster.",
    fullContent: `
<h2>Writing as a Thought Filter</h2>
<p>Many people wait for 'inspiration' to strike before sitting down to write. However, waiting for inspiration is an amateur's game; professionals show up and write on schedule. Writing regularly is the best way to crystallize your ideas, find gaps in your knowledge, and track your intellectual growth over time.</p>

<blockquote>"Writing isn't just about sharing what you know; it is the process through which you discover what you actually believe."</blockquote>

<h3>Strategies to Beat Writer's Block</h3>
<p>Start small: write just 200 words a day. Don't edit while you write; simply vomit your thoughts onto the page, and come back 24 hours later with an editor's lens to refine, trim, and polish your arguments.</p>
    `,
    author: AUTHORS.marcus,
    publishDate: "2024-09-15",
    readingTime: "5 min read",
    views: 1200,
    comments: [],
    featured: false
  },
  {
    id: 21,
    title: "The Joy of Slow Living in a Fast-Paced World",
    slug: "joy-of-slow-living",
    category: "Lifestyle",
    tags: ["Lifestyle", "Slow Living", "Mindfulness"],
    featuredImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover the philosophy of 'Slow Living'. Learn how slowing down your meals, schedules, and reactions restores sanity.",
    fullContent: `
<h2>The Constant Hurry</h2>
<p>Why are we always rushing? We drink coffee while walking, text while eating, check emails in elevators, and rush home to sit in front of yet another screen. Slow living is an intentional rebellion against the glorification of busyness.</p>

<blockquote>"In a race to the finish line, we forget to observe the path we are walking."</blockquote>

<p>It means waking up 20 minutes earlier just to sit quietly with a hot beverage without looking at your notifications. It means walking without headphones, listening to the ambient noise, and savoring the physical presence of the world around you.</p>
    `,
    author: AUTHORS.marcus,
    publishDate: "2024-08-30",
    readingTime: "4 min read",
    views: 1040,
    comments: [],
    featured: false
  },
  {
    id: 22,
    title: "Clean Code Best Practices for Scalable Engineering",
    slug: "clean-code-best-practices",
    category: "Programming",
    tags: ["Programming", "Clean Code", "Engineering"],
    featuredImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Improve code readability, simplify function structures, choose expressive names, and master clean code principles to help your team.",
    fullContent: `
<h2>Writing Code for Humans First</h2>
<p>Computers can read compiled binary perfectly fine. Clean code isn't written for the compiler; it is written for your fellow engineers who have to modify and extend it in the future.</p>

<h3>1. Meaningful Names</h3>
<p>Avoid single-character variable names or cryptic abbreviations. Choose descriptive, intention-revealing names.</p>

<pre><code>// Bad
const d = new Date(); // elapsed time in days

// Good
const elapsedTimeInDays = new Date();</code></pre>

<h3>2. Functions Should Do One Thing</h3>
<p>If your function takes 100 lines and contains multiple nested loops and conditional paths, it is likely doing too much. Break it down into small, highly testable, single-purpose functions.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2024-08-15",
    readingTime: "6 min read",
    views: 1980,
    comments: [],
    featured: false
  },
  {
    id: 23,
    title: "The Ethics of Generative AI: Navigating the Grey Areas",
    slug: "ethics-of-generative-ai",
    category: "Artificial Intelligence",
    tags: ["AI", "Ethics", "Philosophy"],
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Examine copyright puzzles, training data consent, prompt intellectual property, deepfakes, and how the future of AI can stay human-centered.",
    fullContent: `
<h2>The Unprecedented Speed of Change</h2>
<p>Generative models are advancing faster than our legal frameworks and cultural norms can adjust. As we integrate these tools, we must ask critical questions about creators' rights, bias, and the fabric of information truth.</p>

<h3>The Training Data Dilemma</h3>
<p>Most large language and image models are trained on the public internet, which includes copyrighted novels, private source code, and artwork without the explicit consent of their authors. How do we establish proper compensation structures for intellectual contributors?</p>

<p>In our race to build powerful models, we must keep human welfare, creative integrity, and ethical responsibility at the center of development.</p>
    `,
    author: AUTHORS.sarah,
    publishDate: "2024-08-01",
    readingTime: "7 min read",
    views: 1420,
    comments: [],
    featured: false
  },
  {
    id: 24,
    title: "Optimizing Frontend Performance: Blazing Fast Metrics",
    slug: "optimizing-frontend-performance",
    category: "Web Development",
    tags: ["Performance", "Web", "Frontend"],
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Master core web vitals like LCP, FID, and CLS. Implement image lazy loading, code-splitting, and asset compressions.",
    fullContent: `
<h2>Performance is a Core UX Metric</h2>
<p>If your website takes more than 3 seconds to load on a mobile 3G connection, you will lose up to 50% of your potential traffic. Speed directly affects conversion rates, user engagement, and SEO authority.</p>

<h3>Core Web Vitals</h3>
<ul>
  <li><strong>Largest Contentful Paint (LCP)</strong>: Measures loading performance. Aim for under 2.5 seconds.</li>
  <li><strong>First Input Delay (FID)</strong>: Measures interactivity. Aim for under 100 milliseconds.</li>
  <li><strong>Cumulative Layout Shift (CLS)</strong>: Measures visual stability. Aim for under 0.1.</li>
</ul>

<h3>How Code Splitting Helps</h3>
<p>Instead of sending your entire application's JavaScript in one massive bundle, split code by page routes using dynamic imports. This allows the user to only download the code needed for the specific page they are viewing.</p>
    `,
    author: AUTHORS.alex,
    publishDate: "2024-07-20",
    readingTime: "6 min read",
    views: 1120,
    comments: [],
    featured: false
  },
  {
    id: 25,
    title: "Embracing Imperfection: The Wabi-Sabi Mindset",
    slug: "embracing-imperfection-wabi-sabi",
    category: "Personal Thoughts",
    tags: ["Philosophy", "Mindfulness", "Acceptance"],
    featuredImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Learn the traditional Japanese aesthetic of Wabi-Sabi. Discover how finding beauty in the incomplete, impermanent, and imperfect reduces stress.",
    fullContent: `
<h2>The Trap of Perfectionism</h2>
<p>We stress over having the perfect career, the perfect body, the perfect clean desk, and the perfect family. This endless striving for perfection is a source of chronic anxiety. Wabi-Sabi is a beautiful alternative: a philosophy that invites us to appreciate the cracked plate, the fading flower, and our own raw vulnerabilities.</p>

<blockquote>"There is a crack in everything, that's how the light gets in." - Leonard Cohen</blockquote>

<h3>Applying Wabi-Sabi to Tech and Creation</h3>
<p>Don't let the fear of an imperfect product stop you from launching. An incomplete project out in the wild is infinitely better than a 'perfect' project locked in your local workspace. Let it breathe, get feedback, and let the imperfections guide the growth.</p>
    `,
    author: AUTHORS.marcus,
    publishDate: "2024-07-05",
    readingTime: "5 min read",
    views: 1290,
    comments: [],
    featured: false
  }
];
