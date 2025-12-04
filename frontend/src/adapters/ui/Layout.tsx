import React, { useState } from 'react';
import RoutesTab from './tabs/RoutesTab';
import CompareTab from './tabs/CompareTab';
import BankingTab from './tabs/BankingTab';
import PoolingTab from './tabs/PoolingTab';

const Layout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'routes' | 'compare' | 'banking' | 'pooling'>('routes');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-blue-900 text-white p-6 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">FuelEU Maritime Compliance</h1>
                    <div className="text-sm opacity-80">Assignment Demo</div>
                </div>
            </header>

            <main className="container mx-auto p-6">
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8 w-fit">
                    {['routes', 'compare', 'banking', 'pooling'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize ${activeTab === tab
                                ? 'bg-white text-blue-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
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
