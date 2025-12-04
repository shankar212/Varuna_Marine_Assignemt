import React, { useState } from 'react';
import RoutesTab from './tabs/RoutesTab';
import CompareTab from './tabs/CompareTab';
import BankingTab from './tabs/BankingTab';
import PoolingTab from './tabs/PoolingTab';

const Layout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'routes' | 'compare' | 'banking' | 'pooling'>('routes');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            <header className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-inner">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">FuelEU Maritime</h1>
                            <div className="text-xs text-blue-200 font-medium">Compliance Platform</div>
                        </div>
                    </div>
                    <div className="text-sm font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                        Assignment - by Rathod Shanker
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <nav className="md:w-64 flex-shrink-0 space-y-2">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 sticky top-24">
                            {['routes', 'compare', 'banking', 'pooling'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 capitalize flex items-center justify-between group ${activeTab === tab
                                        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[600px] transition-all duration-300">
                            {activeTab === 'routes' && <RoutesTab />}
                            {activeTab === 'compare' && <CompareTab />}
                            {activeTab === 'banking' && <BankingTab />}
                            {activeTab === 'pooling' && <PoolingTab />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
