import type { Route, ComplianceBalance, BankEntry, Pool } from '../domain/entities';

export interface ApiService {
    getRoutes(): Promise<Route[]>;
    setBaseline(routeId: string): Promise<void>;
    getComparison(): Promise<{ baseline: Route | null, comparisons: Route[] }>;

    getComplianceBalance(shipId: string, year: number): Promise<ComplianceBalance>;

    bankSurplus(shipId: string, year: number): Promise<void>;
    applySurplus(shipId: string, year: number, amount: number): Promise<void>;
    getBankingRecords(shipId: string, year: number): Promise<BankEntry[]>;

    createPool(year: number, shipIds: string[]): Promise<Pool>;
}
