import { Request, Response } from 'express';
import { PoolService } from '../../../core/application/pool.service';

export class PoolController {
    constructor(private poolService: PoolService) { }

    async createPool(req: Request, res: Response) {
        try {
            const { year, shipIds } = req.body;
            const pool = await this.poolService.createPool(year, shipIds);
            res.json(pool);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
