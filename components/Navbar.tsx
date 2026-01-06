
import React, { useState } from 'react';
import { Theme, Language } from '../types';

interface NavbarProps {
  t: any;
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onNavigate: (page: any) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  t, theme, setTheme, lang, setLang, onNavigate, searchQuery, setSearchQuery 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold">U</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            UWED <span className="text-blue-600">Media</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors font-medium">{t.home}</button>
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors font-medium">{t.news}</button>
          <button onClick={() => onNavigate('experts')} className="hover:text-blue-600 transition-colors font-medium">{t.experts}</button>
          <button onClick={() => onNavigate('multimedia')} className="hover:text-blue-600 transition-colors font-medium">{t.multimedia}</button>
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors font-medium">{t.about}</button>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Toggle */}
          <div className="relative flex items-center">
             <input 
              type="text"
              placeholder={t.searchPlaceholder}
              className={`transition-all duration-300 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-1.5 focus:ring-2 focus:ring-blue-500 hidden lg:block ${isSearchVisible ? 'w-64 opacity-100' : 'w-0 opacity-0 lg:w-48 lg:opacity-100'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-1 py-1">
            {['en', 'ru', 'uz'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as Language)}
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all ${lang === l ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Profile */}
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer hover:scale-110 transition-transform">
            <img src="https://i.pravatar.cc/150?u=me" alt="User" />
          </div>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-in slide-in-from-top duration-300">
           <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium py-2">{t.home}</button>
           <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium py-2">{t.news}</button>
           <button onClick={() => { onNavigate('experts'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium py-2">{t.experts}</button>
           <button onClick={() => { onNavigate('multimedia'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium py-2">{t.multimedia}</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
