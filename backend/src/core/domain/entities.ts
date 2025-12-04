
export interface Route {
    id: string;
    routeId: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number; // gCO2e/MJ
    fuelConsumption: number; // tonnes
    distance: number; // km
    totalEmissions: number; // tonnes
    isBaseline: boolean;
}

export interface ComplianceBalance {
    shipId: string;
    year: number;
    cb: number; // gCO2e
}

export interface BankEntry {
    id: string;
    shipId: string;
    year: number;
    amount: number; // gCO2e
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
