import React, { useEffect, useState } from 'react';
import type { Route } from '../../../core/domain/entities';
import { api } from '../../infrastructure/api.client';

const RoutesTab: React.FC = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoutes = async () => {
        try {
            setLoading(true);
            const data = await api.getRoutes();
            setRoutes(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch routes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    const handleSetBaseline = async (routeId: string) => {
        try {
            await api.setBaseline(routeId);
            await fetchRoutes(); // Refresh to show updated baseline status
        } catch (err) {
            alert('Failed to set baseline');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading routes...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Fleet Routes</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage vessel routes and set baseline for compliance.</p>
                </div>
                <button
                    onClick={fetchRoutes}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Data
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            {['ID', 'Vessel Type', 'Fuel', 'Year', 'GHG Intensity', 'Consumption', 'Distance', 'Emissions', 'Baseline', 'Actions'].map((header, i) => (
                                <th key={header} className={`py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider ${i > 3 ? 'text-right' : ''} ${header === 'Baseline' || header === 'Actions' ? 'text-center' : ''}`}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {routes.map((route) => (
                            <tr key={route.routeId} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="py-4 px-6 font-medium text-slate-900">{route.routeId}</td>
                                <td className="py-4 px-6 text-slate-600">{route.vesselType}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${route.fuelType === 'LNG' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        route.fuelType === 'MGO' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-slate-100 text-slate-700 border-slate-200'
                                        }`}>
                                        {route.fuelType}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-slate-600">{route.year}</td>
                                <td className="py-4 px-6 text-right font-mono text-slate-600">{route.ghgIntensity.toFixed(2)}</td>
                                <td className="py-4 px-6 text-right font-mono text-slate-600">{route.fuelConsumption.toLocaleString()}</td>
                                <td className="py-4 px-6 text-right font-mono text-slate-600">{route.distance.toLocaleString()}</td>
                                <td className="py-4 px-6 text-right font-mono text-slate-600">{route.totalEmissions.toLocaleString()}</td>
                                <td className="py-4 px-6 text-center">
                                    {route.isBaseline ? (
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <span className="text-slate-300">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {!route.isBaseline && (
                                        <button
                                            onClick={() => handleSetBaseline(route.routeId)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:border-blue-300 font-medium shadow-sm"
                                        >
                                            Set Baseline
                                        </button>
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

export default RoutesTab;
