import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyJWT from '../config/jwt';
import DefaultController, { DefaultConstructor } from '../controllers/default.controller';

export class DefaultRouter{    

    private controller: DefaultController;
    public router = Router();

    constructor(
        defaultConstructor: DefaultConstructor
    ){
        this.controller = new DefaultController(defaultConstructor)        
        this.setRouter()
    }    

    private setRouter(){
        this.router.use(verifyJWT)
        this.router.post('/create', async (request:any, response: any, next: any)=> {  
            try{
                const db = await this.controller.create(request.body)
                return response.json(db);
            }catch(e){
                return response.json(e)
            }
        });
        this.router.put('/update', async (request: any, response: any)=> {
            try{
                const db = await this.controller.update(request.body.data, request.body.where)
                return response.json(db);
            }catch(e){
                return response.json(e)
            }
        });

        this.router.get('/', async (request, response)=> {  
            try{
              const db = await this.controller.getAll(request.body)
              return response.json(db);
            }catch(e){
              return response.json(e)
            }
        });
    }
    
}

export default DefaultRouter;