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
          className="max-w-4xl"
        >
          <span className="text-gold-400 uppercase tracking-[0.25em] text-xs font-bold mb-6 block border-l-2 border-gold-500 pl-4">Excellence in Aesthetics</span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-[1.1]">
            Reveal Your <br />
            <span className="italic text-gold-200 font-light">Natural Radiance</span>
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl mb-12 max-w-xl font-light leading-relaxed tracking-wide">
            Where advanced medical science meets luxury care. Experience personalized dermatology treatments designed for your unique skin journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-16">
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
            className="flex flex-wrap items-center gap-8 md:gap-12 text-white/60 text-xs uppercase tracking-widest font-medium border-t border-white/10 pt-8 max-w-2xl"
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
          <div>
            <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 block">About Lumière</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 dark:text-white leading-tight">Redefining the Art of <br/> <span className="italic text-zinc-500 dark:text-zinc-400">Dermatology</span></h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-loose mb-8">
              Founded by Dr. Sarah Lumière, our clinic represents the pinnacle of skin health innovation. We believe that true beauty stems from health, and our holistic approach combines state-of-the-art technology with time-honored aesthetic principles.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-3xl font-serif dark:text-white mb-2">15+</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif dark:text-white mb-2">10k+</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Happy Patients</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start">
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
              <div className="lg:w-1/2">
                <div className="flex text-gold-500 mb-6 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-zinc-200">
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