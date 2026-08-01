import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/categories';

export const Navbar: React.FC = () => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategorySelect = (catName: string) => {
    setIsCategoryDropdownOpen(false);
    navigate(`/menu?cat=${encodeURIComponent(catName)}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl'
          : 'bg-[#000000]/60 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#0A84FF] flex items-center justify-center text-white font-extrabold shadow-md group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-[#F5F5F7] group-hover:text-[#0A84FF] transition-colors uppercase">
                  DAILY PROTEIN CLUB
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#0A84FF] uppercase tracking-widest">
                | MANIPAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                location.pathname === '/' ? 'text-[#0A84FF]' : 'text-[#A1A1A6] hover:text-[#F5F5F7]'
              }`}
            >
              HOME
            </Link>

            <Link
              to="/menu"
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                location.pathname === '/menu' ? 'text-[#0A84FF]' : 'text-[#A1A1A6] hover:text-[#F5F5F7]'
              }`}
            >
              MENU
            </Link>

            {/* BOWL BUILDER FEATURE LINK */}
            <Link
              to="/builder"
              className={`relative flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors ${
                location.pathname === '/builder' ? 'text-[#0A84FF]' : 'text-[#F5F5F7] hover:text-[#0A84FF]'
              }`}
            >
              <span>BOWL BUILDER</span>
              <span className="px-1.5 py-0.2 rounded bg-[#0A84FF] text-white text-[9px] font-extrabold uppercase">
                NEW
              </span>
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('/menu')}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors py-2"
              >
                <span>CATEGORIES</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A1A1A6]" />
              </button>

              <AnimatePresence>
                {isCategoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-52 bg-[#111214] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#A1A1A6] hover:text-[#0A84FF] hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#A1A1A6]/70">{cat.itemCount}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/fitness"
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                location.pathname === '/fitness' ? 'text-[#0A84FF]' : 'text-[#A1A1A6] hover:text-[#F5F5F7]'
              }`}
            >
              NUTRITION
            </Link>

            <Link
              to="/contact"
              className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                location.pathname === '/contact' && !location.hash ? 'text-[#0A84FF]' : 'text-[#A1A1A6] hover:text-[#F5F5F7]'
              }`}
            >
              ABOUT
            </Link>

            <Link
              to="/contact"
              className="text-xs font-bold uppercase tracking-wider text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Actions: ORDER NOW Button & Shopping Cart */}
          <div className="flex items-center gap-3">
            {/* ORDER NOW CTA Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#0A84FF]/20 transition-all hover:scale-102 cursor-pointer"
            >
              ORDER NOW
            </button>

            {/* Shopping Cart Icon Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#111214] border border-white/10 hover:border-[#0A84FF] text-[#F5F5F7] transition-colors cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#0A84FF]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#0A84FF] text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#111214] border border-white/10 text-[#A1A1A6] hover:text-[#F5F5F7]"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#000000]/98 border-b border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F5F5F7] border-b border-white/10"
              >
                HOME
              </Link>
              <Link
                to="/builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#0A84FF] flex items-center justify-between border-b border-white/10"
              >
                <span>PRECISION BOWL BUILDER</span>
                <span className="px-1.5 py-0.5 rounded bg-[#0A84FF] text-white text-[9px] font-black">NEW</span>
              </Link>
              <Link
                to="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F5F5F7] border-b border-white/10"
              >
                MENU
              </Link>
              <Link
                to="/fitness"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F5F5F7] border-b border-white/10"
              >
                NUTRITION & GOALS
              </Link>
              <Link
                to="/calculators"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F5F5F7] border-b border-white/10"
              >
                CALCULATORS
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F5F5F7] border-b border-white/10"
              >
                ABOUT & CONTACT
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#0A84FF] text-white font-extrabold text-xs uppercase tracking-wider mt-2"
              >
                ORDER NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
