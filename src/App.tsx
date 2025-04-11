import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import SalesPage from './components/pages/SalesPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import AdminLogin from './components/AdminPortal/AdminLogin';
import AdminDashboard from './components/AdminPortal/AdminDashboard';
import { BusinessInfo, SocialLinks } from './types/database';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [businessInfoResult, socialLinksResult] = await Promise.all([
          supabase
            .from('business_info')
            .select('*')
            .eq('is_active', true)
            .maybeSingle(),
          supabase
            .from('social_links')
            .select('*')
            .eq('is_active', true)
            .maybeSingle(),
        ]);

        if (businessInfoResult.data) setBusinessInfo(businessInfoResult.data);
        if (socialLinksResult.data) setSocialLinks(socialLinksResult.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-secondary/10">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/admin/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/admin" replace /> : 
                <AdminLogin onLogin={() => setIsAuthenticated(true)} />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? 
                <AdminDashboard /> : 
                <Navigate to="/admin/login" replace />
              } 
            />
          </Routes>
        </main>
        <Footer 
          businessInfo={businessInfo} 
          socialLinks={socialLinks}
          adminLink="/admin/login"
        />
      </div>
    </Router>
  );
}

export default App;