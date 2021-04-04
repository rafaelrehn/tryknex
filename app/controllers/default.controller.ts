import { knex } from "../../conn"

export enum TableNames{
    users = 'users',
    veiculos = 'veiculos',
    utilitarios = 'utilitarios'
}

export interface DefaultConstructor{
    tableName: TableNames
}

export interface DefaultResponse{
    success: boolean;
    data?: any;
    message?: any;
    code?: number;
}


export interface DefaultGetAllResponse extends DefaultResponse{
    data: {
        rows: number;
        itemsPerPage: number;
        firstPage: number;
        lastPage: number;
        currentPage: number;
        data: any;
    }
}

export interface GetAllParams{
    currentPage?: number;
    itemsPerPage?: number;
    where?: any;
}


export class DefaultController{
    enviroment: DefaultConstructor;
    
    constructor(
        defaultConstructor: DefaultConstructor
    ){
        this.enviroment = defaultConstructor
    }

    async create(_data: any): Promise<DefaultResponse>{        
        try{   
            if(!_data){
                return {
                    success: false,
                    message: 'Expected data object'
                }
            }          
            const model: any[] = await knex.table(this.enviroment.tableName).insert(_data)
            return {
                success: true,
                data: model
            }
        }catch(e){
            console.error(e)
            throw e
        }
    }

    async read(ID: string|number): Promise<DefaultResponse>{
        try{
            if(!ID){
                return {
                    success: false,
                    message: 'Expected ID param'
                }
            }
            const where = {
                id: ID
            }            
            const model: any[] = await knex.table(this.enviroment.tableName).where(where)
            return {
                success: true,
                data: model
            }
        }catch(e){
            console.error(e)
            throw e
        }
    }

    async update(_data:any ,_where: any): Promise<DefaultResponse>{
        try{
            if(!_data||!_where){
                return {
                    success: false,
                    message: 'Expecting data and where object content'
                }
            } 
            const model: number = await knex.table(this.enviroment.tableName).where(_where).update(_data)
            if(model == 0){
                return {
                    success: false,
                    message: 'Clauses where has no match object'
                }
            }else{
                return {
                    success: true,
                    data: model
                }
            }
        }catch(e){
            console.error(e)
            throw e
        }
    }

    async delete(): Promise<DefaultResponse>{
        try{
            const model: any[] = [] // = await knex.table(this.enviroment.tableName).insert(_data)
            return {
                success: true,
                data: model
            }
        }catch(e){
            console.error(e)
            throw e
        }
    }

    async getAll(request: GetAllParams): Promise<DefaultGetAllResponse>{
        try{             
            const where = request.where || {}
            const itemsPerPage = request.itemsPerPage || 10
            let PAGE = request.currentPage || 0;
            const offset = (PAGE) * itemsPerPage;
            const limit  = request.itemsPerPage||10
            const paginate:any = await knex.table(this.enviroment.tableName).count('* as rows').where(where).first()
            const data: any[] = await knex.table(this.enviroment.tableName).where(where).offset(offset).limit(limit)

            const _lastPage = Math.ceil(paginate.rows / itemsPerPage) - 1
            return {
                success: true,
                data: {
                    rows: paginate.rows,
                    currentPage: PAGE,
                    firstPage: 1,
                    lastPage: _lastPage,
                    itemsPerPage: itemsPerPage,
                    data: data,
                }
            }
        }catch(e){
            console.error(e)
            throw e
        }
    }
}

export default DefaultController