import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyJWT from '../config/jwt';

const controller = new UserController()
const UserRouter = Router();

UserRouter.use(verifyJWT)

UserRouter.get('/', async (request, response)=> {  
  try{
    const users = await controller.getAll(request.body)
    return response.json(users);
  }catch(e){
    return response.json(e)
  }
});

UserRouter.post('/create', async (request, response, next)=> {  
  try{
    const users = await controller.create(request.body)
    return response.json(users);
  }catch(e){
    return response.json(e)
  }
});

UserRouter.put('/update', async (request, response)=> {
  try{
    const users = await controller.update(request.body.data, request.body.where)
    return response.json(users);
  }catch(e){
    return response.json(e)
  }
});

UserRouter.post('/createRandomUser', async (request, response)=> {
  try{
    const users = await controller.createRandomUser()
    return response.json(users);
  }catch(e){
    return response.json(e)
  }
});


export default UserRouter;