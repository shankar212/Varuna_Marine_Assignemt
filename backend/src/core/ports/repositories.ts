import { Route, ComplianceBalance, BankEntry, Pool, PoolMember } from '../domain/entities';

export interface RouteRepository {
    findAll(): Promise<Route[]>;
    findById(id: string): Promise<Route | null>;
    save(route: Route): Promise<void>;
    findBaseline(): Promise<Route | null>;
}

export interface ComplianceRepository {
    save(cb: ComplianceBalance): Promise<void>;
    findByShipAndYear(shipId: string, year: number): Promise<ComplianceBalance | null>;
}

export interface BankRepository {
    save(entry: BankEntry): Promise<void>;
    findByShipAndYear(shipId: string, year: number): Promise<BankEntry[]>;
}

export interface PoolRepository {
    save(pool: Pool): Promise<void>;
    findAll(): Promise<Pool[]>;
}
