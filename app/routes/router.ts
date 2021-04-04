import { Router } from 'express';
import { TableNames } from '../controllers/default.controller';
import AuthRouter from './auth.router';
import DefaultRouter from './default.router';

const Routes = Router();

const UserRouter = new DefaultRouter({tableName: TableNames.users}).router;

Routes.use('/users', UserRouter);
Routes.use('/auth', AuthRouter)

export default Routes;