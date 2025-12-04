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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Route Data</h2>
                <button
                    onClick={fetchRoutes}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                    Refresh
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Vessel Type</th>
                            <th className="py-3 px-4">Fuel</th>
                            <th className="py-3 px-4">Year</th>
                            <th className="py-3 px-4 text-right">GHG Intensity</th>
                            <th className="py-3 px-4 text-right">Consumption (t)</th>
                            <th className="py-3 px-4 text-right">Distance (km)</th>
                            <th className="py-3 px-4 text-right">Emissions (t)</th>
                            <th className="py-3 px-4 text-center">Baseline</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {routes.map((route) => (
                            <tr key={route.routeId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 font-medium">{route.routeId}</td>
                                <td className="py-3 px-4">{route.vesselType}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${route.fuelType === 'LNG' ? 'bg-green-100 text-green-700' :
                                        route.fuelType === 'MGO' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {route.fuelType}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{route.year}</td>
                                <td className="py-3 px-4 text-right">{route.ghgIntensity.toFixed(2)}</td>
                                <td className="py-3 px-4 text-right">{route.fuelConsumption.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right">{route.distance.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right">{route.totalEmissions.toLocaleString()}</td>
                                <td className="py-3 px-4 text-center">
                                    {route.isBaseline ? (
                                        <span className="text-blue-600 font-bold">✓</span>
                                    ) : (
                                        <span className="text-gray-300">-</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {!route.isBaseline && (
                                        <button
                                            onClick={() => handleSetBaseline(route.routeId)}
                                            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-colors"
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
