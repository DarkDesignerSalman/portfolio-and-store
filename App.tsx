import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ViewType, AppData, NewsItem, Product, PortfolioItem, Message, CartItem } from './types';
import { MOCK_NEWS, MOCK_PRODUCTS, MOCK_PORTFOLIO } from './constants';
import { generateDescription } from './services/geminiService';
import { 
  ArrowRight, Star, Send, Trash2, Edit2, Plus, LayoutDashboard, Database, 
  Loader2, Mail, Briefcase, ShoppingCart, Lock, CreditCard, 
  CheckCircle, PlusCircle, MinusCircle, Palette, Monitor, ShoppingBag, Save, Image as ImageIcon, X, ArrowLeft, User,
  Clock, Calendar, CloudSun, MapPin, Phone
} from 'lucide-react';

/* --- Helper Components --- */

// Custom Brand Icons (Lucide does not include all brand icons)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.742-2.971 2.267v1.665h4.626l-.665 3.667h-3.96v7.98C21.643 21.053 24 16.89 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 4.89 2.357 9.053 6.32 11.691h2.781z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 7h-7v3h7V7zm1.326 9.492c-.624.908-1.747 1.411-2.924 1.411-1.352 0-2.285-.367-2.981-.884-.852-.633-1.284-1.733-1.284-3.268 0-1.928.66-3.136 1.638-3.905.811-.637 1.831-.836 2.627-.836 1.258 0 2.385.498 3.012 1.547.45.753.541 1.782.541 2.454h-5.065c.035 1.436.726 1.914 1.638 1.914.73 0 1.206-.277 1.492-.727h1.306zm-4.735-3.834h3.29c-.063-1.077-.665-1.577-1.546-1.577-.96 0-1.637.593-1.744 1.577zm-9.529 3.034c.905 0 1.514-.268 1.968-.707.545-.529.742-1.343.742-2.155 0-.584-.131-1.111-.355-1.53-.332-.622-.924-1.006-1.564-1.159.58-.224 1.053-.66 1.304-1.268.225-.544.298-1.062.298-1.579 0-1.731-1.293-2.812-3.411-2.812H2v11.21h7.062zM5.337 4.844h2.528c1.17 0 1.733.488 1.733 1.473 0 1.043-.727 1.646-1.871 1.646H5.337V4.844zm0 4.364h2.895c1.229 0 1.962.622 1.962 1.741 0 1.158-.87 1.876-2.072 1.876H5.337V9.208z"/></svg>
);
const DribbbleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.57-2.057 4.213-5.22 4.392-6.87zM12 22.02c-2.96 0-5.617-1.282-7.425-3.32.22-.163 3.056-2.185 8.653-1.01-.845 2.684-2.007 5.253-2.007 5.253-2.05-.125 4.33.923 2.007zm-9.043-3.66c-1.233-1.8-1.977-3.98-1.977-6.335 0-.58.053-1.15.15-1.7 1.054.343 4.14 1.275 7.498.05-.623-1.464-1.278-2.85-1.89-4.13-4.22 1.252-5.918 3.593-6.19 3.996.368-2.673 2.658-4.755 5.408-5.35.485 1.096 1.008 2.27 1.503 3.52 3.61-1.39 5.09-3.4 5.244-3.62-1.927-1.734-4.475-2.793-7.272-2.793-5.462 0-9.932 4.18-10.453 9.48.33-.21 1.932-1.202 5.66-2.697zM20.88 4.757c-1.76-1.704-4.11-2.652-6.58-2.652-.224 0-.447.008-.667.025.26.47 2.126 3.013 5.922 4.432.223-.62.47-1.23.725-1.805zM17.02 12c-2.83 0-5.545.473-8.085 1.347.16 1.13.51 2.2.984 3.19 4.3-3.335 5.3-7.662 5.36-7.96.06.338 1.623 3.037 1.74 3.423zm2.59-1.996c-3.153-1.178-4.823-3.79-4.887-3.904 2.288 1.48 5.152 2.32 8.164 2.32.193 0 .385-.005.576-.015-.175-1.458-1.63-4.524-3.853-5.4z"/></svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const SocialLinks = () => (
  <div className="flex gap-4 mt-6">
    <a href="https://www.facebook.com/salman.islam.855944/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors hover:scale-110 transform duration-200" aria-label="Facebook">
      <FacebookIcon className="w-6 h-6" />
    </a>
    <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors hover:scale-110 transform duration-200" aria-label="LinkedIn">
      <LinkedinIcon className="w-6 h-6" />
    </a>
    <a href="https://www.behance.net/salmanislam2019" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1769FF] transition-colors hover:scale-110 transform duration-200" aria-label="Behance">
      <BehanceIcon className="w-6 h-6" />
    </a>
    <a href="https://dribbble.com/Salman99" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#EA4C89] transition-colors hover:scale-110 transform duration-200" aria-label="Dribbble">
      <DribbbleIcon className="w-6 h-6" />
    </a>
    <a href="https://github.com/DarkDesignerSalman" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200" aria-label="GitHub">
      <GithubIcon className="w-6 h-6" />
    </a>
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 border-b-2 border-brand-accent/20 pb-4">
    <h2 className="text-3xl font-bold font-serif text-brand-dark dark:text-white">{title}</h2>
    {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>}
  </div>
);

