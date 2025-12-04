import { Request, Response } from 'express';
import { BankingService } from '../../../core/application/banking.service';

export class BankingController {
    constructor(private bankingService: BankingService) { }

    async bank(req: Request, res: Response) {
        try {
            const { shipId, year } = req.body;
            await this.bankingService.bankSurplus(shipId, year);
            res.status(200).send();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async apply(req: Request, res: Response) {
        try {
            const { shipId, year, amount } = req.body;
            await this.bankingService.applySurplus(shipId, year, amount);
            res.status(200).send();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getRecords(req: Request, res: Response) {
        try {
            const { shipId, year } = req.query;
            const records = await this.bankingService.getBankingRecords(String(shipId), Number(year));
            res.json(records);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
