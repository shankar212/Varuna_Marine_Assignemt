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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Banking & Compliance</h2>
                <p className="text-slate-500 mt-1">Manage compliance balances and bank surplus for future years.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 items-end bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="w-full md:w-48">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ship ID</label>
                    <input
                        type="text"
                        value={shipId}
                        onChange={(e) => setShipId(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="w-full md:w-48">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
                <button
                    onClick={fetchData}
                    className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                >
                    Fetch Data
                </button>
            </div>

            {cb && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 ${cb.cb >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                        <h3 className="text-lg font-semibold text-slate-900 mb-6 relative z-10">Compliance Balance</h3>

                        <div className="flex items-baseline gap-2 mb-2 relative z-10">
                            <span className={`text-4xl font-bold tracking-tight ${cb.cb >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {cb.cb.toLocaleString()}
                            </span>
                            <span className="text-sm font-medium text-slate-500">gCO₂e</span>
                        </div>

                        <div className="text-sm text-slate-500 mb-8 relative z-10">
                            {cb.cb >= 0 ? (
                                <span className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Surplus Available
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-rose-700 bg-rose-50 px-3 py-1 rounded-full w-fit">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Deficit Detected
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleBank}
                            disabled={cb.cb <= 0}
                            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all relative z-10 ${cb.cb > 0
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            Bank Surplus
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">Banking Records</h3>
                        {records.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                                <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-sm">No banking records found</span>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {records.map(r => (
                                    <li key={r.id} className="group flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-lg hover:border-blue-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">Year {r.year}</span>
                                        </div>
                                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+{r.amount.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankingTab;
