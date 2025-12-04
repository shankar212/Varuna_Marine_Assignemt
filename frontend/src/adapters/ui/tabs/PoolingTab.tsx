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
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Pooling</h2>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pool Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ship IDs (comma separated)</label>
                        <input
                            type="text"
                            value={shipIds}
                            onChange={(e) => setShipIds(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            placeholder="R001, R002, R003"
                        />
                    </div>
                </div>
                <button
                    onClick={handleCreatePool}
                    className="bg-indigo-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-indigo-700"
                >
                    Create Pool
                </button>
                {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
            </div>

            {pool && (
                <div>
                    <h3 className="text-lg font-medium mb-4">Pool Results</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                    <th className="py-3 px-4">Ship ID</th>
                                    <th className="py-3 px-4 text-right">CB Before</th>
                                    <th className="py-3 px-4 text-right">CB After</th>
                                    <th className="py-3 px-4 text-right">Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pool.members.map((member) => (
                                    <tr key={member.shipId} className="border-b border-gray-100">
                                        <td className="py-3 px-4 font-medium">{member.shipId}</td>
                                        <td className="py-3 px-4 text-right text-gray-500">{member.cbBefore.toFixed(0)}</td>
                                        <td className="py-3 px-4 text-right font-medium">
                                            <span className={member.cbAfter >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                {member.cbAfter.toFixed(0)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right text-sm">
                                            {(member.cbAfter - member.cbBefore).toFixed(0)}
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
