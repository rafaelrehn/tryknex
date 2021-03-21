import { Router } from 'express';
import AuthRouter from './auth.router';
import UserRouter from './user.router';
// import UserRouter from './user.router';
// import User2DefaultRouter from './user2.router';
// import User2Router from './user2.router';

const Routes = Router();

Routes.use('/users', UserRouter);
Routes.use('/auth', AuthRouter)
// Routes.use('/users2', User2DefaultRouter)


export default Routes;