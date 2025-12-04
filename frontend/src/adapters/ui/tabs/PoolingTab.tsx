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
    return (
        <div className="space-y-8">
            <div className="border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-bold text-slate-800">Compliance Pooling</h2>
                <p className="text-slate-500 text-sm mt-1">Create pools to offset deficits with surplus from other vessels.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pool Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ship IDs (comma separated)</label>
                        <input
                            type="text"
                            value={shipIds}
                            onChange={(e) => setShipIds(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. R001, R002, R003"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                        * Pooling reallocates compliance balances to minimize penalties across the fleet.
                    </p>
                    <button
                        onClick={handleCreatePool}
                        className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                    >
                        Calculate Pool
                    </button>
                </div>
                {error && (
                    <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-3 text-rose-700 text-sm">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}
            </div>

            {pool && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800">Pool Calculation Results</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ship ID</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">CB Before</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">CB After</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Net Change</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pool.members.map((member) => (
                                    <tr key={member.shipId} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-slate-900">{member.shipId}</td>
                                        <td className="py-4 px-6 text-right font-mono text-slate-500">{member.cbBefore.toFixed(0)}</td>
                                        <td className="py-4 px-6 text-right font-mono font-medium">
                                            <span className={member.cbAfter >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                                                {member.cbAfter.toFixed(0)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right text-sm font-mono">
                                            <span className={(member.cbAfter - member.cbBefore) > 0 ? 'text-emerald-600' : (member.cbAfter - member.cbBefore) < 0 ? 'text-rose-600' : 'text-slate-400'}>
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
