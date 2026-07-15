/**
 * Dynamic SEO utility helper for My Private Journal.
 * Updates the page title, description, open graph tags, and structured JSON-LD schema dynamically.
 */
export const updateSEO = ({ title, description, image, type = "website", slug, articleData }) => {
  const defaultTitle = "My Private Journal | Thoughts, Ideas & Stories";
  const defaultDesc = "A premium, minimalist reading space for sharing reflections, technology tutorials, lifestyle insights, and travel guides.";
  const defaultImage = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80";
  const siteUrl = window.location.origin;

  // 1. Update document title
  document.title = title ? `${title} | My Private Journal` : defaultTitle;

  // 2. Helper to find/create or update meta tag
  const setMetaTag = (attributeName, attributeValue, contentValue) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', contentValue || "");
  };

  // 3. Update standard meta tags
  setMetaTag("name", "description", description || defaultDesc);

  // 4. Update Open Graph (OG) tags
  setMetaTag("property", "og:title", title ? `${title} | My Private Journal` : defaultTitle);
  setMetaTag("property", "og:description", description || defaultDesc);
  setMetaTag("property", "og:image", image || defaultImage);
  setMetaTag("property", "og:type", type);
  setMetaTag("property", "og:url", slug ? `${siteUrl}/article/${slug}` : siteUrl);
  setMetaTag("property", "og:site_name", "My Private Journal");

  // 5. Update Twitter Card tags
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", title ? `${title} | My Private Journal` : defaultTitle);
  setMetaTag("name", "twitter:description", description || defaultDesc);
  setMetaTag("name", "twitter:image", image || defaultImage);

  // 6. Handle Structured Data / JSON-LD
  // Remove existing dynamically created schema scripts
  const existingSchema = document.getElementById('seo-jsonld');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "WebSite",
    "name": "My Private Journal",
    "url": siteUrl,
    "description": defaultDesc
  };

  if (type === "article" && articleData) {
    schemaJson["headline"] = articleData.title;
    schemaJson["image"] = articleData.featuredImage;
    schemaJson["datePublished"] = articleData.publishDate;
    schemaJson["author"] = {
      "@type": "Person",
      "name": articleData.author?.name || "Alex Johnson"
    };
    schemaJson["description"] = articleData.excerpt;
  }

  const script = document.createElement('script');
  script.id = 'seo-jsonld';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaJson, null, 2);
  document.head.appendChild(script);
};

/**
 * Generate mock robots.txt and sitemap files to simulate build output SEO.
 */
export const generateSEOPublishFiles = () => {
  return {
    robots: `User-agent: *
Allow: /
Sitemap: /sitemap.xml`,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myprivatejournal.example.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://myprivatejournal.example.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://myprivatejournal.example.com/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://myprivatejournal.example.com/archive</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://myprivatejournal.example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://myprivatejournal.example.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`
  };
};