const DashboardWidgets: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time for Dhaka (UTC+6)
  const dhakaTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Dhaka",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  const dateStr = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100 dark:border-gray-800">
        <SectionHeader title="Live from Dhaka" subtitle="Real-time updates from the heart of Bangladesh" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Clock */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center animate-in zoom-in duration-500 hover:border-brand-accent/50 transition-colors">
                <Clock size={48} className="text-brand-accent mb-4 animate-pulse" />
                <h3 className="text-3xl font-bold font-mono text-gray-800 dark:text-white mb-1">{dhakaTime}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Dhaka Standard Time</p>
            </div>

            {/* Calendar */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center animate-in zoom-in duration-500 delay-100 hover:border-news-red/50 transition-colors">
                 <Calendar size={48} className="text-news-red mb-4" />
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-1">{dateStr}</h3>
                 <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Today's Date</p>
            </div>

            {/* Weather */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center animate-in zoom-in duration-500 delay-200 hover:border-shop-orange/50 transition-colors group">
                <CloudSun size={48} className="text-shop-orange mb-4 group-hover:scale-110 transition-transform" />
                <div className="flex items-start">
                    <span className="text-4xl font-bold text-gray-800 dark:text-white">32</span>
                    <span className="text-lg text-gray-500 font-bold mt-1">°C</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">Partly Cloudy</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin size={10}/> Dhaka, BD</p>
            </div>

            {/* Map */}
             <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-48 overflow-hidden animate-in zoom-in duration-500 delay-300 relative group cursor-pointer">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.27923710646989!3d23.780887456212758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1709200000000!5m2!1sen!2sbd" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full"
                    title="Dhaka Map"
                ></iframe>
                <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-bold shadow-lg pointer-events-none backdrop-blur-sm flex items-center gap-1">
                    <MapPin size={12} className="text-red-500"/> Dhaka
                </div>
            </div>
        </div>
    </div>
  )
}

const Footer: React.FC<{ setView: (v: ViewType) => void }> = ({ setView }) => (
  <footer className="bg-brand-dark text-white pt-12 pb-6 mt-16 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white font-bold">D</div>
          <span className="font-bold text-xl">Dark Designer</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Crafting digital experiences with passion and precision. Specialized in modern graphic design and scalable web architectures.
        </p>
        <SocialLinks />
      </div>
      <div>
        <h4 className="font-bold mb-4 text-brand-accent">Quick Links</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><button onClick={() => setView(ViewType.HOME)} className="hover:text-white transition-colors">Home</button></li>
          <li><button onClick={() => setView(ViewType.NEWS)} className="hover:text-white transition-colors">Creative News</button></li>
          <li><button onClick={() => setView(ViewType.GRAPHIC_DESIGN)} className="hover:text-white transition-colors">Graphic Portfolio</button></li>
          <li><button onClick={() => setView(ViewType.CONTACT)} className="hover:text-white transition-colors">Contact Me</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 text-brand-accent">Contact</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>Dhaka, Bangladesh</li>
          <li>+880 1681 412690</li>
          <li>salmanislam501@gmail.com</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 text-brand-accent">Admin</h4>
        <button onClick={() => setView(ViewType.ADMIN)} className="text-sm text-gray-400 hover:text-white underline flex items-center gap-2">
          <Lock size={14} /> Admin Login
        </button>
      </div>
    </div>
    <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
      &copy; {new Date().getFullYear()} Dark Designer. All rights reserved.
    </div>
  </footer>
);

/* --- Views --- */

