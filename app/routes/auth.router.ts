import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authController = new AuthController();
const AuthRouter = Router()

AuthRouter.post('/login', async(req,res)=>{
    try{
        authController.login(req,res)
    }catch(e){
        res.json(e)
    }
})

export default AuthRouter