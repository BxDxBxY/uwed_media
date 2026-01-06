
import React, { useState } from 'react';
import { MOCK_NEWS } from '../constants';
import { useStore } from '../store';

interface ArticleDetailProps {
  t: any;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ t, onBack }) => {
  const [comment, setComment] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  // Accessing global state to get current language
  const { state } = useStore();

  // Helper function to extract the correct localized string
  const getLoc = (obj: any): string => {
    if (typeof obj === 'string') return obj;
    if (!obj) return "";
    return obj[state.lang] || obj.en || "";
  };

  return (
    <article className="animate-in fade-in duration-700 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-blue-600 font-bold hover:translate-x-[-4px] transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to News
      </button>

      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          Campus Chronicle Unveils New Media Hub
        </h1>
        <div className="flex items-center justify-center space-x-4 text-slate-500 dark:text-slate-400 font-medium italic">
          <span>By Sarah Thompson</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>Published on October 26, 2023</span>
        </div>
      </header>

      <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img src="https://picsum.photos/1200/600?random=1" alt="Article Header" className="w-full object-cover" />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
        <p className="text-xl font-medium">
          The Campus Chronicle is thrilled to announce the launch of its new media hub, a dynamic platform designed to showcase the vibrant life and groundbreaking work happening at our university. This hub will serve as a central repository for all university-related news, events, research, and stories about our people, offering an immersive experience for students, faculty, alumni, and the broader community.
        </p>
        <p>
          The new media hub features a sleek, user-friendly interface with intuitive navigation, making it easy to find the information you need. Key highlights include a comprehensive news section with the latest updates on campus activities, a detailed events calendar, a research showcase highlighting faculty and student projects, and a 'People' section spotlighting the diverse individuals who make our university unique.
        </p>
        <blockquote className="border-l-4 border-blue-600 pl-8 py-4 italic text-2xl font-serif text-slate-800 dark:text-white">
          "We invite you to explore the new media hub and discover the rich tapestry of stories and achievements that define our university. Your feedback is invaluable as we continue to refine and expand this platform to better serve our community."
        </blockquote>
        <p>
          In addition to these core features, the hub includes multimedia content such as videos, photo galleries, and interactive elements to enhance engagement. Users can also subscribe to newsletters for regular updates and follow the Campus Chronicle on social media for real-time news and announcements.
        </p>
      </div>

      <div className="mt-12 py-8 border-y border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:fill-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-bold">234</span>
          </button>
          <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-bold">56</span>
          </button>
        </div>
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className={`flex items-center space-x-2 transition-colors ${isSaved ? 'text-blue-600' : 'text-slate-500 hover:text-blue-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isSaved ? 'fill-blue-600' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="font-bold">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      <section className="mt-20">
        <h3 className="text-3xl font-bold font-serif mb-10">{t.relatedArticles}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_NEWS.slice(1, 3).map(article => (
            <div key={article.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-slate-100 dark:border-slate-800">
               <div className="aspect-video relative overflow-hidden">
                  {/* Fix: use getLoc for alt text to handle LocalizedString type */}
                  <img src={article.image} alt={getLoc(article.title)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="p-8">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{article.category}</span>
                  {/* Fix: use getLoc for article title to handle LocalizedString type */}
                  <h4 className="text-2xl font-bold mt-2 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{getLoc(article.title)}</h4>
                  <p className="text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
                  <button className="text-blue-600 font-bold">Read More →</button>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 pb-20">
        <h3 className="text-3xl font-bold font-serif mb-10">{t.comments} (2)</h3>
        <div className="space-y-8 mb-12">
           <div className="flex space-x-4">
              <img src="https://i.pravatar.cc/150?u=alex" className="w-12 h-12 rounded-full ring-2 ring-blue-500/20" alt="Avatar" />
              <div>
                 <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold">Alex Johnson</span>
                    <span className="text-xs text-slate-400">2 days ago</span>
                 </div>
                 <p className="text-slate-600 dark:text-slate-400">Great initiative! The new hub is a fantastic resource for staying connected with campus life.</p>
              </div>
           </div>
           <div className="flex space-x-4">
              <img src="https://i.pravatar.cc/150?u=emily" className="w-12 h-12 rounded-full ring-2 ring-blue-500/20" alt="Avatar" />
              <div>
                 <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold">Emily Chen</span>
                    <span className="text-xs text-slate-400">1 day ago</span>
                 </div>
                 <p className="text-slate-600 dark:text-slate-400">I love the new design and how easy it is to navigate. The research section is particularly impressive.</p>
              </div>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
           <h4 className="text-xl font-bold mb-6">{t.addComment}</h4>
           <div className="flex space-x-4">
              <img src="https://i.pravatar.cc/150?u=me" className="w-12 h-12 rounded-full ring-2 ring-blue-500/20" alt="Your Avatar" />
              <div className="flex-grow">
                 <textarea 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                 ></textarea>
                 <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                       <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                       </button>
                       <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                       </button>
                    </div>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-full transition-all shadow-lg hover:shadow-blue-500/40 transform active:scale-95"
                    >
                      {t.postComment}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </article>
  );
};

export default ArticleDetail;
