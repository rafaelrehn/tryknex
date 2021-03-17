import { knex } from '../../conn';
import { Users } from '../model/users.model';
import DefaultController, { TableNames } from './default.controller';

export class UserController extends DefaultController {
    
    constructor(
    ){
        super({
            tableName: TableNames.users
        })
    }

    async createRandomUser(){
        let user: Users ={
            first_name: new Date().toISOString(),
            last_name: new Date().toISOString(),
            password: new Date().toISOString()
        }
        const u = await knex(TableNames.users).insert(user)
        console.log('create user::', u)
        return u
    }
}

export default UserController