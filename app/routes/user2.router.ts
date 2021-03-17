import { Router } from "express";
import { TableNames } from "../controllers/default.controller";
import { DefaultRouter } from './default.router'

// const controller = new UserController()
const User2DefaultRouter = new DefaultRouter({
    tableName: TableNames.users
}).router;

User2DefaultRouter.get('/my', (req: any, res: any)=>{
  return res.json('biirl')
})


export default User2DefaultRouter