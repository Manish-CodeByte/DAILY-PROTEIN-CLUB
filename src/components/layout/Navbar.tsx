import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
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
          ? 'bg-[#090D16]/90 backdrop-blur-2xl border-b border-[#10B981]/20 py-3 shadow-2xl shadow-black/50'
          : 'bg-[#090D16]/60 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.05 }}
              className="w-10 h-10 rounded-2xl bg-[#10B981] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#10B981]/30 transition-all"
            >
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-[#F9FAFB] group-hover:text-[#10B981] transition-colors uppercase">
                  DAILY PROTEIN CLUB
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">
                | MANIPAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                location.pathname === '/' ? 'text-[#10B981]' : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              HOME
              {location.pathname === '/' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981] rounded-full" />
              )}
            </Link>

            <Link
              to="/menu"
              className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                location.pathname === '/menu' ? 'text-[#10B981]' : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              MENU
              {location.pathname === '/menu' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981] rounded-full" />
              )}
            </Link>

            {/* BOWL BUILDER FEATURE LINK */}
            <Link
              to="/builder"
              className={`relative flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors py-1 ${
                location.pathname === '/builder' ? 'text-[#10B981]' : 'text-[#F9FAFB] hover:text-[#10B981]'
              }`}
            >
              <span>BOWL BUILDER</span>
              <span className="px-1.5 py-0.2 rounded bg-[#10B981] text-black text-[9px] font-extrabold uppercase">
                NEW
              </span>
              {location.pathname === '/builder' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981] rounded-full" />
              )}
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('/menu')}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors py-2"
              >
                <span>CATEGORIES</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
              </button>

              <AnimatePresence>
                {isCategoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-56 bg-[#0F172A]/90 border border-[#10B981]/30 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#9CA3AF] hover:text-[#10B981] hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#9CA3AF]/70">{cat.itemCount}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/fitness"
              className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                location.pathname === '/fitness' ? 'text-[#10B981]' : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              NUTRITION
              {location.pathname === '/fitness' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981] rounded-full" />
              )}
            </Link>

            <Link
              to="/contact"
              className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                location.pathname === '/contact' && !location.hash ? 'text-[#10B981]' : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              ABOUT
              {location.pathname === '/contact' && !location.hash && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10B981] rounded-full" />
              )}
            </Link>

            <Link
              to="/contact"
              className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Actions: ORDER NOW Button & Shopping Cart */}
          <div className="flex items-center gap-3">
            {/* ORDER NOW CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-[#10B981]/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> ORDER NOW
            </motion.button>

            {/* Shopping Cart Icon Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#0F172A]/80 border border-[#10B981]/30 hover:border-[#10B981] text-[#F9FAFB] transition-colors cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#10B981]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#10B981] text-black text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#0F172A]/80 border border-white/10 text-[#9CA3AF] hover:text-[#F9FAFB]"
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
            className="lg:hidden bg-[#090D16]/98 border-b border-[#10B981]/20 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F9FAFB] border-b border-white/10"
              >
                HOME
              </Link>
              <Link
                to="/builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#10B981] flex items-center justify-between border-b border-white/10"
              >
                <span>PRECISION BOWL BUILDER</span>
                <span className="px-1.5 py-0.5 rounded bg-[#10B981] text-black text-[9px] font-black">NEW</span>
              </Link>
              <Link
                to="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F9FAFB] border-b border-white/10"
              >
                MENU
              </Link>
              <Link
                to="/fitness"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F9FAFB] border-b border-white/10"
              >
                NUTRITION & GOALS
              </Link>
              <Link
                to="/calculators"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F9FAFB] border-b border-white/10"
              >
                CALCULATORS
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-wider text-[#F9FAFB] border-b border-white/10"
              >
                ABOUT & CONTACT
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#10B981] text-black font-black text-xs uppercase tracking-wider mt-2 shadow-lg shadow-[#10B981]/25"
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
