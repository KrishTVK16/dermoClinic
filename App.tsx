import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ClientLayout, AdminLayout } from './components/Layout';
import { HomePage, HomeVariant, HomePageV2 } from './pages/Home';
import { ServicesPage, AboutPage, ContactPage, BlogPage, BlogDetailPage, PricingPage, PrivacyPage, TermsPage } from './pages/InnerPages';
import { Dashboard, PatientsList, OrdersList, PostsList, ServicesList, AdminSettings } from './pages/Admin';
import { Theme } from './types';
import DependencyChecker from './src/DependencyChecker';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return (localStorage.getItem('theme') as Theme) || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <DependencyChecker>
      <Router>
        <ScrollToTop />
        <Routes>
        {/* Client Routes */}
        <Route path="/" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <HomePage />
          </ClientLayout>
        } />
        <Route path="/shop" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <HomeVariant />
          </ClientLayout>
        } />
        <Route path="/home-v2" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <HomePageV2 />
          </ClientLayout>
        } />
        <Route path="/services" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <ServicesPage />
          </ClientLayout>
        } />
        <Route path="/about" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <AboutPage />
          </ClientLayout>
        } />
        <Route path="/contact" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <ContactPage />
          </ClientLayout>
        } />
        <Route path="/blog" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <BlogPage />
          </ClientLayout>
        } />
        <Route path="/blog/:id" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <BlogDetailPage />
          </ClientLayout>
        } />
        <Route path="/pricing" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <PricingPage />
          </ClientLayout>
        } />
        <Route path="/privacy" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <PrivacyPage />
          </ClientLayout>
        } />
        <Route path="/terms" element={
          <ClientLayout theme={theme} toggleTheme={toggleTheme}>
            <TermsPage />
          </ClientLayout>
        } />
        <Route path="/services/:id" element={
           <ClientLayout theme={theme} toggleTheme={toggleTheme}>
              {/* Reuse Service Page for simplicity, in real app this would be detailed */}
             <ServicesPage /> 
          </ClientLayout>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path="/admin/users" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <PatientsList />
          </AdminLayout>
        } />
        <Route path="/admin/orders" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <OrdersList />
          </AdminLayout>
        } />
        <Route path="/admin/posts" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <PostsList />
          </AdminLayout>
        } />
        <Route path="/admin/services" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <ServicesList />
          </AdminLayout>
        } />
        <Route path="/admin/settings" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <AdminSettings />
          </AdminLayout>
        } />
        
        {/* Fallbacks */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </DependencyChecker>
  );
};

export default App;