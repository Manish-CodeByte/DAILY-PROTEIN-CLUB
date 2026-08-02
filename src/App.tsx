import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/food/QuickViewModal';
import { Toast } from './components/UI/Toast';
import { FloatingContactWidget } from './components/UI/FloatingContactWidget';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { BowlBuilderPage } from './pages/BowlBuilderPage';
import { FitnessNutritionPage } from './pages/FitnessNutritionPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { AboutContactPage } from './pages/AboutContactPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="relative min-h-screen flex flex-col bg-[#000000] text-[#F5F5F7] selection:bg-[#0A84FF]/30 selection:text-[#0A84FF]">
          
          {/* Subtle Ambient Food Prep Background Texture Layer */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-cover bg-center filter contrast-125 mix-blend-luminosity"
            style={{ backgroundImage: "url('/website-bg-texture.png')" }}
          />

          <Navbar />
          
          <div className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/builder" element={<BowlBuilderPage />} />
              <Route path="/fitness" element={<FitnessNutritionPage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
              <Route path="/contact" element={<AboutContactPage />} />
            </Routes>
          </div>

          <Footer />

          {/* Drawers, Modals & Floating Quick Contact Widget */}
          <CartDrawer />
          <QuickViewModal />
          <FloatingContactWidget />
          <Toast />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
