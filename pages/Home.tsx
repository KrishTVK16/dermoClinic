import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, Play, MessageCircle, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '../types';
import { generateSkinAdvice } from '../services/gemini';

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Clinic" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/70 dark:to-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl text-center mx-auto"
        >
          <span className="text-gold-400 uppercase tracking-[0.25em] text-xs font-bold mb-6 block">Excellence in Aesthetics</span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-[1.1]">
            Reveal Your <br />
            <span className="italic text-gold-200 font-light">Natural Radiance</span>
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            Where advanced medical science meets luxury care. Experience personalized dermatology treatments designed for your unique skin journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-16 justify-center">
            <Link to="/contact" className="px-10 py-4 bg-white text-zinc-950 font-semibold hover:bg-gold-500 hover:text-white transition-all duration-300 text-center tracking-wide text-sm uppercase">
              Book Appointment
            </Link>
            <Link to="/services" className="px-10 py-4 border border-white/20 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 tracking-wide text-sm uppercase">
              <Play size={16} fill="currentColor" /> View Treatments
            </Link>
          </div>

          {/* New Minimalistic Info Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-white/60 text-xs uppercase tracking-widest font-medium border-t border-white/10 pt-8 max-w-2xl mx-auto"
          >
             <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <MapPin size={16} className="text-gold-500" />
                <span>Beverly Hills, CA</span>
             </div>
             <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <Clock size={16} className="text-gold-500" />
                <span>Today: 9am - 6pm</span>
             </div>
             <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <ShieldCheck size={16} className="text-gold-500" />
                <span>Board Certified</span>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <div className="p-8">
        <span className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-2 block">{service.category}</span>
        <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-gold-500 transition-colors dark:text-white">{service.title}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">{service.description}</p>
        <Link to={`/services/${service.id}`} className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:gap-3 hover:text-gold-500 transition-all duration-300 group">
          Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const AIConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    const result = await generateSkinAdvice(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-zinc-900 dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
          AI Skin Assistant
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/50 backdrop-blur-sm"
               onClick={() => setIsOpen(false)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
             >
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-serif text-xl">Lumière AI Consultant</h3>
                    <p className="text-zinc-400 text-sm mt-1">Ask me about your skin concerns.</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white hover:rotate-90 transition-all duration-300"><ArrowRight className="rotate-45" /></button>
                </div>
                
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  {response ? (
                    <div className="space-y-4">
                      <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg rounded-tl-none">
                        <p className="text-sm font-semibold mb-1 text-zinc-900 dark:text-white">You asked:</p>
                        <p className="text-zinc-600 dark:text-zinc-300 italic">"{query}"</p>
                      </div>
                      <div className="bg-gold-50/50 dark:bg-gold-900/10 border border-gold-100 dark:border-gold-900/30 p-4 rounded-lg rounded-tr-none">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                           <p className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest">AI Analysis</p>
                        </div>
                        <p className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
                      </div>
                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={() => { setResponse(null); setQuery(''); }}
                          className="text-xs text-zinc-400 hover:text-gold-500 underline hover:no-underline transition-all duration-300"
                        >
                          Ask another question
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleConsult} className="space-y-4">
                      <div>
                        <textarea 
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="E.g., I have dry skin in winter and need a routine..."
                          className="w-full h-32 p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg resize-none focus:ring-1 focus:ring-gold-500 outline-none dark:text-white"
                        />
                      </div>
                      <button 
                        disabled={loading || !query.trim()}
                        className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-gold-500 dark:hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? 'Analyzing...' : 'Get Recommendation'}
                      </button>
                    </form>
                  )}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main Home Page ---

export const HomePage = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'Laser Resurfacing',
      description: 'Advanced fractional laser technology to reduce wrinkles, scars, and pigmentation for smoother texture.',
      category: 'clinical',
      price: '$500',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800'
    },
    {
      id: '2',
      title: 'HydraFacial Elite',
      description: 'The ultimate hydration experience. Cleanse, extract, and hydrate your skin with super serums.',
      category: 'aesthetic',
      price: '$250',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800'
    },
    {
      id: '3',
      title: 'Dermal Fillers',
      description: 'Restore volume and contour to your face with our premium collection of hyaluronic acid fillers.',
      category: 'clinical',
      price: '$700',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800'
    }
  ];

  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      {/* Introduction */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500/50" />
             <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-500/50" />
             <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800" alt="Clinic Interior" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-xl" />
          </div>
          <div className="text-center">
            <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 block">About Lumière</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 dark:text-white leading-tight">Redefining the Art of <br/> <span className="italic text-zinc-500 dark:text-zinc-400">Dermatology</span></h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-loose mb-8 max-w-xl mx-auto">
              Founded by Dr. Sarah Lumière, our clinic represents the pinnacle of skin health innovation. We believe that true beauty stems from health, and our holistic approach combines state-of-the-art technology with time-honored aesthetic principles.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8 max-w-md mx-auto">
              <div>
                <h4 className="text-3xl font-serif dark:text-white mb-2">15+</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif dark:text-white mb-2">10k+</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Happy Patients</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link to="/about" className="inline-flex items-center gap-2 text-zinc-900 dark:text-white border-b border-zinc-900 dark:border-white pb-1 hover:text-gold-500 hover:border-gold-500 hover:gap-3 transition-all duration-300 group">
                Read Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 block">Our Expertise</span>
            <h2 className="text-4xl font-serif dark:text-white mb-4">Curated Treatments</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Scientifically proven procedures tailored to your unique skin profile.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/services" className="inline-block px-8 py-3 border border-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-800/30 skew-x-12 transform origin-top" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 text-center">
                <div className="flex text-gold-500 mb-6 gap-1 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-zinc-200 max-w-xl mx-auto">
                  "The attention to detail at Lumière is unmatched. From the moment you walk in, you feel taken care of. My skin has never looked better."
                </blockquote>
                <div>
                  <p className="font-bold text-lg">Emily R.</p>
                  <p className="text-zinc-400 text-sm">Corrective Laser Patient</p>
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                 {[
                   "Board Certified Dermatologists",
                   "FDA Approved Technologies",
                   "Private Recovery Suites",
                   "Customized Care Plans"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 border border-white/10">
                     <CheckCircle size={20} className="text-gold-500 flex-shrink-0" />
                     <span className="text-sm font-medium">{item}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      <AIConsultant />
    </div>
  );
};

// --- Home 2 (Shop/Product Variant) ---
export const HomeVariant = () => {
    const productImages = [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400",
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400",
        "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=400",
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400"
    ]
    return (
        <div className="pt-24 container mx-auto px-6 text-center">
            <h1 className="text-4xl font-serif mb-4 dark:text-white">Lumière Skincare Shop</h1>
            <p className="mb-8 dark:text-zinc-400">Professional grade skincare delivered to your door.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map((item, i) => (
                    <div key={i} className="bg-zinc-50 dark:bg-zinc-900 p-4">
                        <img src={productImages[i]} className="w-full h-64 object-cover mb-4 grayscale hover:grayscale-0 transition-all" alt="Product"/>
                        <h3 className="font-serif dark:text-white">Vitamin C Serum {item}</h3>
                        <p className="text-gold-500 mt-2">$85.00</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- Home V2: Premium High-Tech Medical Design ---
import { Activity, Microscope, TestTube, Award, Users, Zap, Heart, Shield, ChevronRight, Stethoscope, Brain, Dna, FlaskConical, Scan, CircleDot } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (!hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      }}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
};

// Floating Particles Background
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Hero Section V2
const HeroSectionV2 = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <FloatingParticles />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8 mx-auto lg:mx-0"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium tracking-wide">Advanced Dermatological Science</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-center lg:text-left">
              Precision
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skin Diagnostics
              </span>
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed text-center lg:text-left">
              Experience next-generation dermatology powered by AI analysis, advanced imaging, and personalized treatment protocols designed for your unique skin biology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/contact" 
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Book Skin Analysis
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services" 
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Scan size={18} /> View Diagnostics
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md mx-auto lg:mx-0">
              {[
                { value: 98, suffix: '%', label: 'Accuracy Rate' },
                { value: 15000, suffix: '+', label: 'Patients Analyzed' },
                { value: 24, suffix: '/7', label: 'AI Monitoring' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800" 
                  alt="Advanced Diagnostics"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Activity size={20} className="text-green-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Skin Health</div>
                      <div className="text-green-400 text-xs">Optimal</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Brain size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">AI Analysis</div>
                      <div className="text-cyan-400 text-xs">Processing...</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* DNA Helix Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -right-10 w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center"
              >
                <Dna size={40} className="text-cyan-400/50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-zinc-950"/>
        </svg>
      </div>
    </section>
  );
};

// Services Section V2
const ServicesSectionV2 = () => {
  const services = [
    {
      icon: Microscope,
      title: 'Advanced Skin Analysis',
      description: 'AI-powered dermoscopy with 200x magnification for precise lesion analysis and early detection.',
      color: 'cyan',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600'
    },
    {
      icon: TestTube,
      title: 'Lab Diagnostics',
      description: 'Comprehensive skin biomarker testing including hormone panels and genetic predisposition analysis.',
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600'
    },
    {
      icon: Zap,
      title: 'Laser Treatments',
      description: 'State-of-the-art laser technology for resurfacing, pigmentation, and vascular treatments.',
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600'
    },
    {
      icon: FlaskConical,
      title: 'Custom Formulations',
      description: 'Personalized skincare compounds created from your diagnostic results.',
      color: 'emerald',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600'
    },
  ];

  const colorClasses: { [key: string]: { bg: string; text: string; border: string; shadow: string } } = {
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', shadow: 'group-hover:shadow-cyan-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', shadow: 'group-hover:shadow-purple-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', shadow: 'group-hover:shadow-blue-500/20' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', shadow: 'group-hover:shadow-emerald-500/20' },
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-medium mb-6">
            <Stethoscope size={16} /> Our Diagnostic Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Precision Medicine for Your Skin
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Cutting-edge diagnostic tools combined with expert dermatological care for accurate, personalized treatment plans.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:shadow-xl ${colorClasses[service.color].shadow} transition-all duration-500 w-full max-w-sm`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent" />
              </div>
              <div className="p-6 relative text-center md:text-left">
                <div className={`w-12 h-12 ${colorClasses[service.color].bg} ${colorClasses[service.color].border} border rounded-xl flex items-center justify-center mb-4 -mt-12 relative z-10 bg-white dark:bg-zinc-900 mx-auto md:mx-0`}>
                  <service.icon size={24} className={colorClasses[service.color].text} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <Link 
                  to="/services" 
                  className={`inline-flex items-center gap-1 text-sm font-medium ${colorClasses[service.color].text} hover:gap-2 transition-all mx-auto md:mx-0`}
                >
                  Learn More <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats & Trust Section
const TrustSectionV2 = () => {
  const stats = [
    { icon: Users, value: 15000, suffix: '+', label: 'Patients Treated', color: 'cyan' },
    { icon: Award, value: 25, suffix: '+', label: 'Years Experience', color: 'purple' },
    { icon: Activity, value: 98, suffix: '%', label: 'Success Rate', color: 'blue' },
    { icon: Shield, value: 100, suffix: '%', label: 'FDA Approved', color: 'emerald' },
  ];

  const certifications = [
    { name: 'Board Certified', icon: Award },
    { name: 'HIPAA Compliant', icon: Shield },
    { name: 'ISO 9001', icon: CheckCircle },
    { name: 'AAD Member', icon: Heart },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 justify-items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 w-full max-w-xs"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <stat.icon size={32} className="text-cyan-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-400 uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-white text-xl font-medium mb-8">Trusted & Certified</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <cert.icon size={18} className="text-cyan-400" />
                <span className="text-white text-sm font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section V2
const TestimonialsSectionV2 = () => {
  const testimonials = [
    {
      quote: "The AI skin analysis identified issues my previous dermatologist missed. The precision of their diagnostics is truly remarkable.",
      author: "Dr. Sarah Mitchell",
      role: "Referred Physician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200",
      rating: 5
    },
    {
      quote: "After years of struggling with chronic skin conditions, their comprehensive lab work finally gave me answers and a treatment that works.",
      author: "Michael Chen",
      role: "Patient - 3 Years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      rating: 5
    },
    {
      quote: "The technology here is next level. Real-time monitoring of my treatment progress through their app keeps me informed and confident.",
      author: "Amanda Rodriguez",
      role: "Laser Treatment Patient",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-6">
            <Heart size={16} /> Patient Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Real results from real patients who've experienced our precision dermatology approach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-sm flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center md:justify-start">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 italic flex-grow text-center md:text-left">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4 justify-center md:justify-start mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30 flex-shrink-0"
                />
                <div className="text-center md:text-left">
                  <div className="font-bold text-slate-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASectionV2 = () => {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 rounded-3xl p-12 md:p-16 overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8"
            >
              <CircleDot size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-white text-sm font-medium">Limited Availability This Month</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Precision<br />Skin Diagnostics?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              Schedule your comprehensive skin analysis today. Our AI-powered diagnostic system combined with expert dermatologists ensures you get the most accurate assessment possible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="group px-10 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Book Your Analysis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services" 
                className="px-10 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                View All Services
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10">
              {['No Wait Time', 'Same Day Results', 'Insurance Accepted'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <CheckCircle size={16} className="text-cyan-400" />
                  <span className="text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Page V2
export const HomePageV2 = () => {
  return (
    <div className="overflow-hidden">
      <HeroSectionV2 />
      <ServicesSectionV2 />
      <TrustSectionV2 />
      <TestimonialsSectionV2 />
      <CTASectionV2 />
      <AIConsultant />
    </div>
  );
}