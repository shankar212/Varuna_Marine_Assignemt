export interface Route {
    id: string;
    routeId: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number;
    fuelConsumption: number;
    distance: number;
    totalEmissions: number;
    isBaseline: boolean;
    percentDiff?: number;
    isCompliant?: boolean;
}

export interface ComplianceBalance {
    shipId: string;
    year: number;
    cb: number;
}

export interface BankEntry {
    id: string;
    shipId: string;
    year: number;
    amount: number;
}

export interface Pool {
    id: string;
    year: number;
    members: PoolMember[];
}

export interface PoolMember {
    shipId: string;
    cbBefore: number;
    cbAfter: number;
}
