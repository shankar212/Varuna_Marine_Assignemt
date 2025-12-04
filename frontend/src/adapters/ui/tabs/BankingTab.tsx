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
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Banking & Compliance</h2>

            <div className="flex gap-4 mb-8 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ship ID</label>
                    <input
                        type="text"
                        value={shipId}
                        onChange={(e) => setShipId(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
                <button
                    onClick={fetchData}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    Fetch Data
                </button>
            </div>

            {cb && (
                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-medium mb-4">Compliance Balance</h3>
                        <div className={`text-3xl font-bold mb-2 ${cb.cb >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {cb.cb.toLocaleString()} <span className="text-base font-normal text-gray-500">gCO₂e</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-6">
                            {cb.cb >= 0 ? 'Surplus available' : 'Deficit'}
                        </div>

                        <button
                            onClick={handleBank}
                            disabled={cb.cb <= 0}
                            className={`w-full py-2 rounded text-sm font-medium ${cb.cb > 0
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Bank Surplus
                        </button>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4">Banking Records</h3>
                        {records.length === 0 ? (
                            <div className="text-gray-500 text-sm">No banking records found.</div>
                        ) : (
                            <ul className="space-y-2">
                                {records.map(r => (
                                    <li key={r.id} className="bg-white border border-gray-200 p-3 rounded flex justify-between text-sm">
                                        <span>Year {r.year}</span>
                                        <span className="font-medium text-green-600">+{r.amount.toLocaleString()}</span>
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
