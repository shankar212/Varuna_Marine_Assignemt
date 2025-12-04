import React, { useState } from 'react';
import { api } from '../../infrastructure/api.client';
import type { Pool } from '../../../core/domain/entities';

const PoolingTab: React.FC = () => {
    const [year, setYear] = useState(2025);
    const [shipIds, setShipIds] = useState('R001,R002,R003');
    const [pool, setPool] = useState<Pool | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreatePool = async () => {
        try {
            setError(null);
            const ids = shipIds.split(',').map(s => s.trim());
            const result = await api.createPool(year, ids);
            setPool(result);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create pool');
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Pooling Management</h2>
                <p className="text-slate-500 mt-1">Create pools and reallocate compliance balances between vessels.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 mb-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pool Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ship IDs (comma separated)</label>
                        <input
                            type="text"
                            value={shipIds}
                            onChange={(e) => setShipIds(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="R001, R002, R003"
                        />
                    </div>
                </div>
                <button
                    onClick={handleCreatePool}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Pool
                </button>
                {error && (
                    <div className="mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-lg flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}
            </div>

            {pool && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-lg font-semibold text-slate-900">Pool Results</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50">
                                <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <th className="py-4 px-6 border-b border-slate-200">Ship ID</th>
                                    <th className="py-4 px-6 border-b border-slate-200 text-right">CB Before</th>
                                    <th className="py-4 px-6 border-b border-slate-200 text-right">CB After</th>
                                    <th className="py-4 px-6 border-b border-slate-200 text-right">Change</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-100">
                                {pool.members.map((member) => (
                                    <tr key={member.shipId} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-slate-900">{member.shipId}</td>
                                        <td className="py-4 px-6 text-right text-slate-500 font-mono">{member.cbBefore.toFixed(0)}</td>
                                        <td className="py-4 px-6 text-right font-medium font-mono">
                                            <span className={member.cbAfter >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                                                {member.cbAfter.toFixed(0)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right text-sm font-mono">
                                            <span className={(member.cbAfter - member.cbBefore) > 0 ? 'text-emerald-600' : 'text-slate-500'}>
                                                {(member.cbAfter - member.cbBefore) > 0 ? '+' : ''}{(member.cbAfter - member.cbBefore).toFixed(0)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PoolingTab;
