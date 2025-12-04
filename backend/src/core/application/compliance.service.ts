import { ComplianceRepository, RouteRepository } from '../ports/repositories';
import { ComplianceBalance } from '../domain/entities';

export class ComplianceService {
    constructor(
        private complianceRepo: ComplianceRepository,
        private routeRepo: RouteRepository
    ) { }

    async calculateCB(shipId: string, year: number): Promise<ComplianceBalance> {
        // Logic:
        // Compliance Balance = ( Target − Actual ) × Energy in scope
        // Target (2025) = 89.3368 gCO2e/MJ
        // Energy in scope (MJ) ≈ fuelConsumption × 41 000 MJ/t

        // We need to find the route(s) for this ship and year.
        // The Route entity has 'routeId' but not explicit 'shipId'.
        // The mock data has 'vesselType' and 'routeId'.
        // Let's assume for this assignment that a Route corresponds to a Ship's voyage or the Ship itself for that year.
        // The mock data table has 'routeId' R001..R005.
        // The prompt says "GET /compliance/cb?shipId&year".
        // Maybe 'shipId' maps to 'routeId' or we need to add 'shipId' to Route?
        // The Route entity I defined has 'routeId'.
        // Let's assume shipId passed in is the routeId for simplicity, or add shipId to Route.
        // The mock data doesn't have shipId.
        // Let's assume routeId IS the shipId for the purpose of this mock.

        const route = await this.routeRepo.findById(shipId);
        if (!route) throw new Error('Ship/Route not found');
        if (route.year !== year) throw new Error('Route year mismatch'); // Simplified

        const target = 89.3368;
        const actual = route.ghgIntensity;
        const energyInScope = route.fuelConsumption * 41000;

        const cbValue = (target - actual) * energyInScope;

        const cb: ComplianceBalance = {
            shipId: shipId,
            year: year,
            cb: cbValue
        };

        await this.complianceRepo.save(cb);
        return cb;
    }

    async getComplianceBalance(shipId: string, year: number): Promise<ComplianceBalance | null> {
        return this.complianceRepo.findByShipAndYear(shipId, year);
    }
}
