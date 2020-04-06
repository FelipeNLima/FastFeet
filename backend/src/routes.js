// ROTAS
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrdersController from './app/controllers/OrdersController';
import FileController from './app/controllers/FileController';
import ProblemsController from './app/controllers/ProblemsController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CompletedDeliveries from './app/controllers/CompletedDeliveries';
import WithdrawController from './app/controllers/WithdrawController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id', DeliveryManController.show);

// Imagem de Avatar Entregadores
routes.post('/files', upload.single('file'), FileController.store);

// Encomenda Pendente
routes.get('/deliveryman/:deliveryman_id/withdraw', WithdrawController.index);

// Detalhes da encomenda
routes.get(
  '/deliveryman/:deliveryman_id/withdraw/:order_id',
  WithdrawController.show
);

// Entrada na Encomenda
routes.put(
  '/deliveryman/:deliveryman_id/withdraw/:delivery_id',
  WithdrawController.update
);

// Entregou a Encomenda
routes.get(
  '/deliveryman/:deliveryman_id/deliveries',
  CompletedDeliveries.index
);

routes.put(
  '/deliveryman/:deliveryman_id/deliveries/:delivery_id',
  upload.single('file'),
  CompletedDeliveries.update
);

// Informar Problema na Encomenda
routes.post(
  '/deliveries/:delivery_id/problems',
  ProblemsController.store
);
routes.get('/deliveries/:delivery_id/problems', DeliveryProblemController.index);

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
routes.get('/problems', ProblemsController.index);
routes.get('/problems/:id', ProblemsController.show);
routes.delete(
  '/problems/:id/cancel-delivery',
  ProblemsController.delete
);

export default routes;
