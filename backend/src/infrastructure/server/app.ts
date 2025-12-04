import express from 'express';
import cors from 'cors';
import { RoutesController } from '../../adapters/inbound/http/routes.controller';
import { ComplianceController } from '../../adapters/inbound/http/compliance.controller';
import { BankingController } from '../../adapters/inbound/http/banking.controller';
import { PoolController } from '../../adapters/inbound/http/pool.controller';

import { RouteService } from '../../core/application/route.service';
import { ComplianceService } from '../../core/application/compliance.service';
import { BankingService } from '../../core/application/banking.service';
import { PoolService } from '../../core/application/pool.service';

import { PostgresRouteRepository, PostgresComplianceRepository, PostgresBankRepository, PostgresPoolRepository } from '../../adapters/outbound/postgres/repositories';

const app = express();
app.use(cors());
app.use(express.json());

// Dependencies
const routeRepo = new PostgresRouteRepository();
const complianceRepo = new PostgresComplianceRepository();
const bankRepo = new PostgresBankRepository();
const poolRepo = new PostgresPoolRepository();

const routeService = new RouteService(routeRepo);
const complianceService = new ComplianceService(complianceRepo, routeRepo);
const bankingService = new BankingService(bankRepo, complianceRepo);
const poolService = new PoolService(poolRepo, complianceRepo);

const routesController = new RoutesController(routeService);
const complianceController = new ComplianceController(complianceService);
const bankingController = new BankingController(bankingService);
const poolController = new PoolController(poolService);

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'FuelEU Maritime Backend is running' });
});
app.get('/routes', (req, res) => routesController.getAll(req, res));
app.post('/routes/:id/baseline', (req, res) => routesController.setBaseline(req, res));
app.get('/routes/comparison', (req, res) => routesController.getComparison(req, res));

app.get('/compliance/cb', (req, res) => complianceController.getCB(req, res));
app.get('/compliance/adjusted-cb', (req, res) => complianceController.getAdjustedCB(req, res));

app.post('/banking/bank', (req, res) => bankingController.bank(req, res));
app.post('/banking/apply', (req, res) => bankingController.apply(req, res));
app.get('/banking/records', (req, res) => bankingController.getRecords(req, res));

app.post('/pools', (req, res) => poolController.createPool(req, res));

export default app;
