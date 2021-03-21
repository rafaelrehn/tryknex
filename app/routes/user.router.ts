import { Router } from "express";
import { TableNames } from "../controllers/default.controller";
import { DefaultRouter } from './default.router'

// const controller = new UserController()
const UserRouter = new DefaultRouter({
    tableName: TableNames.users
}).router;

// UserRouter.get('/my', (req: any, res: any)=>{
//   return res.json('biirl')
// })


export default UserRouter