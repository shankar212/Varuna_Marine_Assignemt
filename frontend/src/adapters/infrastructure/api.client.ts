import axios from 'axios';
import type { ApiService } from '../../core/ports/api';
import type { Route, ComplianceBalance, BankEntry, Pool } from '../../core/domain/entities';

const API_URL = 'http://localhost:3000';

export class AxiosApiService implements ApiService {
    async getRoutes(): Promise<Route[]> {
        const response = await axios.get(`${API_URL}/routes`);
        return response.data;
    }

    async setBaseline(routeId: string): Promise<void> {
        await axios.post(`${API_URL}/routes/${routeId}/baseline`);
    }

    async getComparison(): Promise<{ baseline: Route | null; comparisons: Route[] }> {
        const response = await axios.get(`${API_URL}/routes/comparison`);
        return response.data;
    }

    async getComplianceBalance(shipId: string, year: number): Promise<ComplianceBalance> {
        const response = await axios.get(`${API_URL}/compliance/cb`, {
            params: { shipId, year }
        });
        return response.data;
    }

    async bankSurplus(shipId: string, year: number): Promise<void> {
        await axios.post(`${API_URL}/banking/bank`, { shipId, year });
    }

    async applySurplus(shipId: string, year: number, amount: number): Promise<void> {
        await axios.post(`${API_URL}/banking/apply`, { shipId, year, amount });
    }

    async getBankingRecords(shipId: string, year: number): Promise<BankEntry[]> {
        const response = await axios.get(`${API_URL}/banking/records`, {
            params: { shipId, year }
        });
        return response.data;
    }

    async createPool(year: number, shipIds: string[]): Promise<Pool> {
        const response = await axios.post(`${API_URL}/pools`, { year, shipIds });
        return response.data;
    }
}

export const api = new AxiosApiService();
