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
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Comparison vs Baseline ({data.baseline.routeId})</h2>

            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Baseline Details</h3>
                <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="text-blue-500 block">ID</span>
                        <span className="font-medium">{data.baseline.routeId}</span>
                    </div>
                    <div>
                        <span className="text-blue-500 block">GHG Intensity</span>
                        <span className="font-medium">{data.baseline.ghgIntensity} gCO₂e/MJ</span>
                    </div>
                    <div>
                        <span className="text-blue-500 block">Fuel</span>
                        <span className="font-medium">{data.baseline.fuelType}</span>
                    </div>
                    <div>
                        <span className="text-blue-500 block">Target (2025)</span>
                        <span className="font-medium">89.3368 gCO₂e/MJ</span>
                    </div>
                </div>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                        <th className="py-3 px-4">Route ID</th>
                        <th className="py-3 px-4">GHG Intensity</th>
                        <th className="py-3 px-4">Diff vs Baseline</th>
                        <th className="py-3 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.comparisons.map((route) => (
                        <tr key={route.routeId} className="border-b border-gray-100">
                            <td className="py-3 px-4 font-medium">{route.routeId}</td>
                            <td className="py-3 px-4">{route.ghgIntensity.toFixed(2)}</td>
                            <td className="py-3 px-4">
                                <span className={`font-medium ${(route.percentDiff || 0) > 0 ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                    {(route.percentDiff || 0) > 0 ? '+' : ''}{(route.percentDiff || 0).toFixed(2)}%
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                {route.isCompliant ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Compliant
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Non-Compliant
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompareTab;
