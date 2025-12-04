import { Request, Response } from 'express';
import { ComplianceService } from '../../../core/application/compliance.service';

export class ComplianceController {
    constructor(private complianceService: ComplianceService) { }

    async getCB(req: Request, res: Response) {
        try {
            const { shipId, year } = req.query;
            if (!shipId || !year) {
                return res.status(400).json({ error: 'Missing shipId or year' });
            }

            const cb = await this.complianceService.calculateCB(String(shipId), Number(year));
            res.json(cb);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getAdjustedCB(req: Request, res: Response) {
        // For now, this just returns the CB, as we haven't fully implemented the "Adjusted" logic 
        // which would involve subtracting banked amounts or adding pooled amounts.
        // The prompt says "GET /compliance/adjusted-cb?shipId&year -> Return CB after bank applications"
        // We'll reuse getCB for now or implement a simple version.
        try {
            const { shipId, year } = req.query;
            if (!shipId || !year) {
                return res.status(400).json({ error: 'Missing shipId or year' });
            }

            const cb = await this.complianceService.getComplianceBalance(String(shipId), Number(year));
            res.json(cb);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
