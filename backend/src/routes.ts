import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UserController'
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/user/create', UsersController.create);
routes.get('/user/:email&:password', UsersController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
//routes.post('/users/create', UsersController.create);



export default routes;

