import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Star, Heart, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';

export default function Shop() {
  const location = useLocation();
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  // Filter States
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state from query params if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const materialParam = params.get('material');
    const searchParam = params.get('search');
    const priceParam = params.get('price');

    if (materialParam) {
      setSelectedMaterial(materialParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (priceParam) {
      setMaxPrice(Number(priceParam));
    }
  }, [location.search]);

  // Extract unique filter options
  const materials = ["Organic Cotton", "Natural Silk"];
  const sizes = ["80 cm", "90 cm", "100 cm", "110 cm", "120 cm", "130 cm", "140 cm"];
  const colors = ["Dusty Pink", "Sage Green", "Ivory", "Baby Blue", "Sand", "Light Gray", "Beige"];

  // Filter and Sort calculation
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesMaterial = selectedMaterial ? product.material === selectedMaterial : true;
    const matchesSize = selectedSize ? product.sizes.includes(selectedSize) : true;
    const matchesColor = selectedColor ? product.colors.some(c => c.name === selectedColor) : true;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesMaterial && matchesSize && matchesColor && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // default order
  });

  const resetFilters = () => {
    setSelectedMaterial("");
    setSelectedSize("");
    setSelectedColor("");
    setMaxPrice(100);
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-400 block">The Bedtime Collection</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-semibold uppercase">Organic &amp; Silk Pajamas</h2>
        <p className="text-xs text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
          Explore our luxurious range of children’s sleepwear tailored perfectly to support skin health, deep slumber, and easy movement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="bg-white p-6 rounded-2xl border border-stone-100 space-y-6">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-stone-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-amber-800 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Clear All
            </button>
          </div>

          {/* Search bar internally */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-medium text-stone-700 block">Search Query</label>
            <input
              type="text"
              placeholder="Search pajamas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-stone-400 bg-stone-50"
            />
          </div>

          {/* Material selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-medium text-stone-700 block">Fabric Material</label>
            <div className="space-y-1.5">
              <label className="flex items-center text-xs text-stone-600 cursor-pointer">
                <input
                  type="radio"
                  name="material"
                  checked={selectedMaterial === ""}
                  onChange={() => setSelectedMaterial("")}
                  className="mr-2 text-stone-800 focus:ring-stone-400"
                />
                All Materials
              </label>
              {materials.map((m) => (
                <label key={m} className="flex items-center text-xs text-stone-600 cursor-pointer">
                  <input
                    type="radio"
                    name="material"
                    checked={selectedMaterial === m}
                    onChange={() => setSelectedMaterial(m)}
                    className="mr-2 text-stone-800 focus:ring-stone-400"
                  />
                  {m}
                </label>
              ))}
            </div>
          </div>

          {/* Size filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-medium text-stone-700 block">Size (80–140 cm)</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border border-stone-200 text-xs rounded-lg px-2.5 py-2 text-stone-800 bg-stone-50 focus:outline-none focus:border-stone-400"
            >
              <option value="">All Sizes</option>
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Color filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-medium text-stone-700 block">Colors</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor("")}
                className={`text-[10px] px-2.5 py-1.5 rounded-full border transition ${selectedColor === "" ? "bg-stone-800 text-white border-stone-800" : "bg-stone-50 text-stone-600 border-stone-200"}`}
              >
                All
              </button>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-full border transition ${selectedColor === c ? "bg-stone-800 text-white border-stone-800" : "bg-stone-50 text-stone-600 border-stone-200"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-700 font-medium">
              <span className="uppercase tracking-wider">Max Price</span>
              <span>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-stone-700 bg-stone-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>$30</span>
              <span>$100</span>
            </div>
          </div>
        </aside>

        {/* Product Catalog Display */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-stone-100 gap-4">
            <p className="text-xs text-stone-500 font-light">
              Showing <span className="font-semibold text-stone-800">{filteredProducts.length}</span> luxury sleepwear designs
            </p>
            <div className="flex items-center space-x-2 text-xs text-stone-700 font-light">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-800 focus:outline-none"
              >
                <option value="default">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid list */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-100 space-y-4">
              <div className="text-stone-300 font-light text-5xl font-serif">☹</div>
              <p className="text-stone-700 font-serif text-lg">No Pajamas Match Your Filters</p>
              <p className="text-xs text-stone-400">Try adjusting your fabric material, size, or sorting selection.</p>
              <button
                onClick={resetFilters}
                className="bg-stone-800 text-white rounded-full text-xs tracking-widest uppercase px-6 py-2.5 hover:bg-stone-900 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const isFav = isInWishlist(p.id);
                return (
                  <div key={p.id} className="group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                    {/* Upper cover section */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {/* Wishlist button */}
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-white/90 shadow-sm text-stone-600 hover:text-rose-600 transition"
                        aria-label="Wishlist toggle"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                      </button>
                    </div>

                    {/* Meta info section */}
                    <div className="p-5 space-y-3.5 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-amber-800 font-medium">
                          {p.material}
                        </span>
                        <h4 className="font-serif text-stone-800 text-sm font-semibold group-hover:text-amber-800 transition">
                          <Link to={`/product/${p.id}`}>{p.name}</Link>
                        </h4>
                        <p className="text-[11px] text-stone-400 font-light leading-relaxed line-clamp-2">
                          {p.shortDescription}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Swatches & available info */}
                        <div className="flex justify-between items-center text-[10px] text-stone-500">
                          <div className="flex gap-1 items-center">
                            {p.colors.map((c) => (
                              <span
                                key={c.name}
                                className="w-2.5 h-2.5 rounded-full border border-stone-200 block"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                          </div>
                          <span className="font-light">Sizes: 80–140cm</span>
                        </div>

                        {/* Rating, Price & CTA */}
                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-stone-950 text-sm">${p.price}</span>
                            <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{p.rating} ({p.reviewsCount})</span>
                            </div>
                          </div>

                          <button
                            onClick={() => addToCart(p, p.sizes[2], p.colors[0].name, 1)}
                            className="bg-stone-800 hover:bg-stone-900 text-white text-[10px] tracking-widest uppercase px-3 py-2 rounded transition font-semibold"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
