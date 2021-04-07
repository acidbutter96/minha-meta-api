import { Router } from 'express';

import MonthlyGoalController from './app/controllers/MonthlyGoalController';
import MonthlySaleController from './app/controllers/MonthlySaleController';
import VendorController from './app/controllers/VendorController';
import SessionController from './app/controllers/SessionController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/v1/session', SessionController.create);

routes.get('/v1/vendor/:id', AuthMiddleware, VendorController.show);
routes.get('/v1/vendors', AuthMiddleware, VendorController.index);
routes.post('/v1/vendors', VendorController.store);
routes.put('/v1/vendors', AuthMiddleware, VendorController.update);
//routes.delete('/v1/vendor/', AuthMiddleware, VendorController.destroy);

routes.get('/v1/goal/:id', AuthMiddleware, MonthlyGoalController.show);
routes.get('/v1/goals', AuthMiddleware, MonthlyGoalController.index);
routes.post('/v1/goals', AuthMiddleware, MonthlyGoalController.store);
routes.put('/v1/goals', AuthMiddleware, MonthlyGoalController.update);
routes.delete('/v1/goal/', AuthMiddleware, MonthlyGoalController.destroy);

routes.get('/v1/sale/:id', AuthMiddleware, MonthlySaleController.show);
routes.get('/v1/sales', AuthMiddleware, MonthlySaleController.index);
routes.post('/v1/sales', AuthMiddleware, MonthlySaleController.store);
routes.put('/v1/sales', AuthMiddleware, MonthlySaleController.update);
routes.delete('/v1/sale/', AuthMiddleware, MonthlySaleController.destroy);

export default routes;