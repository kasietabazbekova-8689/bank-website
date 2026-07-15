import { MOCK_POSTS, CATEGORIES } from '../data/posts';

// Helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const blogApi = {
  /**
   * Fetch all posts
   */
  async getPosts() {
    await delay(150);
    // Sort posts by date descending
    return [...MOCK_POSTS].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  },

  /**
   * Fetch featured posts
   */
  async getFeaturedPosts() {
    await delay(100);
    return MOCK_POSTS.filter(post => post.featured);
  },

  /**
   * Fetch a single post by its slug
   */
  async getPostBySlug(slug) {
    await delay(150);
    const post = MOCK_POSTS.find(p => p.slug === slug);
    if (!post) throw new Error("Article not found");
    return post;
  },

  /**
   * Fetch posts by category
   */
  async getPostsByCategory(categoryName) {
    await delay(120);
    return MOCK_POSTS.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
  },

  /**
   * Fetch posts by tag
   */
  async getPostsByTag(tag) {
    await delay(120);
    return MOCK_POSTS.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  },

  /**
   * Fetch all categories with accurate dynamic counts
   */
  async getCategories() {
    await delay(100);
    return CATEGORIES.map(cat => {
      const count = MOCK_POSTS.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
      return { ...cat, count };
    });
  },

  /**
   * Search posts by title, content, category, or tags
   */
  async searchPosts(query) {
    await delay(200);
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return MOCK_POSTS.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.fullContent.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
      p.excerpt.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Fetch posts organized by Year and Month
   */
  async getArchive() {
    await delay(150);
    const posts = [...MOCK_POSTS].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const archiveMap = {};

    posts.forEach(post => {
      const date = new Date(post.publishDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });

      if (!archiveMap[year]) {
        archiveMap[year] = {};
      }
      if (!archiveMap[year][month]) {
        archiveMap[year][month] = [];
      }
      archiveMap[year][month].push(post);
    });

    return archiveMap;
  },

  /**
   * Fetch related posts based on category (excluding current post)
   */
  async getRelatedPosts(currentPostId, category, limit = 3) {
    await delay(100);
    return MOCK_POSTS
      .filter(p => p.category === category && p.id !== currentPostId)
      .slice(0, limit);
  },

  /**
   * Fetch previous and next posts chronologically
   */
  async getAdjacentPosts(currentPostId) {
    await delay(100);
    const sorted = [...MOCK_POSTS].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
    const index = sorted.findIndex(p => p.id === currentPostId);

    return {
      prevPost: index > 0 ? sorted[index - 1] : null,
      nextPost: index < sorted.length - 1 ? sorted[index + 1] : null
    };
  },

  /**
   * Fetch recent posts
   */
  async getRecentPosts(limit = 5) {
    await delay(100);
    return [...MOCK_POSTS]
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, limit);
  },

  /**
   * Fetch popular posts (highest views)
   */
  async getPopularPosts(limit = 5) {
    await delay(100);
    return [...MOCK_POSTS]
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  /**
   * Submit mock newsletter
   */
  async submitNewsletter(email) {
    await delay(300);
    if (!email || !email.includes('@')) {
      throw new Error("Please enter a valid email address.");
    }
    return { success: true, message: "Thank you for subscribing! Check your inbox soon." };
  },

  /**
   * Submit mock contact form
   */
  async submitContact(formData) {
    await delay(300);
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      throw new Error("All fields are required.");
    }
    return { success: true, message: "Message sent successfully! We will get back to you shortly." };
  }
};
