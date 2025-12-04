import { PoolRepository, ComplianceRepository } from '../ports/repositories';
import { Pool, PoolMember } from '../domain/entities';
import { v4 as uuidv4 } from 'uuid';

export class PoolService {
    constructor(
        private poolRepo: PoolRepository,
        private complianceRepo: ComplianceRepository
    ) { }

    async createPool(year: number, shipIds: string[]): Promise<Pool> {
        // 1. Fetch CB for all ships
        const members: PoolMember[] = [];
        let totalCB = 0;

        for (const shipId of shipIds) {
            const cb = await this.complianceRepo.findByShipAndYear(shipId, year);
            if (!cb) throw new Error(`Compliance balance not found for ship ${shipId}`);

            members.push({
                shipId,
                cbBefore: cb.cb,
                cbAfter: cb.cb // Initial state
            });
            totalCB += cb.cb;
        }

        // 2. Validate Sum(adjustedCB) >= 0
        if (totalCB < 0) {
            throw new Error('Pool total compliance balance is negative');
        }

        // 3. Greedy allocation
        // Sort members desc by CB
        members.sort((a, b) => b.cbBefore - a.cbBefore);

        // Transfer surplus to deficits
        // We have a list of surpluses and deficits.
        // Total is positive.
        // We want to bring everyone to >= 0 if possible, or just distribute?
        // "Deficit ship cannot exit worse"
        // "Surplus ship cannot exit negative"

        // Strategy:
        // Take from surplus ships, give to deficit ships until deficits are covered.
        // Since Total >= 0, we can cover all deficits.

        for (const member of members) {
            if (member.cbAfter < 0) {
                // This is a deficit ship
                const needed = -member.cbAfter;

                // Find surplus ships
                for (const donor of members) {
                    if (donor.cbAfter > 0) {
                        const available = donor.cbAfter;
                        const transfer = Math.min(needed, available);

                        donor.cbAfter -= transfer;
                        member.cbAfter += transfer;

                        if (member.cbAfter >= 0) break; // Deficit covered
                    }
                }
            }
        }

        // 4. Create Pool
        const pool: Pool = {
            id: uuidv4(),
            year,
            members
        };

        await this.poolRepo.save(pool);
        return pool;
    }
}
