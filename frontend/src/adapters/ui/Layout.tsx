import React, { useState } from 'react';
import RoutesTab from './tabs/RoutesTab';
import CompareTab from './tabs/CompareTab';
import BankingTab from './tabs/BankingTab';
import PoolingTab from './tabs/PoolingTab';

const Layout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'routes' | 'compare' | 'banking' | 'pooling'>('routes');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-200">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900">FuelEU Maritime</h1>
                            <p className="text-xs text-slate-500 font-medium">Compliance Platform</p>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        Assignment - by Rathod Shanker
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <nav className="flex space-x-1 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-fit">
                        {['routes', 'compare', 'banking', 'pooling'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[600px] transition-all duration-300">
                    {activeTab === 'routes' && <RoutesTab />}
                    {activeTab === 'compare' && <CompareTab />}
                    {activeTab === 'banking' && <BankingTab />}
                    {activeTab === 'pooling' && <PoolingTab />}
                </div>
            </main>
        </div>
    );
};

export default Layout;
