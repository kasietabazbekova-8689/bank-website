import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart: list of { product, size, color, quantity }
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxury_pajama_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist: list of product objects
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('luxury_pajama_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Promo Codes
  const [appliedPromo, setAppliedPromo] = useState(null);
  const PROMO_CODES = {
    "WELCOME10": 10,  // 10% off
    "SILK15": 15,     // 15% off
    "SWEETDREAMS": 20 // 20% off
  };

  // Orders: list of placed orders for Order Tracking
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('luxury_pajama_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "ORD-9824-A",
        date: "May 15, 2024",
        status: "Delivered",
        items: [
          { name: "Luna Organic Cotton Pajama", price: 39, quantity: 1, size: "100 cm", color: "Sage Green" }
        ],
        subtotal: 39,
        discount: 0,
        shipping: 5.99,
        total: 44.99,
        shippingAddress: {
          name: "Marie Sterling",
          email: "marie@sterlingkids.com",
          address: "12 Rue de la Paix",
          city: "Paris",
          zip: "75002",
          country: "France"
        }
      }
    ];
  });

  // User Profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('luxury_pajama_user');
    return saved ? JSON.parse(saved) : {
      name: "Marie Sterling",
      email: "marie@sterlingkids.com",
      phone: "+33 1 47 20 00 01",
      address: "12 Rue de la Paix",
      city: "Paris",
      zip: "75002",
      country: "France"
    };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('luxury_pajama_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxury_pajama_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('luxury_pajama_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxury_pajama_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Cart actions
  const addToCart = (product, size, color, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item =>
        item.product.id === product.id &&
        item.size === size &&
        item.color === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, color, quantity }];
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prev => prev.filter(item =>
      !(item.product.id === productId && item.size === size && item.color === color)
    ));
  };

  const updateCartQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev => prev.map(item =>
      (item.product.id === productId && item.size === size && item.color === color)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Cart Calculations
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    const rate = PROMO_CODES[appliedPromo] || 0;
    return (getSubtotal() * rate) / 100;
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 100 ? 0 : 9.99; // Free shipping over $100, otherwise $9.99
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getShippingCost();
  };

  // Promo Code Validation
  const applyPromoCode = (code) => {
    const cleaned = code.toUpperCase().trim();
    if (PROMO_CODES[cleaned] !== undefined) {
      setAppliedPromo(cleaned);
      return { success: true, discount: PROMO_CODES[cleaned] };
    }
    return { success: false, message: "Invalid promo code" };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Order Placement
  const placeOrder = (shippingDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "Processing",
      items: cart.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })),
      subtotal: getSubtotal(),
      discount: getDiscountAmount(),
      shipping: getShippingCost(),
      total: getTotal(),
      shippingAddress: shippingDetails
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider value={{
      cart,
      wishlist,
      orders,
      userProfile,
      appliedPromo,
      promoCodes: Object.keys(PROMO_CODES),
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      getSubtotal,
      getDiscountAmount,
      getShippingCost,
      getTotal,
      applyPromoCode,
      removePromoCode,
      placeOrder,
      setUserProfile
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
