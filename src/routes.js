import { Router } from 'express';

import MonthlyGoalController from './app/controllers/MonthlyGoalController';
import MonthlySaleController from './app/controllers/MonthlySaleController';
import VendorController from './app/controllers/VendorController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/v1/session', SessionController.create);

routes.get('/v1/vendor/:id', VendorController.show);
routes.get('/v1/vendors', VendorController.index);
routes.post('/v1/vendors', VendorController.store);
routes.put('/v1/vendors', VendorController.update);
routes.delete('/v1/vendor/', VendorController.destroy);

routes.get('/v1/goal/:id', MonthlyGoalController.show);
routes.get('/v1/goals', MonthlyGoalController.index);
routes.post('/v1/goals', MonthlyGoalController.store);
routes.put('/v1/goals', MonthlyGoalController.update);
routes.delete('/v1/goal/', MonthlyGoalController.destroy);

routes.get('/v1/sale/:id', MonthlySaleController.show);
routes.get('/v1/sales', MonthlySaleController.index);
routes.post('/v1/sales', MonthlySaleController.store);
routes.put('/v1/sales', MonthlySaleController.update);
routes.delete('/v1/sale/', MonthlySaleController.destroy);

export default routes;