import { RouteRepository, ComplianceRepository, BankRepository, PoolRepository } from '../../../core/ports/repositories';
import { Route, ComplianceBalance, BankEntry, Pool, PoolMember } from '../../../core/domain/entities';
import { prisma } from '../../../infrastructure/db/prisma';

export class PostgresRouteRepository implements RouteRepository {
    async findAll(): Promise<Route[]> {
        return prisma.route.findMany();
    }

    async findById(id: string): Promise<Route | null> {
        return prisma.route.findUnique({ where: { routeId: id } });
    }

    async save(route: Route): Promise<void> {
        await prisma.route.upsert({
            where: { routeId: route.routeId },
            update: route,
            create: route,
        });
    }

    async findBaseline(): Promise<Route | null> {
        return prisma.route.findFirst({ where: { isBaseline: true } });
    }
}

export class PostgresComplianceRepository implements ComplianceRepository {
    async save(cb: ComplianceBalance): Promise<void> {
        // We need to handle the ID generation or retrieval if it exists
        // For simplicity, we'll delete existing for ship/year and create new, or upsert if we had a unique constraint
        // The schema doesn't have a unique constraint on shipId+year, but logic implies one.
        // Let's check if one exists first.
        const existing = await prisma.complianceBalance.findFirst({
            where: { shipId: cb.shipId, year: cb.year }
        });

        if (existing) {
            await prisma.complianceBalance.update({
                where: { id: existing.id },
                data: { cb: cb.cb }
            });
        } else {
            await prisma.complianceBalance.create({
                data: {
                    shipId: cb.shipId,
                    year: cb.year,
                    cb: cb.cb
                }
            });
        }
    }

    async findByShipAndYear(shipId: string, year: number): Promise<ComplianceBalance | null> {
        return prisma.complianceBalance.findFirst({
            where: { shipId, year }
        });
    }
}

export class PostgresBankRepository implements BankRepository {
    async save(entry: BankEntry): Promise<void> {
        await prisma.bankEntry.create({
            data: {
                shipId: entry.shipId,
                year: entry.year,
                amount: entry.amount
            }
        });
    }

    async findByShipAndYear(shipId: string, year: number): Promise<BankEntry[]> {
        return prisma.bankEntry.findMany({
            where: { shipId, year }
        });
    }
}

export class PostgresPoolRepository implements PoolRepository {
    async save(pool: Pool): Promise<void> {
        await prisma.pool.create({
            data: {
                year: pool.year,
                members: {
                    create: pool.members.map(m => ({
                        shipId: m.shipId,
                        cbBefore: m.cbBefore,
                        cbAfter: m.cbAfter
                    }))
                }
            }
        });
    }

    async findAll(): Promise<Pool[]> {
        const pools = await prisma.pool.findMany({
            include: { members: true }
        });
        return pools.map(p => ({
            id: p.id,
            year: p.year,
            members: p.members.map(m => ({
                shipId: m.shipId,
                cbBefore: m.cbBefore,
                cbAfter: m.cbAfter
            }))
        }));
    }
}
