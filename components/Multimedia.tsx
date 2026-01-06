
import React from 'react';
import { MOCK_MULTIMEDIA } from '../constants';

interface MultimediaProps {
  t: any;
}

const Multimedia: React.FC<MultimediaProps> = ({ t }) => {
  const podcasts = MOCK_MULTIMEDIA.filter(m => m.type === 'podcast');
  const videos = MOCK_MULTIMEDIA.filter(m => m.type === 'video');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">{t.multimedia}</h1>
        <p className="text-xl text-slate-500 max-w-2xl">
          Explore our collection of podcasts and video highlights, showcasing the diverse voices and stories of our campus community.
        </p>
      </div>

      {/* Podcasts Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold">{t.podcasts}</h2>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {podcasts.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Highlights Section */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold">{t.videoHighlights}</h2>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((v) => (
            <div key={v.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl group-hover:shadow-2xl transition-all">
                <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-blue-600 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                  12:45
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{v.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl">{v.description}</p>
            </div>
          ))}
          
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 flex flex-col items-center justify-center group cursor-pointer shadow-xl">
             <div className="absolute inset-0 opacity-40">
                <img src="https://picsum.photos/800/450?random=33" alt="Background" className="w-full h-full object-cover blur-sm" />
             </div>
             <div className="relative z-10 text-center p-8">
                <h3 className="text-3xl font-serif text-white mb-4">Watch Live Events</h3>
                <p className="text-slate-200 mb-6">Never miss a graduation or major symposium.</p>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all">Go to Live Portal</button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Multimedia;
