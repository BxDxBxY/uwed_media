
import React, { useState } from 'react';
import { MOCK_EXPERTS } from '../constants';

interface ExpertsProps {
  t: any;
}

const Experts: React.FC<ExpertsProps> = ({ t }) => {
  const [filter, setFilter] = useState('');

  const filteredExperts = MOCK_EXPERTS.filter(e => 
    e.name.toLowerCase().includes(filter.toLowerCase()) || 
    e.expertise.toLowerCase().includes(filter.toLowerCase()) ||
    e.department.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">University Experts</h1>
        <p className="text-xl text-slate-500 max-w-2xl mb-8">
          Find the right expert for your story from our world-class faculty.
        </p>
        
        <div className="relative max-w-2xl group">
          <input 
            type="text" 
            placeholder="Search experts by name, department, or expertise..." 
            className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-lg transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Featured Experts Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-10 text-slate-400 uppercase tracking-widest">{t.featuredExperts}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {MOCK_EXPERTS.map((e) => (
            <div key={e.id} className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-500 transition-all duration-300 p-2">
                <img src={e.image} alt={e.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{e.name}</h3>
              <p className="text-slate-500 text-sm font-medium">{e.department}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experts Table */}
      <section>
        <h2 className="text-2xl font-bold mb-8">{t.allExperts}</h2>
        <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-sm font-bold uppercase tracking-wider">
                <th className="px-8 py-6">{t.name}</th>
                <th className="px-8 py-6">{t.department}</th>
                <th className="px-8 py-6">{t.expertise}</th>
                <th className="px-8 py-6">{t.contact}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredExperts.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 font-bold">{e.name}</td>
                  <td className="px-8 py-6 text-slate-500 dark:text-slate-400">{e.department}</td>
                  <td className="px-8 py-6">
                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
                      {e.expertise}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-blue-600 font-bold hover:underline">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredExperts.length === 0 && (
            <div className="p-20 text-center text-slate-500">No experts found matching your search.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Experts;
