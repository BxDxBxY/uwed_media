
import React from 'react';
import { MOCK_NEWS } from '../constants';
import { useStore } from '../store';

interface HomeProps {
  t: any;
  onNavigateToArticle: () => void;
}

const Home: React.FC<HomeProps> = ({ t, onNavigateToArticle }) => {
  // Accessing global state to get current language
  const { state } = useStore();

  // Helper function to extract the correct localized string
  const getLoc = (obj: any): string => {
    if (typeof obj === 'string') return obj;
    if (!obj) return "";
    return obj[state.lang] || obj.en || "";
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden group">
        <img 
          src="https://picsum.photos/1920/1080?random=100" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 drop-shadow-2xl">
            The Voice of UWED
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8 leading-relaxed">
            Your futuristic portal to news, stories, and insights from the University of World Economy and Diplomacy.
          </p>
          <button 
            onClick={onNavigateToArticle}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-blue-500/40"
          >
            {t.exploreNow}
          </button>
        </div>
      </section>

      {/* Radio Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 relative">
          <div className="w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg ring-4 ring-blue-500/20">
             <img src="https://picsum.photos/100/100?random=radio" alt="Radio Cover" />
          </div>
          <div className="absolute -top-2 -right-2 flex items-center bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1"></span>
            {t.liveNow}
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">{t.radio}</h2>
          <p className="text-slate-500 dark:text-slate-400">Live Broadcast: The Future of Diplomacy in Tech</p>
          <p className="text-sm text-blue-500 font-medium">Hosted by Dr. Evelyn Reed</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transform transition active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
      </section>

      {/* News Highlights */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif">News Highlights</h2>
          <div className="h-1 flex-grow mx-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            onClick={onNavigateToArticle}
            className="md:col-span-2 lg:row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl"
          >
            <img src={MOCK_NEWS[3].image} alt="Main News" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">{MOCK_NEWS[3].category}</span>
              {/* Fix: use getLoc for article title to handle LocalizedString type */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">{getLoc(MOCK_NEWS[3].title)}</h3>
              <p className="text-slate-300 line-clamp-2 max-w-xl">{MOCK_NEWS[3].excerpt}</p>
            </div>
          </div>
          {MOCK_NEWS.slice(0, 3).map((article) => (
            <div 
              key={article.id} 
              onClick={onNavigateToArticle}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                {/* Fix: use getLoc for alt text to handle LocalizedString type */}
                <img src={article.image} alt={getLoc(article.title)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                   <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{article.category}</span>
                </div>
              </div>
              <div className="p-6">
                {/* Fix: use getLoc for article title to handle LocalizedString type */}
                <h4 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors leading-snug">{getLoc(article.title)}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{article.excerpt}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-bold">
                  Read More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Timeline Preview */}
      <section className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold font-serif mb-10 text-center">Upcoming Events</h2>
          <div className="max-w-4xl mx-auto space-y-8">
              {[
                  { date: 'July 15, 2024', title: 'Research Symposium', icon: 'Symposium' },
                  { date: 'August 20, 2024', title: 'Alumni Networking Event', icon: 'Networking' },
                  { date: 'September 10-14, 2024', title: 'Campus Sustainability Week', icon: 'Green' }
              ].map((event, idx) => (
                  <div key={idx} className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-6 group-hover:bg-blue-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                      </div>
                      <div className="pt-1">
                          <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">{event.date}</p>
                          <h4 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{event.title}</h4>
                      </div>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
};

export default Home;
