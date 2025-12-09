
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Check, ChevronDown, ChevronUp, Search, Tag, Calendar, Heart, Shield, Sparkles, UserCheck, X } from 'lucide-react';
import { Service, FAQItem, BlogPost } from '../types';

const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="bg-zinc-100 dark:bg-zinc-900 py-32 text-center relative overflow-hidden">
     <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
     <div className="container mx-auto px-6 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif mb-6 dark:text-white"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
     </div>
  </div>
);

const BookingModal = ({ service, onClose }: { service: Service; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/10 dark:bg-white/10 rounded-full text-zinc-500 dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Visual Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
            <span className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-2">{service.category}</span>
            <h2 className="text-3xl font-serif text-white mb-2">{service.title}</h2>
            <p className="text-white/80 text-sm mb-4 line-clamp-2">{service.description}</p>
            <div className="text-2xl text-white font-medium">{service.price}</div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white dark:bg-zinc-900">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                <Check size={40} />
              </div>
              <h3 className="text-2xl font-serif dark:text-white mb-4">Request Sent</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                Thank you for choosing Lumière. Our concierge team will contact you shortly to confirm your appointment for <span className="font-semibold text-zinc-900 dark:text-white">{service.title}</span>.
              </p>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-gold-500 dark:hover:bg-gold-400 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-serif dark:text-white mb-2">Book Appointment</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Fill in your details to secure your spot.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                    <input required type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-3 px-4 outline-none focus:border-gold-500 transition-colors dark:text-white rounded-t-lg" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-3 px-4 outline-none focus:border-gold-500 transition-colors dark:text-white rounded-t-lg" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-3 px-4 outline-none focus:border-gold-500 transition-colors dark:text-white rounded-t-lg" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Preferred Date</label>
                    <input required type="date" className="w-full bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-3 px-4 outline-none focus:border-gold-500 transition-colors dark:text-white rounded-t-lg" />
                </div>

                <div className="pt-4 mt-auto">
                  <button type="submit" className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold uppercase tracking-widest text-sm hover:bg-gold-500 dark:hover:bg-gold-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Confirm Booking Request
                  </button>
                  <p className="text-center text-xs text-zinc-400 mt-4">
                    By booking, you agree to our Terms of Service.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Services Page ---
export const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const categories = ['All', 'Clinical', 'Aesthetic', 'Laser', 'Injectables'];

  const services: Service[] = [
    // Clinical
    { id: 'c1', title: 'Full Body Skin Exam', description: 'Comprehensive screening for moles, growths, and skin cancer detection by board-certified dermatologists. Early detection is key to maintaining healthy skin.', price: '$200', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800', category: 'Clinical' },
    { id: 'c2', title: 'Acne Scar Treatment', description: 'Advanced multi-modality protocols using subcision, microneedling, and fillers to significantly smooth texture and reduce the appearance of scarring.', price: '$450', image: 'https://images.unsplash.com/photo-1616149562385-1d84e79478bb?q=80&w=800', category: 'Clinical' },
    { id: 'c3', title: 'Eczema & Psoriasis Care', description: 'Personalized management plans including phototherapy, biologics, and topical regimens for chronic skin conditions to restore comfort.', price: '$250', image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=800', category: 'Clinical' },

    // Aesthetic
    { id: 'a1', title: 'HydraFacial Elite', description: 'The ultimate hydration experience. Cleanse, extract, and hydrate your skin with super serums containing antioxidants, peptides, and hyaluronic acid.', price: '$250', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800', category: 'Aesthetic' },
    { id: 'a2', title: 'Medical Grade Peels', description: 'Customized chemical peels designed to target hyperpigmentation, aging, and dullness, revealing a brighter and smoother complexion.', price: '$200', image: 'https://images.unsplash.com/photo-1601614346624-9df9d2c20677?q=80&w=800', category: 'Aesthetic' },
    { id: 'a3', title: 'Diamond Glow', description: 'Next-level dermabrasion that exfoliates, extracts, and infuses skin with specific serums to target your unique skin concerns simultaneously.', price: '$300', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800', category: 'Aesthetic' },

    // Laser
    { id: 'l1', title: 'CO2 Laser Resurfacing', description: 'The gold standard for skin rejuvenation. Effectively treats deep wrinkles, significant sun damage, and acne scars with dramatic results.', price: '$1,500', image: 'https://images.unsplash.com/photo-1628146636653-b26a570083cc?q=80&w=800', category: 'Laser' },
    { id: 'l2', title: 'Laser Hair Removal', description: 'Permanent hair reduction using the latest diode laser technology, safe for all skin types and providing smooth, maintenance-free skin.', price: '$150+', image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800', category: 'Laser' },
    { id: 'l3', title: 'Vascular Laser Therapy', description: 'Targeted treatment for rosacea, spider veins, and facial redness. Restores an even skin tone without downtime.', price: '$400', image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=800', category: 'Laser' },

    // Injectables
    { id: 'i1', title: 'Botox & Dysport', description: 'Precise neuromodulator treatments to relax muscles and smooth dynamic wrinkles for a refreshed, rested appearance.', price: '$15/unit', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800', category: 'Injectables' },
    { id: 'i2', title: 'Juvederm Collection', description: 'Premium hyaluronic acid fillers to restore volume in cheeks, define lips, and contour the jawline for natural-looking enhancement.', price: '$750/syringe', image: 'https://images.unsplash.com/photo-1587315132225-b467f5379204?q=80&w=800', category: 'Injectables' },
    { id: 'i3', title: 'Kybella', description: 'FDA-approved injectable treatment to permanently destroy fat cells under the chin, improving your profile without surgery.', price: '$600/vial', image: 'https://images.unsplash.com/photo-1596702652636-eb8be77479ac?q=80&w=800', category: 'Injectables' },
  ];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div>
      <PageHeader title="Our Services" subtitle="A comprehensive menu of medical and aesthetic treatments designed to deliver visible, lasting results." />
      <div className="container mx-auto px-6 py-16">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
             <button 
               key={cat} 
               onClick={() => setActiveCategory(cat)}
               className={`px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-300 ${
                 activeCategory === cat 
                   ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg scale-105' 
                   : 'bg-transparent border border-zinc-200 dark:border-zinc-800 hover:border-gold-500 hover:text-gold-500 text-zinc-600 dark:text-zinc-400'
               }`}
             >
                {cat}
             </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div 
                 layout
                 key={service.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.3 }}
                 className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group hover:shadow-2xl hover:border-gold-500/30 transition-all duration-500 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                     {service.category}
                   </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-2xl dark:text-white group-hover:text-gold-500 transition-colors">{service.title}</h3>
                   </div>
                   <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                   <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                      <span className="text-lg font-medium dark:text-white">{service.price}</span>
                      <button 
                        onClick={() => setSelectedService(service)}
                        className="text-sm font-bold uppercase tracking-widest hover:text-gold-500 hover:gap-3 transition-all flex items-center gap-2 group"
                      >
                        Book Now <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No services found in this category.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedService && (
          <BookingModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- About Page ---
export const AboutPage = () => {
  return (
    <div>
      <PageHeader title="About Lumière" subtitle="We are a collective of medical experts passionate about skin health, blending science with serenity." />
      
      {/* Narrative Section */}
      <div className="container mx-auto px-6 py-20">
         <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1">
               <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 block">Our Story</span>
               <h2 className="text-4xl font-serif mb-6 dark:text-white leading-tight">A Sanctuary of <br/>Medical Excellence</h2>
               <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Founded in 2010 by Dr. Sarah Lumière, our clinic was born from a vision to bridge the gap between sterile medical offices and lavish day spas. We believe that receiving top-tier dermatological care should not be an intimidating experience.
               </p>
               <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  At Lumière, every treatment plan is bespoke, created after a thorough analysis of your unique skin profile, genetic factors, and lifestyle. We invest heavily in the latest FDA-approved technologies to ensure our patients receive the safest, most effective treatments available globally.
               </p>
               <div className="h-1 w-20 bg-gold-500 mt-8"></div>
            </div>
            <div className="order-1 md:order-2 h-[600px] relative">
               <div className="absolute inset-0 bg-gold-500/10 transform translate-x-4 translate-y-4 -z-10"></div>
               <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800" className="w-full h-full object-cover shadow-xl" alt="Clinic Interior"/>
            </div>
         </div>

         {/* Values / Why Choose Us */}
         <div className="mb-24">
            <h2 className="text-3xl font-serif text-center mb-16 dark:text-white">Why Choose Lumière</h2>
            <div className="grid md:grid-cols-3 gap-10">
               {[
                 { icon: Shield, title: "Safety First", text: "We strictly adhere to the highest medical safety standards. All procedures are performed by or under the supervision of board-certified dermatologists." },
                 { icon: Sparkles, title: "Cutting-Edge Tech", text: "Our clinic is equipped with the latest laser and diagnostic technology, ensuring you get the most advanced care available." },
                 { icon: UserCheck, title: "Holistic Approach", text: "We treat the patient, not just the symptom. We look at lifestyle, diet, and stress factors that may be affecting your skin health." }
               ].map((item, i) => (
                 <div key={i} className="text-center p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800/50">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gold-100 dark:bg-gold-900/20 text-gold-600 flex items-center justify-center rounded-full">
                      <item.icon size={32} />
                    </div>
                    <h3 className="text-xl font-serif mb-4 dark:text-white">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{item.text}</p>
                 </div>
               ))}
            </div>
         </div>
         
         {/* Team Section */}
         <h2 className="text-3xl font-serif text-center mb-12 dark:text-white">Meet The Team</h2>
         <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                name: "Dr. Sarah Lumière", 
                role: "Founder & Lead Dermatologist",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
              },
              { 
                name: "Dr. James Chen", 
                role: "Cosmetic Surgeon",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop"
              },
              { 
                name: "Elena Rodriguez", 
                role: "Senior Aesthetician",
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1000&auto=format&fit=crop"
              },
              { 
                name: "Michael Chang", 
                role: "Laser Specialist",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop"
              }
            ].map((staff, i) => (
              <div key={i} className="text-center group">
                 <div className="mb-6 overflow-hidden relative">
                    <img src={staff.image} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" alt={staff.name}/>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                       {/* Social icons could go here */}
                    </div>
                 </div>
                 <h4 className="font-serif text-xl dark:text-white mb-1">{staff.name}</h4>
                 <p className="text-xs uppercase tracking-widest text-gold-500">{staff.role}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

// --- Contact Page ---
export const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    { question: "Do I need a consultation before booking a treatment?", answer: "Yes, for most medical and laser treatments, a consultation is required to ensure the procedure is safe and appropriate for your skin type. Aesthetic facials can often be booked directly." },
    { question: "What is your cancellation policy?", answer: "We require 24 hours' notice for cancellations. Missed appointments or late cancellations will incur a fee of $100 or forfeiture of the deposit." },
    { question: "Do you accept insurance?", answer: "We accept most major PPO insurance plans for medical dermatology conditions (acne, rashes, skin cancer checks). Cosmetic procedures (Botox, fillers, lasers) are not covered by insurance." },
    { question: "How early should I arrive for my appointment?", answer: "Please arrive 15 minutes prior to your scheduled time to complete any necessary paperwork and enjoy a refreshment in our lounge." },
    { question: "Is there parking available?", answer: "Yes, we offer complimentary valet parking for all our patients. The valet stand is located at the main entrance of the building." },
  ];

  return (
    <div>
      <PageHeader title="Contact Us" subtitle="Begin your journey to radiant skin. Our concierge team is ready to assist you." />
      <div className="container mx-auto px-6 py-20">
         <div className="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Form */}
            <div>
               <h2 className="text-2xl font-serif mb-8 dark:text-white">Get In Touch</h2>
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-zinc-500">First Name</label>
                       <input type="text" className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-3 focus:border-gold-500 outline-none dark:text-white transition-colors" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs uppercase tracking-widest text-zinc-500">Last Name</label>
                       <input type="text" className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-3 focus:border-gold-500 outline-none dark:text-white transition-colors" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-zinc-500">Email Address</label>
                     <input type="email" className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-3 focus:border-gold-500 outline-none dark:text-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-zinc-500">Phone Number</label>
                     <input type="tel" className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-3 focus:border-gold-500 outline-none dark:text-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-zinc-500">Message</label>
                     <textarea rows={4} className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-3 focus:border-gold-500 outline-none dark:text-white transition-colors resize-none"></textarea>
                  </div>
                  <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-gold-500 dark:hover:bg-gold-400 transition-colors w-full md:w-auto shadow-lg">
                     Send Message
                  </button>
               </form>
            </div>
            
            {/* Contact Info Card */}
            <div className="bg-zinc-50 dark:bg-zinc-900 p-10 space-y-10 rounded-xl border border-zinc-100 dark:border-zinc-800">
               <div>
                  <h3 className="font-serif text-xl mb-4 dark:text-white flex items-center gap-3"><MapPin className="text-gold-500"/> Visit Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 ml-9 leading-relaxed">
                     123 Luxury Avenue, Suite 400<br/>
                     Beverly Hills, CA 90210<br/>
                     <span className="text-xs text-zinc-400 mt-2 block">Valet parking available at entrance.</span>
                  </p>
               </div>
               <div>
                  <h3 className="font-serif text-xl mb-4 dark:text-white flex items-center gap-3"><Phone className="text-gold-500"/> Call Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 ml-9 text-lg">
                     +1 (555) 123-4567
                  </p>
                  <p className="text-zinc-500 text-xs ml-9 mt-1">Mon-Fri 9am-6pm</p>
               </div>
               <div>
                  <h3 className="font-serif text-xl mb-4 dark:text-white flex items-center gap-3"><Mail className="text-gold-500"/> Email Us</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 ml-9">
                     concierge@lumierederm.com
                  </p>
               </div>
               <div>
                  <h3 className="font-serif text-xl mb-4 dark:text-white flex items-center gap-3"><Clock className="text-gold-500"/> Opening Hours</h3>
                  <div className="ml-9 text-zinc-600 dark:text-zinc-400 space-y-2">
                     <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></div>
                     <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></div>
                     <div className="flex justify-between"><span>Sunday</span> <span>Closed</span></div>
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 group"
                  >
                    <span className="font-medium text-lg dark:text-white pr-8">{faq.question}</span>
                    {openFaq === index ? <ChevronUp className="text-gold-500 flex-shrink-0"/> : <ChevronDown className="text-zinc-400 flex-shrink-0"/>}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Blog Page ---
export const BlogPage = () => {
    const posts: BlogPost[] = [
        { id: '1', title: 'The Ultimate Guide to Retinols in Winter', excerpt: 'Discover how to adapt your skincare routine for the colder months while maintaining that summer glow without irritation.', date: 'Oct 24, 2024', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800', category: 'Skincare', author: 'Dr. Sarah Lumière' },
        { id: '2', title: 'Laser Resurfacing: What to Expect', excerpt: 'A comprehensive look at downtime, results, and aftercare for our most popular anti-aging treatment.', date: 'Oct 18, 2024', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800', category: 'Treatments', author: 'Dr. James Chen' },
        { id: '3', title: 'The Science Behind Hyaluronic Acid', excerpt: 'Why this miracle molecule is essential for hydration and how to choose the right product for your skin type.', date: 'Oct 10, 2024', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800', category: 'Ingredients', author: 'Elena Rodriguez' },
        { id: '4', title: '5 Foods for Radiant Skin', excerpt: 'Nutrition plays a vital role in skin health. Here are the top superfoods to incorporate into your diet today.', date: 'Sep 28, 2024', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800', category: 'Wellness', author: 'Dr. Sarah Lumière' },
    ];

    const categories = ["All", "Skincare", "Treatments", "Wellness", "Ingredients"];
    const tags = ["Anti-Aging", "Acne", "Hydration", "Laser", "Botox", "Summer", "Routine"];

    return (
        <div>
            <PageHeader title="The Journal" subtitle="Expert advice, skincare trends, and clinic news curated by our medical team." />
            <div className="container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {posts.map((post) => (
                            <Link 
                                key={post.id} 
                                to={`/blog/${post.id}`}
                                className="group block cursor-pointer border-b border-zinc-100 dark:border-zinc-800 pb-12 last:border-0"
                            >
                                <div className="h-[400px] overflow-hidden mb-6 rounded-lg relative">
                                    <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.title}/>
                                    <div className="absolute top-4 left-4 bg-white dark:bg-black px-4 py-1 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white shadow-lg">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                                    <span>•</span>
                                    <span>By {post.author}</span>
                                </div>
                                <h3 className="text-3xl font-serif mb-4 dark:text-white group-hover:text-gold-500 transition-colors leading-tight">{post.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                                <span className="text-sm font-bold uppercase tracking-widest border-b-2 border-zinc-200 dark:border-zinc-800 pb-1 group-hover:border-gold-500 group-hover:text-gold-500 transition-all duration-300 inline-block">Read Article</span>
                            </Link>
                        ))}
                        
                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-3 pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-800">
                            {[1, 2, 3].map(i => (
                                <button key={i} className={`w-12 h-12 flex items-center justify-center border text-sm font-medium ${i === 1 ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900'} rounded-lg hover:bg-gold-500 hover:border-gold-500 hover:text-white transition-colors`}>
                                    {i}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        {/* Search */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
                           <h4 className="font-serif text-xl mb-6 dark:text-white">Search Journal</h4>
                           <div className="relative">
                              <input type="text" placeholder="Type and hit enter..." className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 pl-10 outline-none focus:border-gold-500 dark:text-white rounded-lg transition-colors" />
                              <Search className="absolute left-3 top-3.5 text-zinc-400" size={18} />
                           </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
                           <h4 className="font-serif text-xl mb-6 dark:text-white">Categories</h4>
                           <ul className="space-y-3">
                              {categories.map(cat => (
                                  <li key={cat} className="flex justify-between items-center text-zinc-600 dark:text-zinc-400 hover:text-gold-500 cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                                      <span>{cat}</span>
                                      <span className="text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-300">{(Math.random() * 10).toFixed(0)}</span>
                                  </li>
                              ))}
                           </ul>
                        </div>

                        {/* Recent Posts Mini */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
                           <h4 className="font-serif text-xl mb-6 dark:text-white">Popular Posts</h4>
                           <div className="space-y-6">
                              {posts.slice(0, 3).map(post => (
                                  <div key={post.id} className="flex gap-4 cursor-pointer group">
                                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                                          <img src={post.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Thumb"/>
                                      </div>
                                      <div>
                                          <h5 className="font-serif text-sm dark:text-white leading-snug mb-1 group-hover:text-gold-500 transition-colors line-clamp-2">{post.title}</h5>
                                          <span className="text-xs text-zinc-500">{post.date}</span>
                                      </div>
                                  </div>
                              ))}
                           </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
                           <h4 className="font-serif text-xl mb-6 dark:text-white">Tags</h4>
                           <div className="flex flex-wrap gap-2">
                               {tags.map(tag => (
                                   <span key={tag} className="text-xs px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-gold-500 hover:text-white hover:border-gold-500 cursor-pointer transition-all">
                                       #{tag}
                                   </span>
                               ))}
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Blog Detail Page ---
export const BlogDetailPage = () => {
    const posts: BlogPost[] = [
        { id: '1', title: 'The Ultimate Guide to Retinols in Winter', excerpt: 'Discover how to adapt your skincare routine for the colder months while maintaining that summer glow without irritation.', date: 'Oct 24, 2024', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800', category: 'Skincare', author: 'Dr. Sarah Lumière' },
        { id: '2', title: 'Laser Resurfacing: What to Expect', excerpt: 'A comprehensive look at downtime, results, and aftercare for our most popular anti-aging treatment.', date: 'Oct 18, 2024', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800', category: 'Treatments', author: 'Dr. James Chen' },
        { id: '3', title: 'The Science Behind Hyaluronic Acid', excerpt: 'Why this miracle molecule is essential for hydration and how to choose the right product for your skin type.', date: 'Oct 10, 2024', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800', category: 'Ingredients', author: 'Elena Rodriguez' },
        { id: '4', title: '5 Foods for Radiant Skin', excerpt: 'Nutrition plays a vital role in skin health. Here are the top superfoods to incorporate into your diet today.', date: 'Sep 28, 2024', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800', category: 'Wellness', author: 'Dr. Sarah Lumière' },
    ];

    // Get post ID from URL - using window.location since we're using HashRouter
    const postId = window.location.hash.split('/blog/')[1];
    const post = posts.find(p => p.id === postId) || posts[0];

    return (
        <div>
            <div className="bg-zinc-100 dark:bg-zinc-900 py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-4 block">{post.category}</span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif mb-6 dark:text-white max-w-3xl mx-auto"
                    >
                        {post.title}
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-4 text-xs text-zinc-500 uppercase tracking-widest"
                    >
                        <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                        <span>•</span>
                        <span>By {post.author}</span>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="h-[500px] overflow-hidden mb-12 rounded-lg">
                        <img src={post.image} className="w-full h-full object-cover" alt={post.title}/>
                    </div>
                    
                    <div className="prose dark:prose-invert prose-zinc max-w-none">
                        <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <h3 className="text-2xl font-serif dark:text-white mt-10 mb-4">Key Takeaways</h3>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 mb-6">
                            <li>Always consult with a dermatologist before starting new treatments</li>
                            <li>Consistency is key for seeing results</li>
                            <li>Sun protection is essential regardless of the season</li>
                            <li>Listen to your skin and adjust your routine accordingly</li>
                        </ul>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            For personalized advice tailored to your specific skin concerns, we recommend scheduling a consultation with one of our expert dermatologists at Lumière.
                        </p>
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link 
                            to="/blog" 
                            className="inline-flex items-center gap-2 px-8 py-3 border border-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-lg transition-all duration-300"
                        >
                            ← Back to Journal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const PricingPage = () => {
  const plans = [
    {
      name: "Essential",
      price: "$199",
      period: "/month",
      description: "Perfect for maintaining a healthy glow and addressing minor concerns.",
      features: ["Monthly HydraFacial or Peel", "10% Off Skincare Products", "Priority Booking", "Virtual Consultation", "Birthday Gift"]
    },
    {
      name: "Lumière Elite",
      price: "$499",
      period: "/month",
      description: "Comprehensive care for correction and significant rejuvenation.",
      features: ["Monthly Laser, Peel or Microneedling", "20% Off Skincare Products", "Quarterly Botox (20 units)", "VIP Event Access", "24/7 Concierge Support"],
      featured: true
    },
    {
      name: "Signature",
      price: "$999",
      period: "/month",
      description: "The ultimate transformation package for total skin wellness.",
      features: ["Unlimited Laser Treatments", "30% Off Skincare Products", "Quarterly Filler or Botox", "Private Suite Access", "Home Care Kit Included", "Complimentary Valet"]
    }
  ];

  return (
    <div>
      <PageHeader title="Membership Pricing" subtitle="Invest in yourself with our exclusive membership tiers designed for consistent, long-term results." />
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border flex flex-col ${plan.featured ? 'border-gold-500 bg-zinc-900 text-white shadow-2xl scale-105 z-10' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white'}`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-serif mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 leading-relaxed ${plan.featured ? 'text-zinc-300' : 'text-zinc-500'}`}>{plan.description}</p>
              <div className="mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-700/50">
                <span className="text-4xl font-serif">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={18} className={plan.featured ? 'text-gold-400' : 'text-gold-500'} />
                    <span className={plan.featured ? 'text-zinc-200' : 'text-zinc-600 dark:text-zinc-300'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 font-bold text-sm uppercase tracking-widest rounded-lg transition-colors ${plan.featured ? 'bg-gold-500 text-white hover:bg-gold-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            All memberships require a 6-month minimum commitment. Unused treatments roll over for up to 3 months. 
            Cancellations require 30 days notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage = () => (
  <div>
    <PageHeader title="Privacy Policy" subtitle="Your privacy is of utmost importance to us." />
    <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, book an appointment, or sign up for our newsletter. This may include your name, email address, phone number, and medical history relevant to your skin health.</p>
          <h3>2. How We Use Information</h3>
          <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions, send you appointment reminders, and provide personalized skincare recommendations.</p>
          <h3>3. Information Sharing</h3>
          <p>We do not share your personal information with third parties except as described in this policy or with your consent. We may share information with HIPAA-compliant service providers who assist in our operations.</p>
          <h3>4. Data Security</h3>
          <p>We use reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. Our patient portal uses bank-level encryption.</p>
        </div>
    </div>
  </div>
);

export const TermsPage = () => (
  <div>
    <PageHeader title="Terms of Service" subtitle="Please read these terms carefully before using our services." />
     <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="prose dark:prose-invert prose-zinc max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using our services, you agree to be bound by these Terms. If you do not agree to all of these Terms, do not use our services.</p>
          <h3>2. Medical Disclaimer</h3>
          <p>The content on this website is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          <h3>3. Booking & Cancellations</h3>
          <p>Appointments must be cancelled at least 24 hours in advance to avoid a cancellation fee of $100. Late arrivals greater than 15 minutes may result in reduced treatment time or need to be rescheduled.</p>
          <h3>4. Payment Terms</h3>
          <p>Payment is due at the time of service. We accept major credit cards, cash, and CareCredit. A deposit may be required to secure certain extensive procedures.</p>
        </div>
    </div>
  </div>
);
