import React, { useEffect, useState } from 'react';
import type { Route } from '../../../core/domain/entities';
import { api } from '../../infrastructure/api.client';

const CompareTab: React.FC = () => {
    const [data, setData] = useState<{ baseline: Route | null, comparisons: Route[] }>({ baseline: null, comparisons: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await api.getComparison();
                setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div>Loading comparison...</div>;
    if (!data.baseline) return <div className="text-center p-8 text-gray-500">No baseline selected. Please go to Routes tab and set a baseline.</div>;

    return (
        <div className="space-y-8">
            <div className="border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-bold text-slate-800">Compliance Comparison</h2>
                <p className="text-slate-500 text-sm mt-1">Compare fleet routes against the selected baseline.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">Baseline Configuration ({data.baseline.routeId})</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50">
                        <span className="text-blue-500 text-xs font-semibold uppercase tracking-wider block mb-1">Route ID</span>
                        <span className="text-xl font-bold text-slate-800">{data.baseline.routeId}</span>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50">
                        <span className="text-blue-500 text-xs font-semibold uppercase tracking-wider block mb-1">GHG Intensity</span>
                        <span className="text-xl font-bold text-slate-800">{data.baseline.ghgIntensity} <span className="text-sm font-normal text-slate-500">gCO₂e/MJ</span></span>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50">
                        <span className="text-blue-500 text-xs font-semibold uppercase tracking-wider block mb-1">Fuel Type</span>
                        <span className="text-xl font-bold text-slate-800">{data.baseline.fuelType}</span>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50">
                        <span className="text-blue-500 text-xs font-semibold uppercase tracking-wider block mb-1">Target (2025)</span>
                        <span className="text-xl font-bold text-slate-800">89.34 <span className="text-sm font-normal text-slate-500">gCO₂e/MJ</span></span>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Route ID</th>
                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">GHG Intensity</th>
                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Diff vs Baseline</th>
                            <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {data.comparisons.map((route) => (
                            <tr key={route.routeId} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-6 font-medium text-slate-900">{route.routeId}</td>
                                <td className="py-4 px-6 text-right font-mono text-slate-600">{route.ghgIntensity.toFixed(2)}</td>
                                <td className="py-4 px-6 text-right">
                                    <span className={`inline-flex items-center font-medium ${(route.percentDiff || 0) > 0 ? 'text-rose-600' : 'text-emerald-600'
                                        }`}>
                                        {(route.percentDiff || 0) > 0 ? '+' : ''}{(route.percentDiff || 0).toFixed(2)}%
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {route.isCompliant ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                            Compliant
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2"></span>
                                            Non-Compliant
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompareTab;
