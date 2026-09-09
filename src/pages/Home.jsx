import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart, cartIconRef } = useCart();
  const navigate = useNavigate();

  // --- 1. HERO CAROUSEL LOGIC ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1727407209320-1fa6ae60ee05?q=80&w=1169&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=100&w=1600&auto=format&fit=crop"
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // --- 2. TEXT ROTATOR LOGIC ---
  const [msgIndex, setMsgIndex] = useState(0);
  const [animClass, setAnimClass] = useState("translate-y-0 opacity-100");
  
  const heroMessages = [
    <><strong className="text-[#111] font-extrabold">Premium Collection</strong> <span className="text-[#ccc] mx-[6px]">•</span>Exclusives deals available now</>,
    <><strong className="text-[#111] font-extrabold">Flash Sale Active</strong> <span className="text-[#ccc] mx-[6px]">•</span> Take an extra 20% off at checkout</>,
    <><strong className="text-[#111] font-extrabold">Free Shipping</strong> <span className="text-[#ccc] mx-[6px]">•</span> On all EverBuy Prime orders today</>,
    <><strong className="text-[#111] font-extrabold">New Arrivals</strong> <span className="text-[#ccc] mx-[6px]">•</span> Discover the latest seasonal tech drops</>
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setAnimClass("-translate-y-5 opacity-0 transition-all duration-400 ease-in");
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % heroMessages.length);
        setAnimClass("translate-y-5 opacity-0 transition-none");
        setTimeout(() => {
          setAnimClass("translate-y-0 opacity-100 transition-all duration-400 ease-out");
        }, 50);
      }, 400);
    }, 4000);
    return () => clearInterval(textTimer);
  }, []);

  // --- 3. LIVE TIMERS & SOCIAL PROOF ---
  const [timeLeft, setTimeLeft] = useState(8039); 
  const [shoppers, setShoppers] = useState(1257);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    const shopperTimer = setInterval(() => setShoppers(prev => prev + (Math.floor(Math.random() * 9) - 3)), 3500);
    return () => { clearInterval(timer); clearInterval(shopperTimer); };
  }, []);

  const formatTime = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  // --- 4. 3D TILT PHYSICS ---
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  // --- DATA ---
  const categories = [
    { id: 'health', title: "Health & Personal Care", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80" },
    { id: 'fashion', title: "Fashion", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80" },
    { id: 'sports', title: "Sports & Outdoors", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80" },
    { id: 'home', title: "Home & Kitchen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" },
    { id: 'electronics', title: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80" },
    { id: 'travel', title: "Travel", img: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&q=80" },
    { id: 'back-to-school', title: "Back to School", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80" },
    { id: 'outlets', title: "Outlets Deals", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" }
  ];

  const trendingProducts = [
    { id: 1, title: "Gaming Headset Pro", price: 129.99, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", badge: "Selling Fast", badgeType: "hot" },
    { id: 2, title: "Minimalist Slate Watch", price: 185.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", badge: "Just Dropped", badgeType: "new" },
    { id: 3, title: "Smart Home Hub V2", price: 89.50, image: "https://img.freepik.com/premium-photo/smart-home-hub-controlling-various-connected-devices_1314467-151989.jpg" },
    { id: 4, title: "Apple Airpods", price: 145.00, image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=400", badge: "High Demand", badgeType: "hot" }
  ];

  // --- TRENDING CARD WITH FLY TO CART PHYSICS ---
  const TrendingCard = ({ product }) => {
    const [isFlying, setIsFlying] = useState(false);
    const [flightStyle, setFlightStyle] = useState({});
    const imageRef = useRef(null);

    const handleFlyToCart = (e) => {
      e.stopPropagation();
      if (!imageRef.current || !cartIconRef.current) {
        addToCart(product); // Fallback if refs fail
        return;
      }

      const startRect = imageRef.current.getBoundingClientRect();
      const targetRect = cartIconRef.current.getBoundingClientRect();

      setIsFlying(true);
      setFlightStyle({
        position: 'fixed', top: startRect.top, left: startRect.left, width: startRect.width, height: startRect.height,
        borderRadius: '12px', zIndex: 999999, pointerEvents: 'none',
        transition: 'all 0.8s cubic-bezier(0.5, -0.5, 0.75, 1)' 
      });

      setTimeout(() => {
        setFlightStyle(prev => ({
          ...prev, top: targetRect.top, left: targetRect.left, width: '40px', height: '40px', opacity: 0.2, borderRadius: '50%', transform: 'scale(0.5)'
        }));
      }, 10);

      setTimeout(() => {
        setIsFlying(false);
        addToCart(product);
      }, 800);
    };

    return (
      <div 
        onMouseMove={handleTilt}
        onMouseLeave={handleLeave}
        className="relative bg-white rounded-[20px] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/5 transition-transform duration-200 ease-out flex flex-col group cursor-pointer"
      >
        {product.badge && (
          <div className={`absolute top-6 left-6 z-10 px-3 py-1.5 rounded-full text-[0.75rem] font-extrabold uppercase tracking-wider text-white ${product.badgeType === 'hot' ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-[0_4px_10px_rgba(239,68,68,0.3)]' : 'bg-gradient-to-br from-indigo-500 to-sky-500 shadow-[0_4px_10px_rgba(99,102,241,0.3)]'}`}>
            {product.badge}
          </div>
        )}
        <img ref={imageRef} src={product.image} className="h-[220px] w-full object-contain rounded-xl block group-hover:scale-[1.02] transition-transform bg-[#f8f9fa] mix-blend-darken" alt={product.title} />
        
        <div className="mt-4 flex flex-col flex-grow">
          <h3 className="text-[1.15rem] font-extrabold text-[#0f172a] mb-3">{product.title}</h3>
          <div className="flex justify-between items-center mb-5">
            <span className="text-[1.3rem] font-black text-[#0f172a]">${product.price.toFixed(2)}</span>
            <span className="bg-[#fffbeb] text-[#d97706] px-2.5 py-1 rounded-lg text-[0.85rem] font-extrabold flex items-center gap-1">
              <i className="fa-solid fa-star"></i> 4.9
            </span>
          </div>
          <button onClick={handleFlyToCart} className="w-full bg-[#f8fafc] hover:bg-[#0f172a] text-[#0f172a] hover:text-white border border-[#e2e8f0] hover:border-[#0f172a] text-[0.95rem] font-bold p-3.5 rounded-xl transition-colors mt-auto">
            Add to Manifest
          </button>
        </div>
        
        {isFlying && <img src={product.image} style={flightStyle} alt="flying clone" className="shadow-2xl mix-blend-darken bg-white" />}
      </div>
    );
  };

  return (
    <main className="bg-[#eaeded] min-h-screen pt-[102px]">
      
      {/* 1. HERO CAROUSEL */}
      {/* 1. HERO CAROUSEL */}
      <section className="relative w-full h-[450px] overflow-hidden flex items-end justify-center mb-5">
        {slides.map((bg, idx) => (
          <div 
            key={idx} 
            // FIX: Replaced 'bg-center' with 'bg-[center_20%]' to restore the original CSS physics
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-[center_20%] transition-all duration-[1500ms] ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
            style={{ backgroundImage: `url(${bg})` }}
          ></div>
        ))}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#eaeded] to-transparent z-10"></div>
       {/* TEXT ROTATOR */}
        <div className="relative z-20 pb-8">
          <div className="inline-flex items-center bg-white/95 backdrop-blur-md px-[20px] py-[10px] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-white">
            <div className="w-2 h-2 bg-[#f26a21] rounded-full mr-[15px] animate-pulse flex-shrink-0 shadow-[0_0_0_0_rgba(242,106,33,0.7)]"></div>
            
            <div className="h-6 flex items-center overflow-hidden w-[280px] sm:w-[420px]">
              <span className={`text-[0.95rem] text-[#333] mr-[20px] whitespace-nowrap ${animClass}`}>
                {heroMessages[msgIndex]}
              </span>
            </div>

            <button className="bg-[#131a22] hover:bg-[#f26a21] text-white px-4 py-1.5 rounded-full text-[0.85rem] font-bold flex items-center gap-2 transition-colors flex-shrink-0">
              Explore <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SHOP GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-[1500px] mx-auto -mt-5 relative z-20 mb-10">
        {categories.map((cat, i) => (
          <article 
            key={i} 
            // FIX: Added /category/ to the path so it matches App.jsx
            onClick={() => navigate(`/category/${cat.id}`)}
            onMouseMove={handleTilt}
            onMouseLeave={handleLeave}
            className="bg-white p-5 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-out flex flex-col cursor-pointer"
          >
            <h2 className="text-[1.25rem] text-[#0f1111] font-bold mb-3">{cat.title}</h2>
            <div className="h-[280px] w-full rounded-lg bg-cover bg-center mb-4 bg-[#f8f9fa]" style={{ backgroundImage: `url(${cat.img})` }}></div>
            <p className="text-white h-[35px] w-[120px] bg-gradient-to-br from-[#FF9900] to-[#FF3300] flex justify-center items-center text-[0.95rem] font-semibold rounded-full mt-auto mx-auto hover:text-[#353131] transition-colors pointer-events-none">Shop now</p>
          </article>
        ))}
      </section>

      {/* 3. FEATURES BAR */}
      <section className="flex flex-wrap justify-evenly items-center bg-white p-[30px] mx-auto max-w-[1400px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] mt-[75px] gap-4">
        <div className="flex items-center gap-[10px] font-bold text-[#37475a]"><i className="fa-solid fa-truck-fast text-[1.5rem] text-[#ff9900]"></i><span>Fast Delivery</span></div>
        <div className="flex items-center gap-[10px] font-bold text-[#37475a]"><i className="fa-solid fa-shield-halved text-[1.5rem] text-[#ff9900]"></i><span>Secure Payments</span></div>
        <div className="flex items-center gap-[10px] font-bold text-[#37475a]"><i className="fa-solid fa-rotate-left text-[1.5rem] text-[#ff9900]"></i><span>Easy Returns</span></div>
        <div className="flex items-center gap-[10px] font-bold text-[#37475a]"><i className="fa-solid fa-headset text-[1.5rem] text-[#ff9900]"></i><span>24/7 Support</span></div>
      </section>

      {/* 4. ULTRA ENGAGEMENT HUB */}
      <section className="my-10 px-6 max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[55px] p-[20px_30px] flex flex-col md:flex-row justify-between items-center text-white shadow-2xl mb-10 mt-[125px] border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            <h2 className="text-[1.4rem] font-extrabold tracking-tight">Flash Drop Active</h2>
            <div className="font-mono text-[1.5rem] font-black text-[#ff9900] bg-[#ff9900]/10 px-4 py-1.5 rounded-lg border border-[#ff9900]/20">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="bg-white/5 px-5 py-2.5 rounded-full border border-white/10 font-semibold text-[0.95rem] text-emerald-400 mt-4 md:mt-0">
            <i className="fa-solid fa-users mr-2"></i> {shoppers.toLocaleString()} people shopping now
          </div>
        </div>

        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[2rem] font-black text-[#0f172a] tracking-tight">Trending Right Now</h2>
          <a href="#" className="font-bold text-[#ff9900] hover:text-[#e38800] transition-colors">View All <i className="fa-solid fa-arrow-right"></i></a>
        </div>

        {/* TRENDING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <TrendingCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. VOICES OF EVERBUY */}
      {/* 5. NEXT-LEVEL VOICES OF EVERBUY (INFINITE MARQUEE) */}
      <section className="bg-[#0a0f16] py-20 mt-12 relative overflow-hidden border-t border-white/5">
        {/* Cinematic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#ff9900] blur-[150px] opacity-10 rounded-full pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Voices of EverBuy</h2>
          <p className="text-slate-400 font-medium">Trusted by thousands of professionals and tech enthusiasts.</p>
        </div>

        {/* Inline style for the smooth marquee animation without needing tailwind.config edits */}
        <style>
          {`
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
              display: flex;
              width: max-content;
              animation: infinite-scroll 45s linear infinite;
            }
            .animate-infinite-scroll:hover {
              animation-play-state: paused;
            }
            /* Hide scrollbar for the wrapper */
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

        {/* Marquee Wrapper */}
        <div className="w-full overflow-hidden no-scrollbar relative z-10">
          {/* Gradient fade edges for smooth entrance/exit */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0f16] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0f16] to-transparent z-20 pointer-events-none"></div>

          <div className="animate-infinite-scroll gap-6 px-3">
            {[
              { id: 1, name: "Priya S.", role: "Software Engineer", img: "https://i.pravatar.cc/150?u=1", review: "The delivery was incredibly fast, and the packaging was premium. It genuinely felt like unboxing a luxury item rather than a standard online order." },
              { id: 2, name: "Rahul K.", role: "Full Stack Developer", img: "https://i.pravatar.cc/150?u=2", review: "Best selection of high-end electronics I've found online. The UI is incredibly smooth and finding exact specifications takes seconds." },
              { id: 3, name: "Aisha M.", role: "Data Scientist", img: "https://i.pravatar.cc/150?u=3", review: "The checkout process is flawless. Secured with AES-256 and no unnecessary friction. EverBuy is now my default platform for tech." },
              { id: 4, name: "Savannah.", role: "Tech Enthusiast", img: "https://i.pravatar.cc/150?u=4", review: "EverBuy Prime shipping is no joke. I ordered a smartwatch at midnight and it was on my desk before my lunch break the next day." },
              { id: 5, name: "Anil N.", role: "University Student", img: "https://i.pravatar.cc/150?u=5", review: "Customer service handled my return in under 5 minutes. No endless automated bots, just instant, helpful support. Lifetime customer right here." },
              { id: 6, name: "Rebecca M.", role: "Digital Marketer", img: "https://i.pravatar.cc/150?u=6", review: "Managed to snag a massive flash deal on noise-cancelling headphones. The live tracking and inventory updates are highly accurate." },
              { id: 7, name: "Kavya P.", role: "Freelance Designer", img: "https://i.pravatar.cc/150?u=7", review: "The aesthetics of this platform are unmatched. It makes shopping for everyday home essentials feel like a curated, premium experience." },
              { id: 8, name: "Rohan V.", role: "Cloud Architect", img: "https://i.pravatar.cc/150?u=8", review: "Finally, an e-commerce architecture that doesn't lag or feel cluttered. The search debounce is perfectly tuned. Highly reliable." }
            ].concat([ // Duplicating the array seamlessly creates the infinite loop illusion
              { id: 11, name: "Priya S.", role: "Software Engineer", img: "https://i.pravatar.cc/150?u=1", review: "The delivery was incredibly fast, and the packaging was premium. It genuinely felt like unboxing a luxury item rather than a standard online order." },
              { id: 12, name: "Rahul K.", role: "Full Stack Developer", img: "https://i.pravatar.cc/150?u=2", review: "Best selection of high-end electronics I've found online. The UI is incredibly smooth and finding exact specifications takes seconds." },
              { id: 13, name: "Aisha M.", role: "Data Scientist", img: "https://i.pravatar.cc/150?u=3", review: "The checkout process is flawless. Secured with AES-256 and no unnecessary friction. EverBuy is now my default platform for tech." },
              { id: 14, name: "Savannah.", role: "Tech Enthusiast", img: "https://i.pravatar.cc/150?u=4", review: "EverBuy Prime shipping is no joke. I ordered a smartwatch at midnight and it was on my desk before my lunch break the next day." },
              { id: 15, name: "Anil.", role: "University Student", img: "https://i.pravatar.cc/150?u=5", review: "Customer service handled my return in under 5 minutes. No endless automated bots, just instant, helpful support. Lifetime customer right here." },
              { id: 16, name: "Arjun D.", role: "Digital Marketer", img: "https://i.pravatar.cc/150?u=6", review: "Managed to snag a massive flash deal on noise-cancelling headphones. The live tracking and inventory updates are highly accurate." },
              { id: 17, name: "Kavya P.", role: "Freelance Designer", img: "https://i.pravatar.cc/150?u=7", review: "The aesthetics of this platform are unmatched. It makes shopping for everyday home essentials feel like a curated, premium experience." },
              { id: 18, name: "Rohan V.", role: "Cloud Architect", img: "https://i.pravatar.cc/150?u=8", review: "Finally, an e-commerce architecture that doesn't lag or feel cluttered. The search debounce is perfectly tuned. Highly reliable." }
            ]).map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="w-[350px] md:w-[400px] bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col gap-5 transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,153,0,0.15)] hover:border-[#ff9900]/30 cursor-grab active:cursor-grabbing shrink-0"
              >
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 text-[#ff9900] text-sm">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                    <i className="fa-solid fa-circle-check"></i> Verified
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 leading-relaxed text-[0.95rem] italic flex-grow">
                  "{testimonial.review}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff9900] to-[#ff3300] p-[2px]">
                      <div className="w-full h-full bg-[#0a0f16] rounded-full"></div>
                    </div>
                    <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full relative z-10 object-cover border-2 border-transparent" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[1rem] tracking-tight m-0">{testimonial.name}</h4>
                    <p className="text-[#ff9900] text-xs font-semibold m-0">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- ADVANCED CSS ANIMATIONS INJECTED DIRECTLY --- */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite linear;
          }
          @keyframes spin-slow {
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .tech-grid {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
          }
        `}
      </style>

      {/* 6. PLATFORM ECOSYSTEM (ULTRA BENTO GRID) */}
      <section className="relative px-4 sm:px-6 max-w-[1400px] mx-auto my-32 pb-10">
        {/* Animated Tech Grid Background */}
        <div className="absolute inset-0 tech-grid [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none -z-10"></div>

        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
            <div className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse"></div>
            Platform Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight drop-shadow-sm">
            The EverBuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Ecosystem</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Bento Box 1: EverBuy Obsidian (Holographic Glassmorphism) */}
          <div className="md:col-span-2 bg-[#0a0f16] rounded-[32px] p-1 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group cursor-pointer">
            {/* Rotating Holographic Orb */}
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#ff9900] via-[#ff3300] to-[#8b5cf6] blur-[100px] opacity-20 group-hover:opacity-40 animate-spin-slow rounded-full pointer-events-none transition-opacity duration-700"></div>
            
            <div className="bg-[#0f172a]/80 backdrop-blur-2xl w-full h-full rounded-[28px] p-8 md:p-12 relative z-10 border border-white/10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-brands fa-galactic-republic text-4xl text-[#ff9900] drop-shadow-[0_0_15px_rgba(255,153,0,0.8)]"></i>
                <span className="text-white/80 font-black tracking-[0.2em] uppercase text-xs">Premium Tier</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-none mb-4 tracking-tight drop-shadow-lg">
                EverBuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Obsidian</span>
              </h3>
              <p className="text-slate-400 text-lg max-w-md mb-8 font-medium">Unlock zero-friction checkout, unlimited free shipping, and exclusive early access to highly anticipated tech drops.</p>
              
              {/* Magnetic Shimmer Button */}
              <button className="relative overflow-hidden w-max bg-white text-slate-900 px-8 py-4 rounded-full font-black text-lg transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <span className="relative z-10 flex items-center gap-2">Upgrade Account <i className="fa-solid fa-arrow-right"></i></span>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 translate-x-[-150%] animate-shimmer"></div>
              </button>
            </div>
          </div>

          {/* Bento Box 2: Localized Logistics (Levitating UI) */}
          <div className="bg-gradient-to-br from-[#ff9900] to-[#ff4500] rounded-[32px] p-8 relative overflow-hidden shadow-[0_20px_40px_rgba(255,153,0,0.3)] group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
            
            {/* Speed lines background */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_50%)]"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-white/40 animate-float">
                <i className="fa-solid fa-bolt-lightning drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></i>
              </div>
              <h3 className="text-3xl font-black text-white mb-3 leading-tight tracking-tight drop-shadow-md">Hyper-Local<br/>Logistics</h3>
              <p className="text-orange-50 font-medium text-sm md:text-base leading-relaxed">EverBuy Prime same-day delivery routing is now active for all orders within your jurisdiction.</p>
              <div className="mt-auto pt-8">
                <span className="text-white font-black flex items-center gap-2 group-hover:gap-4 transition-all tracking-wide">Track Network <i className="fa-solid fa-truck-fast"></i></span>
              </div>
            </div>
          </div>

          {/* Bento Box 3: Bank-Grade Security (Neon Cyberpunk) */}
          <div className="bg-[#022c22] rounded-[32px] p-1 relative overflow-hidden shadow-[0_20px_40px_rgba(16,185,129,0.2)] group cursor-pointer">
            {/* Radar Sweep Effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-[conic-gradient(from_90deg_at_80%_20%,transparent_0deg,#10b981_360deg)] opacity-10 group-hover:opacity-30 animate-spin-slow transition-opacity duration-500"></div>

            <div className="bg-[#064e3b]/90 backdrop-blur-xl w-full h-full rounded-[28px] p-8 relative z-10 border border-[#10b981]/20 flex flex-col">
              <div className="w-16 h-16 bg-[#10b981] rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-[0_0_30px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform duration-500 border border-emerald-300">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-3xl font-black text-white mb-3 leading-tight tracking-tight">AES-256<br/>Encryption</h3>
              <p className="text-emerald-100/70 font-medium text-sm md:text-base leading-relaxed">Every transaction is tokenized. Your raw financial data never touches our servers.</p>
              
              {/* Fake Terminal Line */}
              <div className="mt-6 bg-black/40 rounded-lg p-3 font-mono text-[0.65rem] text-emerald-400 border border-emerald-900/50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Status: Fully Encrypted</span>
              </div>

              <div className="mt-auto pt-6">
                <span className="text-[#34d399] font-black flex items-center gap-2 group-hover:gap-4 transition-all tracking-wide">View Protocol <i className="fa-solid fa-code"></i></span>
              </div>
            </div>
          </div>

          {/* Bento Box 4: Mobile App (Floating 3D Mockup) */}
          <div className="md:col-span-2 bg-white rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col sm:flex-row items-center justify-between group cursor-pointer">
            <div className="relative z-10 sm:w-[55%] mb-8 sm:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                <i className="fa-brands fa-app-store-ios text-slate-800"></i> iOS & Android
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Shop from absolutely anywhere.</h3>
              <p className="text-slate-500 font-medium mb-8 text-lg">Download the EverBuy mobile app for real-time order tracking and AR product previews.</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1">
                  <i className="fa-brands fa-apple text-2xl"></i> App Store
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <i className="fa-brands fa-google-play text-2xl text-[#ff9900]"></i> Google Play
                </button>
              </div>
            </div>
            <div className="sm:w-[45%] flex justify-center sm:justify-end relative">
              {/* Massive Glowing Aura behind the phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700"></div>
              {/* Levitating Phone Icon */}
              <div className="relative animate-float">
                <i className="fa-solid fa-mobile-screen text-[12rem] text-slate-800 drop-shadow-[0_30px_30px_rgba(0,0,0,0.2)] group-hover:-translate-y-4 transition-transform duration-500 relative z-10"></i>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/10 blur-[10px] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. ULTRA CINEMATIC NEWSLETTER NODE (PILL SHAPED) */}
      <section className="relative py-32  overflow-hidden bg-[#0a0f16] border-y border-white/5">
        {/* Massive Animated Background Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-[#ff9900]/20 via-[#ff3300]/20 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Subtle Tech Grid inside the dark area */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10  max-w-[800px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-xl backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            System Online
          </div>
          <h2 className="text-5xl md:text-7xl tracking-normal font-black text-white mb-6 drop-shadow-2xl">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9900] to-[#ff3300]">Network.</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Get exclusive early access to limited tech drops, flash deals, and Obsidian tier invitations directly to your mainframe.
          </p>
          
          {/* Glowing Neon Input Field - PERFECT PILL SHAPE */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto relative group">
            {/* The outer glowing border effect - Swapped to rounded-full */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ff9900] via-[#ff3300] to-[#ff9900] rounded-full blur-lg opacity-30 group-focus-within:opacity-80 group-hover:opacity-60 transition duration-500 animate-shimmer bg-[length:200%_auto]"></div>
            
            {/* The main container - Swapped to rounded-full */}
            <div className="relative flex w-full bg-[#0f172a] rounded-full p-2 shadow-2xl border border-white/10 backdrop-blur-xl">
              
              {/* Increased left padding so the icon doesn't hit the curved edge */}
              <div className="pl-6 flex items-center justify-center text-slate-500">
                <i className="fa-solid fa-envelope"></i>
              </div>
              
              <input 
                type="email" 
                placeholder="Enter system email..." 
                className="flex-grow mr-2 ml-2 bg-transparent border-none outline-none px-4 text-white font-medium placeholder:text-slate-500 p-2 m-0.5 rounded-3xl text-lg w-full"
              />
              
              {/* The submit button - Swapped to rounded-full */}
              <button className="bg-white hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-full font-black transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95 shrink-0">
                Initialize <i className="fa-solid fa-bolt text-[#ff9900]"></i>
              </button>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 mt-6 font-medium">By initializing, you agree to our <span className="text-white underline cursor-pointer hover:text-[#ff9900]">Terms of Service</span> and <span className="text-white underline cursor-pointer hover:text-[#ff9900]">Privacy Protocol</span>.</p>
        </div>
      </section>
    </main>
  );
}