import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Clock, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../UI/SocialIcons';
import { RESTAURANT_INFO } from '../../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070707] border-t border-gray-800/80 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800/60">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#39D353] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#39D353]/30">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">DAILY PROTEIN </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#FF7A00] text-black uppercase">CLUB</span>
                <span className="text-[10px] font-semibold text-gray-500 block tracking-widest uppercase">MANIPAL • FIT KITCHEN</span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Daily Protein Club is Manipal’s first dedicated macro-counted fitness kitchen. High-protein wraps, grilled chicken breast, charcoal kebabs, and 100% whey isolate shakes crafted for students, doctors & athletes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.swiggyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#FC8019] text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                Swiggy Order <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={RESTAURANT_INFO.zomatoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#CB202D] text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                Zomato Order <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-[#39D353] transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-[#39D353] transition-colors">Full High Protein Menu</Link></li>
              <li><Link to="/fitness" className="hover:text-[#39D353] transition-colors">Fitness Goal Meal Plans</Link></li>
              <li><Link to="/fitness#nutrition" className="hover:text-[#39D353] transition-colors">Nutrition & Macro Guide</Link></li>
              <li><Link to="/calculators" className="hover:text-[#39D353] transition-colors">BMI & Macro Calculators</Link></li>
              <li><Link to="/contact" className="hover:text-[#39D353] transition-colors">Contact & Location</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Popular Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/menu?cat=Wraps" className="hover:text-[#39D353] transition-colors">Protein Wraps</Link></li>
              <li><Link to="/menu?cat=Chicken Meals" className="hover:text-[#39D353] transition-colors">Grilled Chicken Breast</Link></li>
              <li><Link to="/menu?cat=Rice Bowls" className="hover:text-[#39D353] transition-colors">Brown Rice Bowls</Link></li>
              <li><Link to="/menu?cat=Kebabs" className="hover:text-[#39D353] transition-colors">Charcoal Kebabs</Link></li>
              <li><Link to="/menu?cat=Protein Drinks" className="hover:text-[#39D353] transition-colors">Whey Isolate Shakes</Link></li>
              <li><Link to="/menu?cat=Salads" className="hover:text-[#39D353] transition-colors">Superfood Salads</Link></li>
            </ul>
          </div>

          {/* Manipal Location & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Manipal Kitchen</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#39D353] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  177/11, Herga Village, Vaibhav Business Center, Eshwar Nagar, Manipal, Karnataka 576104
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#39D353] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white font-semibold">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span className="text-gray-300">10:00 AM – 12:00 AM (Daily)</span>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl glass-panel hover:bg-[#25D366] hover:text-black text-gray-300 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl glass-panel hover:bg-pink-600 hover:text-white text-gray-300 transition-colors"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl glass-panel hover:bg-blue-600 hover:text-white text-gray-300 transition-colors"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl glass-panel hover:bg-blue-400 hover:text-black text-gray-300 transition-colors"
                  title="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Daily Protein Club | Manipal. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldCheck className="w-4 h-4 text-[#39D353]" />
            <span>Macro Counted & FSSAI Certified Kitchen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
