import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, ArrowRight, Instagram, Twitter, Linkedin, Facebook, LayoutDashboard, Users, ShoppingBag, FileText, Settings, Sparkles, Check, ChevronDown, Home, Zap, LogOut, Shield } from 'lucide-react';

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
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isMobileHomeOpen, setIsMobileHomeOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });
  const homeDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size and track desktop state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    // Check on mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (homeDropdownRef.current && !homeDropdownRef.current.contains(event.target as Node)) {
        setIsHomeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const homeOptions = [
    { name: 'Classic Home', path: '/', icon: Home, description: 'Elegant & Refined' },
    { name: 'High-Tech Home', path: '/home-v2', icon: Zap, description: 'Modern & Futuristic' },
  ];

  const navLinks = [
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
          : 'bg-white/95 dark:bg-transparent backdrop-blur-sm py-6'
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

        {/* Desktop Nav - hidden on mobile/tablet, visible on desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home Dropdown */}
          <div className="relative" ref={homeDropdownRef}>
            <button 
              onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold-500 flex items-center gap-1 ${
                location.pathname === '/' || location.pathname === '/home-v2' ? 'text-gold-500' : 'text-zinc-900 dark:text-zinc-300'
              }`}
            >
              Home
              <ChevronDown size={14} className={`transition-transform duration-200 ${isHomeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 ${isHomeDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="p-2">
                {homeOptions.map((option) => (
                  <Link
                    key={option.path}
                    to={option.path}
                    onClick={() => setIsHomeDropdownOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                      location.pathname === option.path 
                        ? 'bg-gold-50 dark:bg-gold-500/10' 
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      location.pathname === option.path 
                        ? 'bg-gold-500 text-white' 
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-gold-500 group-hover:text-white'
                    }`}>
                      <option.icon size={18} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        location.pathname === option.path 
                          ? 'text-gold-600 dark:text-gold-400' 
                          : 'text-zinc-900 dark:text-white'
                      }`}>
                        {option.name}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{option.description}</div>
                    </div>
                    {location.pathname === option.path && (
                      <Check size={16} className="ml-auto text-gold-500" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold-500 ${
                location.pathname === link.path ? 'text-gold-500' : 'text-zinc-900 dark:text-zinc-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin" 
            className="flex items-center gap-2 bg-gold-500 dark:bg-gold-500 text-white dark:text-white px-5 py-2.5 rounded-full hover:bg-gold-600 dark:hover:bg-gold-600 transition-all duration-300 text-sm font-medium shadow-lg shadow-gold-500/30 hover:shadow-gold-500/40"
          >
            <Shield size={16} />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Actions - hidden on mobile/tablet, visible on desktop */}
        <div className="hidden lg:flex items-center gap-4">
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

        {/* Mobile/Tablet Actions - visible on mobile/tablet, hidden on desktop */}
        {!isDesktop && (
          <div className="lg:hidden flex items-center gap-3">
          {/* Theme Toggle - hidden when menu is open, visible when menu is closed */}
          {!isMobileMenuOpen && (
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white z-50"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          {/* Hamburger Menu Toggle */}
          <button 
            className="z-50 text-zinc-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        )}
      </div>

      {/* Mobile Menu Backdrop - Hidden on desktop */}
      {!isDesktop && (
        <div 
          className={`lg:hidden fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 touch-none overscroll-none ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu Panel - 75% height, scrollable, from right - Hidden on desktop */}
      {!isDesktop && (
        <div className={`lg:hidden fixed top-0 right-0 w-[55%] sm:w-[40%] md:w-[35%] max-w-sm h-[75dvh] max-h-[75dvh] bg-white dark:bg-zinc-900 z-40 flex flex-col rounded-bl-2xl shadow-2xl transition-transform duration-300 overflow-hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
          <div className="flex flex-col items-center justify-start py-8 px-6">
            {/* Mobile Home Dropdown */}
            <div className="mb-6 w-full flex flex-col items-center">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileHomeOpen(!isMobileHomeOpen);
                }}
                className="text-lg font-serif hover:text-gold-500 dark:text-zinc-200 transition-colors flex items-center gap-2 justify-center w-full py-2 z-50 relative"
                aria-expanded={isMobileHomeOpen}
                aria-label="Toggle home options"
              >
                Home
                <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileHomeOpen ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`w-full transition-all duration-300 ease-in-out ${
                  isMobileHomeOpen 
                    ? 'max-h-48 opacity-100 mt-3' 
                    : 'max-h-0 opacity-0 mt-0 overflow-hidden'
                }`}
                style={{
                  transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out'
                }}
              >
                <div className="space-y-2 w-full">
                  {homeOptions.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileMenuOpen(false);
                        setIsMobileHomeOpen(false);
                      }}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all w-full ${
                        location.pathname === option.path 
                          ? 'bg-gold-50 dark:bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <option.icon size={16} />
                      <span>{option.name}</span>
                      {location.pathname === option.path && <Check size={14} className="ml-auto" />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif mb-4 hover:text-gold-500 dark:text-zinc-200 transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Link - Primary CTA */}
            <Link 
              to="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 px-6 py-2.5 bg-gold-500 dark:bg-gold-500 text-white dark:text-white text-sm font-medium rounded-full hover:bg-gold-600 dark:hover:bg-gold-600 transition-all duration-300 shadow-lg shadow-gold-500/30"
            >
              <Shield size={16} />
              <span>Admin</span>
            </Link>
            
            {/* Book Appointment CTA - Secondary CTA */}
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 w-full max-w-xs flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-gold-500 dark:border-gold-500 text-gold-600 dark:text-gold-400 bg-transparent dark:bg-transparent rounded-full text-sm font-medium hover:bg-gold-50 dark:hover:bg-gold-500/10 hover:border-gold-600 dark:hover:border-gold-600 transition-all duration-300 text-center"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
      )}
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
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// --- Admin Layout Wrapper ---
export const AdminLayout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className={`min-h-screen flex bg-zinc-50 dark:bg-zinc-950 ${theme}`} style={{ overflowX: 'hidden' }}>
      {/* Sidebar Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
           <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center rounded-sm font-serif text-sm font-bold">L</div>
            <span className="font-serif text-lg font-bold dark:text-white">Lumière</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-1 w-full">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full ${
                  location.pathname === item.path 
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-gold-600 dark:text-gold-400' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="flex-1 min-w-0">{item.label}</span>
              </Link>
            ))}
          </div>
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
            <button 
              onClick={() => {
                // Logout functionality - redirect to home
                navigate('/');
              }}
              className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 text-sm font-medium"
              aria-label="Logout"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="px-2 sm:px-3 py-1 rounded-full bg-gold-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold whitespace-nowrap">
              admin
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};