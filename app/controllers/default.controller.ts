import { knex } from "../../conn"

export enum TableNames{
    users = 'users'
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
                    data: 'Expected data object'
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

    async read(): Promise<DefaultResponse>{
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
                    // data: model
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
            const _where = request.where || {}
            const _itemsPerPage = request.itemsPerPage || 10
            let _page = request.currentPage || 0;
            const _offset = (_page) * _itemsPerPage;
            const _limit  = request.itemsPerPage||10
            const paginate:any = await knex.table(this.enviroment.tableName).count('* as rows').where(_where).first()
            const data: any[] = await knex.table(this.enviroment.tableName).where(_where).offset(_offset).limit(_limit)

            const _lastPage = Math.ceil(paginate.rows / _itemsPerPage) - 1
            return {
                success: true,
                data: {
                    rows: paginate.rows,
                    currentPage: _page,
                    firstPage: 1,
                    lastPage: _lastPage,
                    itemsPerPage: _itemsPerPage,
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