const HomeView: React.FC<{ data: AppData; setView: (v: ViewType) => void }> = ({ data, setView }) => (
  <div className="animate-in fade-in duration-500">
    {/* Hero */}
    <div className="relative h-[70vh] bg-gradient-to-r from-brand-dark to-slate-800 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1600/900?grayscale')] opacity-20 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/90"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="inline-block px-4 py-1 border border-brand-accent/50 rounded-full text-brand-accent text-sm font-semibold mb-4 tracking-wider uppercase bg-brand-accent/10 backdrop-blur-sm">
          Welcome to my Creative Space
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white font-serif mb-6 leading-tight drop-shadow-lg">
          Designing the Future of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-400">Digital Experience</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
           Professional Graphic Design (7 Years) & Full-Stack Web Development (3 Years). 
           Currently shaping digital solutions at <span className="text-brand-accent font-bold">Dynamic Megasoft Limited</span>.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setView(ViewType.GRAPHIC_DESIGN)} className="px-8 py-3 bg-brand-accent hover:bg-indigo-600 text-white rounded-full font-bold transition-transform hover:scale-105 shadow-lg shadow-brand-accent/25">
            View My Work
          </button>
          <button onClick={() => setView(ViewType.CONTACT)} className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-brand-dark rounded-full font-bold transition-colors">
            Contact Me
          </button>
        </div>
      </div>
    </div>

    {/* Services / Skills */}
    <div className="bg-white dark:bg-brand-dark py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold dark:text-white">My Expertise</h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
                { icon: <Palette size={32} />, title: 'Graphic Design', desc: 'Logo, Branding, Print' },
                { icon: <Monitor size={32} />, title: 'Web Development', desc: 'React, Node, TypeScript' },
                { icon: <ShoppingBag size={32} />, title: 'E-commerce', desc: 'Shopify, Custom Solutions' },
                { icon: <LayoutDashboard size={32} />, title: 'UI/UX Design', desc: 'Figma, Prototyping' },
            ].map((service, idx) => (
                <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-700 shadow-sm hover:shadow-xl transition-all text-center group cursor-default">
                    <div className="w-16 h-16 mx-auto bg-brand-accent/10 group-hover:bg-brand-accent text-brand-accent group-hover:text-white rounded-full flex items-center justify-center mb-4 transition-colors">
                        {service.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 dark:text-white">{service.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>

    {/* Featured Activities */}
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-gray-100 dark:border-gray-800">
      <SectionHeader title="Explore My World" subtitle="Latest updates, products, and portfolio highlights" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: News */}
        <div onClick={() => setView(ViewType.NEWS)} className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-news-red relative flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
            <LayoutDashboard size={64} className="relative z-10 opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-xl relative z-10">Latest News</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">Stay updated with the latest in tech and design from Bangladesh and beyond.</p>
            <div className="mt-4 flex items-center text-news-red font-semibold">Read More <ArrowRight size={16} className="ml-1" /></div>
          </div>
        </div>

        {/* Card 2: E-commerce */}
        <div onClick={() => setView(ViewType.ECOMMERCE)} className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-shop-orange relative flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
            <ShoppingBag size={64} className="relative z-10 opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-xl relative z-10">E-Commerce Shop</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">Browse exclusive digital products and design assets in our shop.</p>
            <div className="mt-4 flex items-center text-shop-orange font-semibold">Shop Now <ArrowRight size={16} className="ml-1" /></div>
          </div>
        </div>

        {/* Card 3: Portfolio */}
        <div onClick={() => setView(ViewType.GRAPHIC_DESIGN)} className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-brand-accent relative flex items-center justify-center text-white overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
            <Database size={64} className="relative z-10 opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-xl relative z-10">My Portfolio</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">Explore 7 years of graphic design and 3 years of web development excellence.</p>
            <div className="mt-4 flex items-center text-brand-accent font-semibold">View Portfolio <ArrowRight size={16} className="ml-1" /></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Live Dashboard Section */}
    <DashboardWidgets />
  </div>
);

