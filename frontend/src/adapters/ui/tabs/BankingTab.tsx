import React, { useState } from 'react';
import { api } from '../../infrastructure/api.client';
import type { ComplianceBalance, BankEntry } from '../../../core/domain/entities';

const BankingTab: React.FC = () => {
    const [shipId, setShipId] = useState('R001'); // Default for demo
    const [year, setYear] = useState(2025);
    const [cb, setCb] = useState<ComplianceBalance | null>(null);
    const [records, setRecords] = useState<BankEntry[]>([]);

    const fetchData = async () => {
        try {
            const balance = await api.getComplianceBalance(shipId, year);
            setCb(balance);
            const bankRecords = await api.getBankingRecords(shipId, year);
            setRecords(bankRecords);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBank = async () => {
        try {
            await api.bankSurplus(shipId, year);
            fetchData();
        } catch (err) {
            alert('Failed to bank surplus');
        }
    };

    return (
    return (
        <div className="space-y-8">
            <div className="border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-bold text-slate-800">Banking & Compliance</h2>
                <p className="text-slate-500 text-sm mt-1">Manage compliance balances and bank surplus for future years.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
                <div className="flex gap-6 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ship ID</label>
                        <input
                            type="text"
                            value={shipId}
                            onChange={(e) => setShipId(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="e.g. R001"
                        />
                    </div>
                    <div className="w-32">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchData}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                    >
                        Fetch Data
                    </button>
                </div>
            </div>

            {cb && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-6">Compliance Balance</h3>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className={`text-5xl font-bold tracking-tight ${cb.cb >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {cb.cb.toLocaleString()}
                                </span>
                                <span className="text-lg font-medium text-slate-500">gCO₂e</span>
                            </div>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cb.cb >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {cb.cb >= 0 ? 'Surplus Available' : 'Deficit Detected'}
                            </div>
                        </div>

                        <button
                            onClick={handleBank}
                            disabled={cb.cb <= 0}
                            className={`w-full mt-8 py-3 rounded-xl text-sm font-semibold transition-all ${cb.cb > 0
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            Bank Surplus to Next Year
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-lg font-semibold text-slate-800">Banking History</h3>
                        </div>
                        <div className="p-0">
                            {records.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 text-sm">
                                    No banking records found for this vessel.
                                </div>
                            ) : (
                                <ul className="divide-y divide-slate-100">
                                    {records.map(r => (
                                        <li key={r.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Year {r.year}</span>
                                            </div>
                                            <span className="font-mono font-semibold text-emerald-600">+{r.amount.toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankingTab;
