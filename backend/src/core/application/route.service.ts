import { RouteRepository } from '../ports/repositories';
import { Route } from '../domain/entities';

export class RouteService {
    constructor(private routeRepo: RouteRepository) { }

    async getAllRoutes(): Promise<Route[]> {
        return this.routeRepo.findAll();
    }

    async setBaseline(routeId: string): Promise<void> {
        const route = await this.routeRepo.findById(routeId);
        if (!route) throw new Error('Route not found');

        // Unset previous baseline if any (assuming single baseline for simplicity, or just set this one)
        // The requirement says "Set Baseline" button.
        // We might want to ensure only one baseline exists or handle it per vessel type?
        // "Seed the five routes above; set one baseline = true." implies one baseline.

        // First, unset all baselines (inefficient but simple for this scale)
        const allRoutes = await this.routeRepo.findAll();
        for (const r of allRoutes) {
            if (r.isBaseline) {
                r.isBaseline = false;
                await this.routeRepo.save(r);
            }
        }

        route.isBaseline = true;
        await this.routeRepo.save(route);
    }

    async getComparison(): Promise<{ baseline: Route | null, comparisons: any[] }> {
        const baseline = await this.routeRepo.findBaseline();
        const allRoutes = await this.routeRepo.findAll();

        // Target Intensity (2025) = 89.3368 gCO2e/MJ
        // Wait, the prompt says "Use target = 89.3368 gCO2e/MJ (2 % below 91.16)"
        // And "percentDiff = ((comparison / baseline) − 1) × 100"
        // This implies we compare against the *baseline route's* GHG intensity?
        // Or is the baseline just a flag?
        // "Fetch baseline + comparison data from /routes/comparison"
        // "Display: Table with baseline vs comparison routes"
        // "Columns: ghgIntensity, % difference, compliant"

        // If baseline is set, we use its GHG intensity as the reference?
        // Or is the "target" fixed at 89.3368?
        // The prompt says "Use target = 89.3368".
        // But also "percentDiff = ((comparison / baseline) − 1) × 100".
        // This formula suggests comparing two routes.
        // Let's assume we compare each route against the *selected baseline route*.

        if (!baseline) {
            return { baseline: null, comparisons: [] };
        }

        const comparisons = allRoutes.map(route => {
            const percentDiff = ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
            // Compliant if ghgIntensity <= target? Or compliant if better than baseline?
            // "Use target = 89.3368" is listed under Compare Tab.
            // Maybe compliant means <= 89.3368?
            // Let's return both.

            const target = 89.3368;
            const isCompliant = route.ghgIntensity <= target;

            return {
                ...route,
                percentDiff,
                isCompliant
            };
        });

        return { baseline, comparisons };
    }
}