const NewsView: React.FC<{ items: NewsItem[]; onViewDetail: (id: string) => void }> = ({ items, onViewDetail }) => (
  <div className="max-w-7xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3">
        <SectionHeader title="Today's Headlines" subtitle="Latest updates from Bangladesh and the World" />
        
        {/* Hero News */}
        {items.length > 0 && (
          <div className="mb-10 group cursor-pointer" onClick={() => onViewDetail(items[0].id)}>
            <div className="overflow-hidden rounded-lg mb-4">
              <img src={items[0].image} alt={items[0].title} className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="text-news-red font-bold uppercase text-sm tracking-wider">{items[0].category}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 hover:text-news-red transition-colors dark:text-white">
              {items[0].title}
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-serif">
              {items[0].summary}
            </p>
            <p className="mt-2 text-sm text-gray-400">{items[0].date}</p>
          </div>
        )}

        {/* Grid News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          {items.slice(1).map((item) => (
            <div key={item.id} className="flex flex-col gap-3 group cursor-pointer" onClick={() => onViewDetail(item.id)}>
              <div className="overflow-hidden rounded-md">
                 <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div>
                <span className="text-news-red text-xs font-bold uppercase">{item.category}</span>
                <h3 className="text-xl font-serif font-bold mt-1 group-hover:text-news-red transition-colors dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-3">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 border-l border-gray-200 dark:border-gray-700 pl-8 hidden lg:block">
        <div className="sticky top-24">
          <h3 className="font-bold text-xl mb-4 text-news-red border-b-2 border-news-red pb-2 inline-block">Top News</h3>
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li key={`side-${idx}`} className="group cursor-pointer" onClick={() => onViewDetail(item.id)}>
                <h4 className="font-serif text-md font-semibold hover:text-news-red transition-colors dark:text-gray-200">{item.title}</h4>
                <span className="text-xs text-gray-400">{item.date}</span>
              </li>
            ))}
             <li className="mt-8">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm font-bold mb-2">Advertisement</p>
                    <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
                        Ad Space
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const NewsDetailView: React.FC<{ item: NewsItem; onBack: () => void }> = ({ item, onBack }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-accent transition-colors mb-6">
      <ArrowLeft size={20} className="mr-2" /> Back to News
    </button>
    
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-[400px] w-full">
         <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
         <div className="absolute top-4 left-4 bg-news-red text-white text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {item.category}
         </div>
      </div>
      
      <div className="p-8 md:p-12">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-4">
          <span>{item.date}</span>
          <span className="flex items-center gap-1"><User size={14}/> Editorial Team</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {item.title}
        </h1>
        
        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300">
          <p className="lead text-xl font-serif mb-6 border-l-4 border-brand-accent pl-4 italic">
            {item.summary}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">Impact on the Industry</h3>
          <p>
             Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
             totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const EcommerceView: React.FC<{ products: Product[]; onAddToCart: (p: Product) => void; onViewDetail: (id: string) => void }> = ({ products, onAddToCart, onViewDetail }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Electronics', 'Lifestyle', 'Accessories', 'Software'];
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 dark:bg-brand-dark min-h-screen">
      <SectionHeader title="Dark Store" subtitle="Exclusive digital and physical merchandise" />
      
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
         {categories.map(cat => (
             <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap 
                  ${activeCategory === cat 
                    ? 'bg-shop-orange text-white border-shop-orange' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-shop-orange hover:text-shop-orange dark:text-gray-300'
                  }`}
             >
                 {cat}
             </button>
         ))}
      </div>
  
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => {
             const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
             return (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="relative cursor-pointer" onClick={() => onViewDetail(product.id)}>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-shop-orange text-white text-xs font-bold px-2 py-1 rounded">-{discount}%</div>
                  )}
                  {product.category && (
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.category}
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 
                    className="font-medium text-sm text-gray-800 dark:text-white line-clamp-2 h-10 mb-2 group-hover:text-shop-orange transition-colors cursor-pointer"
                    onClick={() => onViewDetail(product.id)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2 mt-auto">
                      <span className="text-shop-orange text-lg font-bold">৳{product.price}</span>
                      {product.originalPrice && <span className="text-gray-400 text-xs line-through">৳{product.originalPrice}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mb-3">
                     {[...Array(5)].map((_, i) => (
                         <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                     ))}
                     <span className="text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-shop-orange hover:bg-orange-600 text-white font-medium py-2 rounded text-sm transition-colors flex items-center justify-center gap-1"
                  >
                      <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ProductDetailView: React.FC<{ product: Product; onAddToCart: (p: Product) => void; onBack: () => void }> = ({ product, onAddToCart, onBack }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-shop-orange transition-colors mb-8">
        <ArrowLeft size={20} className="mr-2" /> Back to Shop
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[400px] md:h-[600px] relative bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-8">
            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
            {discount > 0 && (
                <div className="absolute top-6 left-6 bg-shop-orange text-white font-bold px-4 py-2 rounded-lg shadow-lg">
                  SAVE {discount}%
                </div>
            )}
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center">
             <span className="text-shop-orange font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
             
             <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                </div>
                <span className="text-gray-500 text-sm">{product.reviews} Customer Reviews</span>
             </div>

             <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">৳{product.price}</span>
                {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through mb-1">৳{product.originalPrice}</span>
                )}
             </div>

             <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 mb-8">
                <p>{product.description || "No description available for this product."}</p>
             </div>

             <div className="flex gap-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-shop-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-lg transform hover:-translate-y-1"
                >
                  <ShoppingBag size={24} /> Add to Cart
                </button>
                <button className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 text-gray-500 dark:text-gray-300 transition-colors">
                   <Star size={24} />
                </button>
             </div>
             
             <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> In Stock</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Fast Delivery</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Genuine Product</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Secure Payment</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartView: React.FC<{ cart: CartItem[]; updateQuantity: (id: string, delta: number) => void; removeFromCart: (id: string) => void; setView: (v: ViewType) => void }> = ({ cart, updateQuantity, removeFromCart, setView }) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
            <SectionHeader title="Your Shopping Cart" />
            
            {cart.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg mb-6">Your cart is currently empty.</p>
                    <button onClick={() => setView(ViewType.ECOMMERCE)} className="px-6 py-2 bg-brand-accent text-white rounded-full hover:bg-indigo-600 transition-colors">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex gap-4 items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-bold dark:text-white">{item.name}</h3>
                                    <p className="text-shop-orange font-semibold">৳{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded px-2">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-red-500"><MinusCircle size={16}/></button>
                                    <span className="w-6 text-center text-sm font-bold dark:text-white">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-green-500"><PlusCircle size={16}/></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 ml-2">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-fit">
                        <h3 className="font-bold text-lg mb-4 border-b pb-2 dark:text-white">Order Summary</h3>
                        <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-300">
                            <span>Subtotal</span>
                            <span>৳{total}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-300">
                            <span>Shipping</span>
                            <span>৳150</span>
                        </div>
                        <div className="flex justify-between mb-6 font-bold text-xl border-t pt-2 dark:text-white">
                            <span>Total</span>
                            <span>৳{total + 150}</span>
                        </div>
                        <button onClick={() => setView(ViewType.CHECKOUT)} className="w-full bg-shop-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                            Proceed to Checkout <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const CheckoutView: React.FC<{ cart: CartItem[]; clearCart: () => void; setView: (v: ViewType) => void }> = ({ cart, clearCart, setView }) => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 150;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        // Simulate payment gateway
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            setTimeout(() => {
                clearCart();
                setView(ViewType.HOME);
            }, 3000);
        }, 2000);
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-in zoom-in">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-2 dark:text-white">Payment Successful!</h2>
                <p className="text-gray-500 mb-6">Thank you for your order. Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
             <SectionHeader title="Checkout" subtitle="Secure Payment Gateway" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                     <h3 className="font-bold mb-4 dark:text-white flex items-center gap-2"><CreditCard size={20}/> Payment Details</h3>
                     <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
                            <input required type="text" className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Card Number</label>
                            <input required type="text" className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Expiry</label>
                                <input required type="text" className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="MM/YY" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">CVC</label>
                                <input required type="text" className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="123" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button disabled={processing} type="submit" className="w-full bg-brand-accent hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                                {processing ? <Loader2 className="animate-spin"/> : `Pay ৳${total}`}
                            </button>
                        </div>
                     </form>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 h-fit">
                     <h3 className="font-bold mb-4 dark:text-white">Order Summary</h3>
                     <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between text-sm dark:text-gray-300 border-b dark:border-gray-700 pb-2">
                                <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                                <span>৳{item.price * item.quantity}</span>
                            </li>
                        ))}
                     </ul>
                     <div className="flex justify-between font-bold text-lg border-t pt-4 dark:text-white">
                         <span>Total Amount</span>
                         <span>৳{total}</span>
                     </div>
                 </div>
             </div>
        </div>
    );
};

const PortfolioView: React.FC<{ items: PortfolioItem[], type: 'graphic' | 'web' }> = ({ items, type }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filtered = type === 'graphic' 
    ? items.filter(i => ['logo', 'poster', 'banner', 'thumbnail'].includes(i.category))
    : items.filter(i => ['website', 'uiux'].includes(i.category));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader 
        title={type === 'graphic' ? "Graphic Design Portfolio" : "Web Design Projects"} 
        subtitle={type === 'graphic' ? "Logos, Posters, Banners & More" : "Responsive Websites & Modern Web Applications"}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(item => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img src={item.image} alt={item.title} className="object-cover w-full h-64 transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-full mb-2 w-max uppercase tracking-wide">{item.category}</span>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                <p className="text-gray-300 text-sm mt-2">Click to view details</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
                <X size={40} />
            </button>
            <div className="max-w-5xl w-full flex flex-col items-center">
                <div className="relative w-full h-[70vh] flex items-center justify-center mb-6">
                    <img 
                        src={selectedItem.image} 
                        alt={selectedItem.title} 
                        className="max-w-full max-h-full object-contain rounded-md shadow-2xl" 
                    />
                </div>
                <div className="text-center max-w-2xl animate-in slide-in-from-bottom-4">
                    <h2 className="text-3xl font-bold text-white mb-2 font-serif">{selectedItem.title}</h2>
                    <span className="inline-block px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wide">{selectedItem.category}</span>
                    <p className="text-gray-300 text-lg leading-relaxed">{selectedItem.description}</p>
                </div>
            </div>
        </div>
      )}
      
      {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
              <p>More projects coming soon...</p>
          </div>
      )}
    </div>
  );
};

const AboutView: React.FC = () => {
    const GRAPHIC_SKILLS = [
        "Adobe Photoshop", "Adobe Illustrator", "Figma", 
        "Logo Design", "Flyer Design", "Poster Design", 
        "Banner Design", "Facebook Post Design", "YouTube Thumbnail Design"
    ];

    const WEB_SKILLS = [
        "HTML5", "CSS3 / Sass", "Bootstrap", "Tailwind CSS",
        "JavaScript", "TypeScript", "React.js", "Next.js",
        "AngularJS", "Git / GitHub", "SQL"
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80" alt="Creative Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/80 to-purple-600/80 mix-blend-multiply"></div>
                </div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6 flex justify-between items-end">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 overflow-hidden shadow-lg">
                            <img src="https://picsum.photos/300/300?random=20" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="mb-2">
                            <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Available for Hire</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Salman Islam</h1>
                    <p className="text-brand-accent font-medium text-lg mb-6">Software Developer at Dynamic Megasoft Limited</p>

                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p className="mb-4">
                            I am a professional graphic designer and web developer with a passion for creating creative and colorful digital experiences.
                            With <strong className="text-brand-accent">7 years</strong> of experience in Graphic Design and <strong className="text-brand-accent">3 years</strong> in Web Design,
                            I bridge the gap between aesthetics and functionality.
                        </p>
                        <p className="mb-6">
                            Currently working at <strong>Dynamic Megasoft Limited</strong> since 2022, I specialize in building responsive,
                            user-friendly applications and compelling visual identities.
                        </p>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                <Palette size={20} className="text-brand-accent" /> Graphic Design Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {GRAPHIC_SKILLS.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-brand-accent hover:text-white transition-colors cursor-default border border-transparent hover:border-brand-accent/50">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                <Monitor size={20} className="text-brand-accent" /> Web Development Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {WEB_SKILLS.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-brand-accent hover:text-white transition-colors cursor-default border border-transparent hover:border-brand-accent/50">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <div>
                                <h4 className="font-bold text-lg mb-2">Experience</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Software Developer @ Dynamic Megasoft (2022-Present)</li>
                                    <li>Freelance Senior Graphic Designer (2016-Present)</li>
                                    <li>Frontend Developer Intern (2021)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Education</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>
                                        <strong>B.Sc in Computer Science & Engineering</strong><br />
                                        <span className="text-sm">IUBAT - International University of Business Agriculture and Technology</span>
                                    </li>
                                    <li>
                                        <strong>Diploma in Graphic Arts</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ContactView: React.FC<{ onSendMessage: (m: Omit<Message, 'id' | 'date'>) => void }> = ({ onSendMessage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', content: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', content: '' });
    // Reset submitted message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="animate-in slide-in-from-left-6">
          <SectionHeader title="Get in Touch" subtitle="Let's build something amazing together" />
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Have a project in mind or just want to say hi? Feel free to send me a message. 
            I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                    <Mail />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Email Me</p>
                    <p className="font-bold text-lg">salmanislam501@gmail.com</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-300">
                    <Phone />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Call Me</p>
                    <p className="font-bold text-lg">+880 1681 412690</p>
                </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-lg dark:text-white mb-2">Follow Me</h4>
            <SocialLinks />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl animate-in slide-in-from-right-6 border border-gray-100 dark:border-gray-700">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    placeholder="Project Inquiry"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                    placeholder="Tell me about your project..."
                ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-brand-accent hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                    <Send size={18} /> Send Message
                </button>
            </form>
          ) : (
             <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-in zoom-in">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                     <CheckCircle size={32} />
                 </div>
                 <h3 className="text-2xl font-bold dark:text-white mb-2">Message Successfully Sent!</h3>
                 <p className="text-gray-500 dark:text-gray-300 max-w-sm">
                     We will check your message early and give you feedback. Thank you for contacting me.
                 </p>
                 <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-accent font-medium hover:underline">
                     Send another message
                 </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminView: React.FC<{ 
  data: AppData; 
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  onLogout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  onBack: () => void;
}> = ({ data, setData, onLogout, isAuthenticated, setIsAuthenticated, onBack }) => {
  const [activeTab, setActiveTab] = useState<'news' | 'products' | 'messages' | 'portfolio'>('messages');
  const [newItem, setNewItem] = useState({ title: '', desc: '', category: '', price: '', originalPrice: '', image: '' });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Clear form when switching tabs
  useEffect(() => {
      setNewItem({ title: '', desc: '', category: '', price: '', originalPrice: '', image: '' });
      setEditId(null);
  }, [activeTab]);

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-dark px-4">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700">
                  <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">D</div>
                      <h2 className="text-2xl font-bold dark:text-white">Admin Login</h2>
                  </div>
                  <form onSubmit={(e) => {
                      e.preventDefault();
                      if (password === 'admin123') setIsAuthenticated(true);
                      else setLoginError(true);
                  }}>
                      <div className="mb-4">
                          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Password</label>
                          <input 
                            type="password" 
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-brand-accent"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                            placeholder="Enter admin password"
                          />
                          {loginError && <p className="text-red-500 text-sm mt-1">Incorrect password</p>}
                      </div>
                      <button type="submit" className="w-full bg-brand-accent hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition-colors mb-4">
                          Login to Dashboard
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={onBack}
                        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-medium py-3 rounded-lg transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                      >
                         <ArrowLeft size={16} /> Back to Home
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  const handleDelete = (id: string, type: string) => {
    if (type === 'news') setData(prev => ({ ...prev, news: prev.news.filter(n => n.id !== id) }));
    else if (type === 'products') setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
    else if (type === 'portfolio') setData(prev => ({ ...prev, portfolio: prev.portfolio.filter(p => p.id !== id) }));
    else setData(prev => ({ ...prev, messages: prev.messages.filter(m => m.id !== id) }));
  };

  const handleEdit = (item: any) => {
      setEditId(item.id);
      setNewItem({
          title: item.title || item.name,
          desc: item.summary || item.description || '',
          category: item.category || '',
          price: item.price ? item.price.toString() : '',
          originalPrice: item.originalPrice ? item.originalPrice.toString() : '',
          image: item.image || ''
      });
  };

  const handleGenerateDescription = async () => {
    if (!newItem.title) return alert("Please enter a title first");
    setLoading(true);
    const type = activeTab === 'portfolio' ? 'design' : (activeTab === 'news' ? 'news' : 'product');
    const desc = await generateDescription(newItem.title, type as any);
    setNewItem(prev => ({ ...prev, desc }));
    setLoading(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editId || Date.now().toString();
    const image = newItem.image || 'https://picsum.photos/600/400';

    if(activeTab === 'news') {
        const item: NewsItem = { id, title: newItem.title, summary: newItem.desc, date: editId ? 'Updated' : 'Just Now', category: newItem.category || 'Update', image };
        setData(prev => ({ 
            ...prev, 
            news: editId ? prev.news.map(n => n.id === id ? item : n) : [item, ...prev.news] 
        }));
    } else if (activeTab === 'products') {
        const prod: Product = { 
            id, 
            name: newItem.title, 
            price: parseInt(newItem.price) || 0, 
            originalPrice: newItem.originalPrice ? parseInt(newItem.originalPrice) : undefined,
            rating: 5, 
            reviews: 0, 
            image,
            category: newItem.category || 'Electronics',
            description: newItem.desc
        };
        setData(prev => ({ 
            ...prev, 
            products: editId ? prev.products.map(p => p.id === id ? prod : p) : [prod, ...prev.products] 
        }));
    } else if (activeTab === 'portfolio') {
        const pf: PortfolioItem = { id, title: newItem.title, category: (newItem.category as any) || 'logo', image, description: newItem.desc };
        setData(prev => ({ 
            ...prev, 
            portfolio: editId ? prev.portfolio.map(p => p.id === id ? pf : p) : [pf, ...prev.portfolio] 
        }));
    }
    setNewItem({ title: '', desc: '', category: '', price: '', originalPrice: '', image: '' });
    setEditId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Admin Panel</h2>
        <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2">
            <Lock size={16} /> Logout
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 overflow-x-auto">
        {['messages', 'news', 'products', 'portfolio'].map(tab => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)} 
                className={`px-4 py-2 rounded-lg font-medium capitalize ${activeTab === tab ? 'bg-brand-accent text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'}`}
            >
                {tab}
            </button>
        ))}
      </div>

      {activeTab === 'messages' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="w-full text-left table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="p-4 dark:text-gray-300 w-1/4">Name / Email</th>
                        <th className="p-4 dark:text-gray-300 w-1/2">Message</th>
                        <th className="p-4 dark:text-gray-300 w-1/6">Date</th>
                        <th className="p-4 dark:text-gray-300 text-right w-1/12">Action</th>
                    </tr>
                </thead>
                <tbody className="dark:text-gray-300">
                    {data.messages.map(msg => (
                        <tr key={msg.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="p-4 align-top">
                                <div className="font-bold">{msg.name}</div>
                                <div className="text-sm text-gray-500">{msg.email}</div>
                            </td>
                            <td className="p-4 align-top">
                                <div className="font-bold mb-1">{msg.subject}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">{msg.content}</div>
                            </td>
                            <td className="p-4 text-sm align-top">{msg.date}</td>
                            <td className="p-4 text-right align-top">
                                <button onClick={() => handleDelete(msg.id, 'messages')} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                    {data.messages.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500">No messages found.</td></tr>}
                </tbody>
            </table>
        </div>
      )}

      {activeTab !== 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow h-fit border dark:border-gray-700 sticky top-24">
                  <h3 className="font-bold text-xl mb-4 dark:text-white capitalize flex items-center gap-2">
                      {editId ? <><Edit2 size={20}/> Edit</> : <><PlusCircle size={20}/> Add New</>} {activeTab}
                  </h3>
                  <form onSubmit={handleAddItem} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title / Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={newItem.title}
                            onChange={e => setNewItem({...newItem, title: e.target.value})}
                          />
                      </div>

                      {/* Image Input */}
                      <div>
                          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Image URL</label>
                          <div className="flex gap-2">
                             <input 
                                type="text" 
                                className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.image}
                                onChange={e => setNewItem({...newItem, image: e.target.value})}
                                placeholder="https://..."
                             />
                             {newItem.image && <div className="w-10 h-10 rounded overflow-hidden border flex-shrink-0"><img src={newItem.image} className="w-full h-full object-cover"/></div>}
                          </div>
                      </div>

                      {/* Price for products */}
                      {activeTab === 'products' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Price (৳)</label>
                                <input 
                                    required
                                    type="number" 
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newItem.price}
                                    onChange={e => setNewItem({...newItem, price: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Original Price</label>
                                <input 
                                    type="number" 
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newItem.originalPrice}
                                    onChange={e => setNewItem({...newItem, originalPrice: e.target.value})}
                                    placeholder="For discount"
                                />
                            </div>
                          </div>
                      )}
                      
                      {(activeTab === 'news' || activeTab === 'portfolio' || activeTab === 'products') && (
                          <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
                            {activeTab === 'portfolio' ? (
                                <select 
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newItem.category}
                                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                                >
                                    <option value="">Select Category</option>
                                    <option value="logo">Logo</option>
                                    <option value="poster">Poster</option>
                                    <option value="banner">Banner</option>
                                    <option value="thumbnail">Thumbnail</option>
                                    <option value="website">Website</option>
                                    <option value="uiux">UI/UX</option>
                                </select>
                            ) : activeTab === 'products' ? (
                                <select 
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newItem.category}
                                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Software">Software</option>
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={newItem.category}
                                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                                    placeholder="e.g., Tech, Sports"
                                />
                            )}
                          </div>
                      )}

                      <div>
                          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                          <textarea 
                            className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={newItem.desc}
                            onChange={e => setNewItem({...newItem, desc: e.target.value})}
                          ></textarea>
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={handleGenerateDescription}
                        className="w-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 py-2 rounded flex items-center justify-center gap-2 hover:bg-purple-200 transition-colors"
                        disabled={loading}
                      >
                         {loading ? <Loader2 className="animate-spin" size={16} /> : <><Star size={16} /> AI Generate Description</>}
                      </button>

                      <div className="flex gap-2">
                        {editId && (
                            <button 
                                type="button" 
                                onClick={() => { setEditId(null); setNewItem({ title: '', desc: '', category: '', price: '', originalPrice: '', image: '' }); }}
                                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                        <button type="submit" className={`flex-1 ${editId ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-accent hover:bg-indigo-600'} text-white py-2 rounded transition-colors flex items-center justify-center gap-2`}>
                            {editId ? <><Save size={16}/> Update</> : <><Plus size={16}/> Add Item</>}
                        </button>
                      </div>
                  </form>
              </div>

              <div className="lg:col-span-2 space-y-4">
                  {(activeTab === 'news' ? data.news : activeTab === 'products' ? data.products : data.portfolio).map((item: any) => (
                      <div key={item.id} className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center border ${editId === item.id ? 'border-brand-accent ring-1 ring-brand-accent' : 'dark:border-gray-700'}`}>
                          <div className="flex items-center gap-4">
                              <img src={item.image} alt="thumb" className="w-16 h-16 rounded object-cover bg-gray-100" />
                              <div>
                                  <h4 className="font-bold dark:text-white">{item.title || item.name}</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-sm">{item.summary || item.description || `Price: ৳${item.price}`}</p>
                                  {item.category && <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded dark:text-gray-300">{item.category}</span>}
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={18}/></button>
                              <button onClick={() => handleDelete(item.id, activeTab)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

/* --- Main App Component --- */

export default function App() {
  const [view, setView] = useState<ViewType>(ViewType.HOME);
  const [darkMode, setDarkMode] = useState(true);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [data, setData] = useState<AppData>({
    news: MOCK_NEWS,
    products: MOCK_PRODUCTS,
    portfolio: MOCK_PORTFOLIO,
    messages: []
  });

  // Dark Mode Handling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSendMessage = (msgData: Omit<Message, 'id' | 'date'>) => {
    const newMessage: Message = {
      ...msgData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString()
    };
    setData(prev => ({ ...prev, messages: [newMessage, ...prev.messages] }));
  };

  const addToCart = (product: Product) => {
      setCart(prev => {
          const existing = prev.find(p => p.id === product.id);
          if (existing) {
              return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
          }
          return [...prev, { ...product, quantity: 1 }];
      });
      // Simple visual feedback could be added here
      alert(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: string, delta: number) => {
      setCart(prev => prev.map(item => {
          if (item.id === id) {
              const newQty = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQty };
          }
          return item;
      }));
  };

  const removeFromCart = (id: string) => {
      setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const handleViewNewsDetail = (id: string) => {
      setSelectedId(id);
      setView(ViewType.NEWS_DETAIL);
  };

  const handleViewProductDetail = (id: string) => {
      setSelectedId(id);
      setView(ViewType.PRODUCT_DETAIL);
  };

  const renderView = () => {
    switch (view) {
      case ViewType.HOME:
        return <HomeView data={data} setView={setView} />;
      case ViewType.NEWS:
        return <NewsView items={data.news} onViewDetail={handleViewNewsDetail} />;
      case ViewType.NEWS_DETAIL:
        const newsItem = data.news.find(n => n.id === selectedId);
        return newsItem ? <NewsDetailView item={newsItem} onBack={() => setView(ViewType.NEWS)} /> : <NewsView items={data.news} onViewDetail={handleViewNewsDetail} />;
      case ViewType.ECOMMERCE:
        return <EcommerceView products={data.products} onAddToCart={addToCart} onViewDetail={handleViewProductDetail} />;
      case ViewType.PRODUCT_DETAIL:
        const productItem = data.products.find(p => p.id === selectedId);
        return productItem ? <ProductDetailView product={productItem} onAddToCart={addToCart} onBack={() => setView(ViewType.ECOMMERCE)} /> : <EcommerceView products={data.products} onAddToCart={addToCart} onViewDetail={handleViewProductDetail} />;
      case ViewType.CART:
        return <CartView cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} setView={setView} />;
      case ViewType.CHECKOUT:
        return <CheckoutView cart={cart} clearCart={clearCart} setView={setView} />;
      case ViewType.GRAPHIC_DESIGN:
        return <PortfolioView items={data.portfolio} type="graphic" />;
      case ViewType.WEB_DESIGN:
        return <PortfolioView items={data.portfolio} type="web" />;
      case ViewType.ABOUT:
        return <AboutView />;
      case ViewType.CONTACT:
        return <ContactView onSendMessage={handleSendMessage} />;
      case ViewType.DESIGN_INSPIRATION:
        return <PortfolioView items={data.portfolio} type="graphic" />;
      case ViewType.ADMIN:
        return <AdminView 
            data={data} 
            setData={setData} 
            onLogout={() => { setAdminAuthenticated(false); setView(ViewType.HOME); }} 
            isAuthenticated={adminAuthenticated}
            setIsAuthenticated={setAdminAuthenticated}
            onBack={() => setView(ViewType.HOME)}
        />;
      default:
        return <HomeView data={data} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark transition-colors duration-300">
      {view !== ViewType.ADMIN && (
        <Navbar 
            setView={setView} 
            currentView={view} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            cartItemCount={cart.reduce((a, b) => a + b.quantity, 0)}
        />
      )}
      
      <main className={view === ViewType.HOME ? '' : 'pt-6'}>
        {renderView()}
      </main>

      {view !== ViewType.ADMIN && <Footer setView={setView} />}
    </div>
  );
}