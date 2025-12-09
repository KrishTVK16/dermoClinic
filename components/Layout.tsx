import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, ArrowRight, Instagram, Twitter, Linkedin, Facebook, LayoutDashboard, Users, ShoppingBag, FileText, Settings, Sparkles, Check } from 'lucide-react';

// --- Types ---
interface LayoutProps {
  children: React.ReactNode;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// --- Header ---
export const Header: React.FC<{ theme: 'dark' | 'light'; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-4 shadow-sm border-b border-zinc-200 dark:border-zinc-800' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-50 group">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded-sm font-serif italic font-bold text-xl group-hover:bg-gold-500 transition-colors duration-300">
              L
            </div>
            <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-zinc-900 dark:text-white' : 'text-zinc-900 dark:text-white'}`}>
              Lumière
            </span>
          </div>
        </Link>

        {/* Desktop Nav - hidden at 1024px and below */}
        <nav className="hidden desktop:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold-500 ${
                location.pathname === link.path ? 'text-gold-500' : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300">Admin</Link>
        </nav>

        {/* Actions - hidden at 1024px and below */}
        <div className="hidden desktop:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/contact" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2 rounded-sm text-sm font-medium hover:bg-gold-500 dark:hover:bg-gold-400 transition-all duration-300">
            Book Appointment
          </Link>
        </div>

        {/* Mobile Toggle - visible at 1024px and below */}
        <button 
          className="desktop:hidden z-50 text-zinc-900 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 touch-none overscroll-none ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile Menu Panel - 45% width, 60% height, from right */}
      <div className={`fixed top-0 right-0 w-[45%] h-[60%] bg-white dark:bg-zinc-900 z-40 flex flex-col items-center justify-center rounded-bl-2xl shadow-2xl transition-transform duration-300 overscroll-none ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-serif mb-4 hover:text-gold-500 dark:text-zinc-200 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs uppercase tracking-widest rounded-full hover:bg-gold-500 dark:hover:bg-gold-400 transition-all duration-300"
          >
            Admin
          </Link>
      </div>
    </header>
  );
};

// --- Footer ---
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded-sm font-serif italic font-bold">L</div>
                <span className="font-serif text-2xl font-bold dark:text-white">Lumière</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Combining medical expertise with aesthetic artistry. We provide world-class dermatological care in a sanctuary of calm.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-gold-500 hover:text-gold-500 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-gold-500 hover:text-gold-500 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-gold-500 hover:text-gold-500 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 dark:text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Our Services</Link></li>
              <li><Link to="/blog" className="hover:text-gold-500 transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
              <li><Link to="/pricing" className="hover:text-gold-500 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 dark:text-white">Services</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Laser Treatments</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Injectables</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Medical Dermatology</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Skin Analysis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 dark:text-white">Newsletter</h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">Subscribe for skincare tips and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="bg-white dark:bg-zinc-800 border-none outline-none px-4 py-3 text-sm flex-grow dark:text-white focus:ring-1 focus:ring-gold-500" 
                required
              />
              <button type="submit" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 hover:bg-gold-500 dark:hover:bg-gold-400 transition-colors">
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
          <p>&copy; 2025 Lumière Dermatology. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Client Layout Wrapper ---
export const ClientLayout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow pt-16 desktop:pt-0">{children}</main>
      <Footer />
    </div>
  );
};

// --- Admin Layout Wrapper ---
export const AdminLayout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Patients', path: '/admin/users' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: FileText, label: 'Blog Posts', path: '/admin/posts' },
    { icon: Sparkles, label: 'Services', path: '/admin/services' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <div className={`min-h-screen flex bg-zinc-50 dark:bg-zinc-950 ${theme}`}>
      {/* Sidebar Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
           <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded-sm font-serif text-sm font-bold">L</div>
            <span className="font-serif text-lg font-bold dark:text-white">Lumière Admin</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-gold-600 dark:text-gold-400' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};