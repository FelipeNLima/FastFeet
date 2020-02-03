// ROTAS
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliveryController';
import OrdersController from './app/controllers/OrdersController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Verificar a autenticação do admin
routes.use(authMiddleware);

// Gestão de destinatários
// routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
// routes.put('/recipients/:id', RecipientController.update);
// routes.delete('/recipients/:id', RecipientController.delete);

// Gestão de entregadores
// routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
// routes.put('/delivery/:id', DeliveryController.update);
// routes.delete('/delivery/:id', DeliveryController.delete);

// Gestão de encomendas
// routes.get('/orders', OrdersController.index);
// routes.post('/orders', OrdersController.store);
// routes.put('/orders/:id', OrdersController.update);
// routes.delete('/orders/:id', OrdersController.delete);

// Imagem de Avatar Entregadores
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
