import React, { useState, useRef } from 'react';
import { ViewType } from '../types';
import { Menu, X, ChevronDown, Moon, Sun, Monitor, Palette, ShoppingBag, Newspaper, Home, User, Mail, Briefcase, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  setView: (view: ViewType) => void;
  currentView: ViewType;
  darkMode: boolean;
  toggleDarkMode: () => void;
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView, darkMode, toggleDarkMode, cartItemCount }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [creativeOpen, setCreativeOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  
  // Refs for closing delay
  // Using ReturnType<typeof setTimeout> ensures compatibility with both Browser (number) and Node (NodeJS.Timeout) environments
  const creativeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const workTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navBtnClass = "flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:text-brand-accent font-medium";
  const activeClass = "text-brand-accent bg-gray-100 dark:bg-gray-800";
  const dropdownClass = "absolute top-full left-0 mt-0 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-b-md py-2 z-50 border-x border-b border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2";
  const dropdownItemClass = "block w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm";

  // Handlers for smooth dropdown
  const handleCreativeEnter = () => {
    if (creativeTimeout.current) clearTimeout(creativeTimeout.current);
    setCreativeOpen(true);
    setWorkOpen(false);
  };

  const handleCreativeLeave = () => {
    creativeTimeout.current = setTimeout(() => {
      setCreativeOpen(false);
    }, 300); // 300ms delay
  };

  const handleWorkEnter = () => {
    if (workTimeout.current) clearTimeout(workTimeout.current);
    setWorkOpen(true);
    setCreativeOpen(false);
  };

  const handleWorkLeave = () => {
    workTimeout.current = setTimeout(() => {
      setWorkOpen(false);
    }, 300); // 300ms delay
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewType.HOME)}>
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="font-bold text-xl tracking-tight dark:text-white">Dark Designer</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setView(ViewType.HOME)} 
              className={`${navBtnClass} ${currentView === ViewType.HOME ? activeClass : ''}`}
            >
              <Home size={16} /> Home
            </button>

            {/* Creative Dropdown */}
            <div 
              className="relative group h-full flex items-center" 
              onMouseEnter={handleCreativeEnter} 
              onMouseLeave={handleCreativeLeave}
            >
              <button 
                className={`${navBtnClass} flex items-center ${creativeOpen ? 'text-brand-accent' : ''}`}
                onClick={() => setCreativeOpen(!creativeOpen)}
              >
                <Palette size={16} /> Creative <ChevronDown size={14} className={`ml-1 transition-transform ${creativeOpen ? 'rotate-180' : ''}`} />
              </button>
              {creativeOpen && (
                <div className={dropdownClass}>
                  <button onClick={() => { setView(ViewType.NEWS); setCreativeOpen(false); }} className={dropdownItemClass}>
                    <Newspaper size={16} /> News
                  </button>
                  <button onClick={() => { setView(ViewType.DESIGN_INSPIRATION); setCreativeOpen(false); }} className={dropdownItemClass}>
                    <Palette size={16} /> Design
                  </button>
                  <button onClick={() => { setView(ViewType.ECOMMERCE); setCreativeOpen(false); }} className={dropdownItemClass}>
                    <ShoppingBag size={16} /> E-commerce
                  </button>
                </div>
              )}
            </div>

            {/* Work Dropdown */}
            <div 
              className="relative group h-full flex items-center" 
              onMouseEnter={handleWorkEnter} 
              onMouseLeave={handleWorkLeave}
            >
              <button 
                className={`${navBtnClass} flex items-center ${workOpen ? 'text-brand-accent' : ''}`}
                onClick={() => setWorkOpen(!workOpen)}
              >
                <Briefcase size={16} /> Work <ChevronDown size={14} className={`ml-1 transition-transform ${workOpen ? 'rotate-180' : ''}`} />
              </button>
              {workOpen && (
                <div className={dropdownClass}>
                  <button onClick={() => { setView(ViewType.GRAPHIC_DESIGN); setWorkOpen(false); }} className={dropdownItemClass}>
                    <Palette size={16} /> Graphic Design
                  </button>
                  <button onClick={() => { setView(ViewType.WEB_DESIGN); setWorkOpen(false); }} className={dropdownItemClass}>
                    <Monitor size={16} /> Web Design
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setView(ViewType.ABOUT)} 
              className={`${navBtnClass} ${currentView === ViewType.ABOUT ? activeClass : ''}`}
            >
              <User size={16} /> About
            </button>
            <button 
              onClick={() => setView(ViewType.CONTACT)} 
              className={`${navBtnClass} ${currentView === ViewType.CONTACT ? activeClass : ''}`}
            >
              <Mail size={16} /> Contact
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
             {/* Cart Button */}
            <button 
              onClick={() => setView(ViewType.CART)} 
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} className="text-slate-600 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-shop-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2">
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white dark:bg-brand-dark border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
          <button onClick={() => { setView(ViewType.HOME); setIsMobileOpen(false); }} className="block w-full text-left py-2 font-medium">Home</button>
          <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Creative</span>
            <button onClick={() => { setView(ViewType.NEWS); setIsMobileOpen(false); }} className="block w-full text-left py-2 mt-1 text-sm">News</button>
            <button onClick={() => { setView(ViewType.DESIGN_INSPIRATION); setIsMobileOpen(false); }} className="block w-full text-left py-2 text-sm">Design</button>
            <button onClick={() => { setView(ViewType.ECOMMERCE); setIsMobileOpen(false); }} className="block w-full text-left py-2 text-sm">E-commerce</button>
          </div>
          <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Work</span>
            <button onClick={() => { setView(ViewType.GRAPHIC_DESIGN); setIsMobileOpen(false); }} className="block w-full text-left py-2 mt-1 text-sm">Graphic Design</button>
            <button onClick={() => { setView(ViewType.WEB_DESIGN); setIsMobileOpen(false); }} className="block w-full text-left py-2 text-sm">Web Design</button>
          </div>
          <button onClick={() => { setView(ViewType.CART); setIsMobileOpen(false); }} className="block w-full text-left py-2 font-medium">My Cart ({cartItemCount})</button>
          <button onClick={() => { setView(ViewType.ABOUT); setIsMobileOpen(false); }} className="block w-full text-left py-2 font-medium">About</button>
          <button onClick={() => { setView(ViewType.CONTACT); setIsMobileOpen(false); }} className="block w-full text-left py-2 font-medium">Contact</button>
        </div>
      )}
    </nav>
  );
};