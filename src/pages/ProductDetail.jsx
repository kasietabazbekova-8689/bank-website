import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Star, Heart, ArrowLeft, ShoppingBag, Shield, Check, Info } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  // Component States
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to 100 cm
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedNotification, setAddedNotification] = useState(false);

  // Sync image when ID changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[2]);
    setSelectedColor(product.colors[0].name);
    setQuantity(1);
  }, [id, product]);

  // Zoom effect on hover
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 3000);
  };

  // Recommendations: products from same material or others
  const recommendations = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-12">
      {/* Back navigation */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-stone-500 hover:text-stone-900 text-xs uppercase tracking-widest font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to sleepwear collection</span>
        </Link>
      </div>

      {/* Added alert */}
      {addedNotification && (
        <div className="fixed top-24 right-6 md:right-12 bg-stone-900 text-stone-100 px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 z-50 animate-slide-in">
          <Check className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <p className="font-semibold">Added to shopping cart!</p>
            <p className="text-stone-400 mt-0.5">{product.name} ({selectedColor}, {selectedSize})</p>
          </div>
        </div>
      )}

      {/* Main product showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left column: Image Gallery with Zoom */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200/60 cursor-crosshair">
            <img
              src={selectedImage}
              alt={product.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full h-full object-cover"
            />
            {/* Zoom lens overlay */}
            <div
              style={zoomStyle}
              className="absolute inset-0 pointer-events-none border border-stone-200"
            />
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-24 rounded-lg overflow-hidden bg-stone-100 border transition ${selectedImage === img ? "border-amber-800 ring-2 ring-amber-800/10" : "border-stone-200"}`}
              >
                <img src={img} alt={`Gallery index ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Selectors & Buy details */}
        <div className="space-y-6">
          <div className="space-y-2 border-b border-stone-100 pb-5">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">{product.material}</span>
            <h2 className="text-3xl font-serif text-stone-900 font-semibold">{product.name}</h2>
            <div className="flex items-center space-x-4 pt-1">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} />
                ))}
                <span className="text-xs text-stone-700 font-medium pl-1">{product.rating}</span>
              </div>
              <span className="text-xs text-stone-400">({product.reviewsCount} customer reviews)</span>
            </div>
            <div className="pt-3">
              <span className="text-2xl font-bold text-stone-950">${product.price}</span>
            </div>
          </div>

          <p className="text-xs text-stone-500 font-light leading-relaxed">{product.shortDescription}</p>

          {/* Color Selector */}
          <div className="space-y-2.5">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-800 block">
              Color: <span className="text-stone-500 capitalize">{selectedColor}</span>
            </span>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedColor(c.name); setSelectedImage(c.image); }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${selectedColor === c.name ? "border-stone-800 ring-2 ring-stone-800/20" : "border-stone-200"}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && <span className="w-2 h-2 bg-stone-900 rounded-full" style={{ backgroundColor: '#ffffff', mixBlendMode: 'difference' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-800">
                Height Size: <span className="text-stone-500">{selectedSize}</span>
              </span>
              <span className="text-[10px] text-stone-400">Sizing: 80–140 cm</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`border rounded-lg py-2 text-xs font-medium transition ${selectedSize === sz ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"}`}
                >
                  {sz.replace(" cm", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector & Add to cart row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center border border-stone-200 rounded-xl h-12 w-32 justify-between px-3.5 bg-white">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="text-stone-500 hover:text-stone-800 font-bold"
              >
                -
              </button>
              <span className="text-sm font-semibold text-stone-800">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="text-stone-500 hover:text-stone-800 font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-grow bg-stone-900 text-white rounded-xl h-12 flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-semibold hover:bg-stone-950 transition"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="h-12 w-12 border border-stone-200 rounded-xl flex items-center justify-center hover:bg-stone-50 transition"
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-rose-500 text-rose-500" : "text-stone-600"}`} />
            </button>
          </div>

          {/* Multi tabs for specifications (Description, Care, Delivery) */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
            <div className="flex border-b border-stone-200 text-xs font-semibold tracking-wider uppercase text-stone-500 bg-stone-50">
              <button
                onClick={() => setActiveTab("description")}
                className={`flex-1 py-3 border-r border-stone-200 text-center hover:text-stone-800 transition ${activeTab === "description" ? "bg-white text-stone-900 font-bold" : ""}`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`flex-1 py-3 border-r border-stone-200 text-center hover:text-stone-800 transition ${activeTab === "care" ? "bg-white text-stone-900 font-bold" : ""}`}
              >
                Care Instructions
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`flex-1 py-3 text-center hover:text-stone-800 transition ${activeTab === "delivery" ? "bg-white text-stone-900 font-bold" : ""}`}
              >
                Delivery &amp; Returns
              </button>
            </div>

            <div className="p-5 text-xs text-stone-600 space-y-2 leading-relaxed font-light">
              {activeTab === "description" && (
                <>
                  <p className="font-normal text-stone-800 mb-1.5">{product.description}</p>
                  <p><strong className="font-medium text-stone-800">Fabric Composition:</strong> {product.fabricDetails}</p>
                </>
              )}
              {activeTab === "care" && (
                <>
                  <p className="font-normal text-stone-800 mb-1.5">Protect the luxurious threads of your pajama:</p>
                  <p>{product.careInstructions}</p>
                </>
              )}
              {activeTab === "delivery" && (
                <>
                  <p className="font-normal text-stone-800 mb-1.5">Expedited Luxury Logistics:</p>
                  <p>{product.deliveryInfo}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="border-t border-stone-200 pt-10 space-y-6">
        <h3 className="text-xl font-serif text-stone-900 font-semibold">Verified Family Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.reviews.map((rev, i) => (
            <div key={i} className="bg-stone-50 p-6 rounded-xl space-y-3 border border-stone-100">
              <div className="flex justify-between items-center">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-400 font-light">{rev.date}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light italic">"{rev.comment}"</p>
              <p className="text-xs text-stone-800 font-semibold pl-1">— {rev.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add To Cart Banner */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-100 p-4 flex items-center justify-between z-40 shadow-lg">
        <div>
          <p className="text-xs text-stone-400 font-semibold uppercase">{product.material}</p>
          <p className="font-serif text-stone-900 text-sm font-semibold truncate max-w-[150px]">{product.name}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-stone-900 text-stone-100 text-xs tracking-widest uppercase px-6 py-2.5 rounded-lg font-semibold hover:bg-stone-950"
        >
          Add to Cart • ${product.price}
        </button>
      </div>

      {/* Related Products Section */}
      <section className="border-t border-stone-200 pt-10 space-y-6">
        <h3 className="text-xl font-serif text-stone-900 font-semibold">You May Also Cherish</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="group flex flex-col justify-between bg-white border border-stone-100 rounded-xl overflow-hidden p-3.5 hover:shadow-sm transition">
              <img src={rec.images[0]} alt={rec.name} className="w-full aspect-[4/5] object-cover rounded-lg bg-stone-50" />
              <div className="pt-3 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold">{rec.material}</span>
                <h4 className="font-serif text-stone-800 text-xs font-semibold group-hover:text-amber-800 transition truncate">
                  <Link to={`/product/${rec.id}`}>{rec.name}</Link>
                </h4>
                <div className="flex justify-between items-center pt-1.5">
                  <span className="text-xs font-bold text-stone-900">${rec.price}</span>
                  <Link
                    to={`/product/${rec.id}`}
                    className="text-[10px] text-stone-500 underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
