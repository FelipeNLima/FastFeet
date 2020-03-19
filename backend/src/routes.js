// ROTAS
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrdersController from './app/controllers/OrdersController';
import FileController from './app/controllers/FileController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CompletedDeliveries from './app/controllers/CompletedDeliveries';
import WithdrawController from './app/controllers/WithdrawController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id', DeliveryManController.show);

// Entrada na Encomenda
routes.put(
  '/deliveryman/:deliveryman_id/withdraw/:delivery_id',
  WithdrawController.update
);

// Entregou a Encomenda
routes.put(
  '/deliveryman/:deliveryman_id/deliveries/:delivery_id',
  upload.single('file'),
  CompletedDeliveries.update
);

// Problema na Encomenda
routes.post(
  '/deliveries/:delivery_id/problems',
  DeliveryProblemController.store
);

// Verificar a autenticação do admin
routes.use(authMiddleware);

// Gestão de destinatários
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);
routes.get('/recipients/:id', RecipientController.show);

// Gestão de entregadores
routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

// Gestão de encomendas
routes.get('/orders', OrdersController.index);
routes.post('/orders', OrdersController.store);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/orders/:id', OrdersController.delete);
routes.get('/orders/:id', OrdersController.show);
// Gestão de Problemas com a Encomenda
routes.get('/problems', DeliveryProblemController.index);
routes.get('/problems/:id', DeliveryProblemController.show);
routes.delete(
  '/problems/:id/cancel-delivery',
  DeliveryProblemController.delete
);

// Imagem de Avatar Entregadores
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
