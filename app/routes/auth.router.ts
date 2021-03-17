import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import cors from 'cors';
// var cors = require('cors')



const controller = new AuthController();
const authController = new AuthController();
const AuthRouter = Router()
// AuthRouter.use(authController.verifyJWT(req,res,next))
AuthRouter.get('/', async(req,res)=>{
    res.json('auth raiz workiong')
})
AuthRouter.post('/login', async(req,res)=>{
    // const x = await 
    try{
        controller.login(req,res)
    }catch(e){
        res.json(e)
    }
})

export default AuthRouter