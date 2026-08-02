import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Star, ArrowRight, ShieldCheck, Heart, Leaf, Sparkles, Navigation, RotateCcw } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist, addToCart } = useShop();

  // Featured items to show
  const featuredProducts = PRODUCTS.slice(0, 3);

  const whyChooseUsFeatures = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-700 stroke-[1.5]" />,
      title: "100% Certified Organic Cotton",
      description: "Breathable GOTS-certified fibers grown with zero synthetic pesticides or chemicals."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-700 stroke-[1.5]" />,
      title: "Premium Natural Silk",
      description: "Grade 6A Mulberry silk with dynamic thermoregulation and gentle friction-free weave."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-stone-700 stroke-[1.5]" />,
      title: "Hypoallergenic Fabrics",
      description: "Purely chemical-free, pH-balanced fabrics curated carefully for hyper-sensitive kid's skin."
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-700 stroke-[1.5]" />,
      title: "Eco-Friendly Production",
      description: "Ethical European standard craftsmanship prioritizing recycled packaging and low water waste."
    },
    {
      icon: <Navigation className="w-6 h-6 text-sky-700 stroke-[1.5]" />,
      title: "Free Worldwide Shipping over $100",
      description: "Complimentary signature gift boxed international tracking on premium basket values."
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-stone-700 stroke-[1.5]" />,
      title: "30-Day Easy Returns",
      description: "Completely hassle-free size exchanges and stress-free refunds on unworn pajama collections."
    }
  ];

  const clientTestimonials = [
    {
      name: "Victoria Lindqvist",
      location: "Stockholm, Sweden",
      rating: 5,
      review: "The Dream Silk Pajama feels like sleeping on clouds. My daughter refuses to wear anything else now. Absolutely beautiful and durable craftsmanship."
    },
    {
      name: "Clara Dubois",
      location: "Lyon, France",
      rating: 5,
      review: "High-end Scandinavian perfection. The GOTS organic cotton is exceptionally thick, durable, and gets softer with each machine wash. Safe choice!"
    },
    {
      name: "Arthur Pendelton",
      location: "London, UK",
      rating: 5,
      review: "Exceptional service! The luxury gift boxing was marvelous. Perfect premium sleepwear and incredibly fast shipping directly to our doorstep."
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Premium Lifestyle Hero */}
      <section className="relative h-[85vh] flex items-center bg-stone-100">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80"
            alt="Happy siblings wearing organic and natural silk pajamas jumping on a soft bed"
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 via-stone-800/30 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-white space-y-6 md:max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] font-light text-stone-200">
            Premium Scandinavian Quality
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Luxury Children’s Pajamas Made from Organic Cotton &amp; Natural Silk
          </h2>
          <p className="text-sm md:text-base font-light text-stone-100/90 leading-relaxed">
            Soft, breathable, and naturally comfortable sleepwear designed for peaceful nights and happy mornings. Made safe for hyper-sensitive skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white text-stone-900 px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-stone-50 transition shadow-md"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border border-white text-white px-8 py-3.5 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-white/10 transition"
            >
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 block">The Curated Edit</span>
          <h3 className="text-3xl font-serif text-stone-900">Elegant Best Sellers</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto font-light leading-relaxed">
            Meticulously handpicked designs woven with nature's premium materials for healthy skin breathing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((p) => {
            const isFav = isInWishlist(p.id);
            return (
              <div key={p.id} className="group bg-white rounded-2xl border border-stone-100/50 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                <div className="relative overflow-hidden aspect-[4/5] bg-stone-50">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button
                      onClick={() => toggleWishlist(p)}
                      className="p-2.5 rounded-full bg-white/90 shadow-sm text-stone-600 hover:text-rose-600 transition"
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-stone-800 text-base font-medium group-hover:text-amber-800 transition">
                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                      </h4>
                      <span className="font-semibold text-stone-900 text-sm">${p.price}</span>
                    </div>
                    <p className="text-xs text-stone-400 font-light line-clamp-2 mt-1">{p.shortDescription}</p>

                    <div className="flex gap-2 text-[10px] text-stone-500 tracking-wider pt-2.5">
                      <span className="bg-stone-100 px-2 py-1 rounded capitalize">{p.material}</span>
                      <span className="bg-stone-100 px-2 py-1 rounded">Sizes: 80-140 cm</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-stone-700 font-medium">{p.rating}</span>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.sizes[2], p.colors[0].name, 1)}
                      className="bg-stone-800 text-white text-[10px] tracking-widest uppercase px-4 py-2 rounded hover:bg-stone-900 transition font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-stone-700 hover:text-amber-800 text-xs uppercase tracking-widest font-semibold transition"
          >
            <span>View Full Pajama Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-stone-100/50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 block">Pure Integrity</span>
            <h3 className="text-3xl font-serif text-stone-900">Why Families Choose Us</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto font-light leading-relaxed">
              We pledge to provide unmatched natural purity and transparent, ecological sleepwear craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsFeatures.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition">
                <div className="p-3 bg-stone-50 rounded-full">
                  {f.icon}
                </div>
                <h4 className="font-serif text-stone-800 text-base font-medium">{f.title}</h4>
                <p className="text-xs text-stone-400 leading-relaxed font-light">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonial Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 block">Verified Experience</span>
          <h3 className="text-3xl font-serif text-stone-900">What Parents Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientTestimonials.map((t, i) => (
            <div key={i} className="bg-stone-50 p-8 rounded-2xl space-y-4 border border-stone-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic font-light">
                  "{t.review}"
                </p>
              </div>
              <div className="pt-4 border-t border-stone-200">
                <p className="text-xs text-stone-800 font-semibold">{t.name}</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainable Craft Story Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-stone-950 text-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Our Heritage</span>
            <h3 className="text-3xl font-serif">Made by Parents, For Gentle Skin</h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              We are a dedicated European family-owned business specializing in pure natural fabrics. Deeply frustrated by synthetic fabrics and heavy dye printing, we crafted Sommeil to give our children chemical-free comfort. Today, we collaborate with organic farms to curate luxury sleepwear that respects our planet.
            </p>
            <div>
              <button
                onClick={() => navigate('/about')}
                className="bg-white text-stone-900 text-[10px] font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-stone-100 transition"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="h-64 md:h-auto min-h-[350px]">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
              alt="Organic manufacturing craftsmanship close up"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
