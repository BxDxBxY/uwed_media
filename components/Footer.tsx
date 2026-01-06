
import React from 'react';

interface FooterProps {
  t: any;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
         <div className="flex items-center space-x-2 mb-8 scale-125">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              UWED <span className="text-blue-600">Media</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12 text-slate-500 dark:text-slate-400 font-medium">
             <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
             <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-blue-600 transition-colors">Accessibility</a>
             <a href="#" className="hover:text-blue-600 transition-colors">Archives</a>
          </div>

          <div className="flex space-x-6 mb-12">
             {['twitter', 'facebook', 'instagram', 'youtube'].map((s) => (
                <a key={s} href="#" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                   <span className="sr-only">{s}</span>
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                   </svg>
                </a>
             ))}
          </div>

          <p className="text-slate-400 text-sm">
            &copy; 2024 UWED Media Portal. All rights reserved. Built with passion for the academic community.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
