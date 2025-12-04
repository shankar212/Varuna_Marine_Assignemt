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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Comparison Analysis</h2>
                <p className="text-slate-500 mt-1">Compare route performance against the selected baseline.</p>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Baseline: {data.baseline.routeId}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">GHG Intensity</span>
                        <div className="mt-1 text-2xl font-bold text-slate-900">{data.baseline.ghgIntensity} <span className="text-sm font-normal text-slate-400">gCO₂e/MJ</span></div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Fuel Type</span>
                        <div className="mt-1 text-2xl font-bold text-slate-900">{data.baseline.fuelType}</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Target (2025)</span>
                        <div className="mt-1 text-2xl font-bold text-slate-900">89.34 <span className="text-sm font-normal text-slate-400">gCO₂e/MJ</span></div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-blue-50 shadow-sm">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vessel Type</span>
                        <div className="mt-1 text-2xl font-bold text-slate-900">{data.baseline.vesselType}</div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="py-4 px-6 border-b border-slate-200">Route ID</th>
                            <th className="py-4 px-6 border-b border-slate-200">GHG Intensity</th>
                            <th className="py-4 px-6 border-b border-slate-200">Diff vs Baseline</th>
                            <th className="py-4 px-6 border-b border-slate-200">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                        {data.comparisons.map((route) => (
                            <tr key={route.routeId} className="transition-colors hover:bg-slate-50/80">
                                <td className="py-4 px-6 font-medium text-slate-900">{route.routeId}</td>
                                <td className="py-4 px-6 text-slate-600 font-mono">{route.ghgIntensity.toFixed(2)}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1 font-medium ${(route.percentDiff || 0) > 0 ? 'text-rose-600' : 'text-emerald-600'
                                        }`}>
                                        {(route.percentDiff || 0) > 0 ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                            </svg>
                                        )}
                                        {Math.abs(route.percentDiff || 0).toFixed(2)}%
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    {route.isCompliant ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                                            Compliant
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
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
