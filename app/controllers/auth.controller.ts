import { knex } from "../../conn";
import { Users } from "../model/users.model";
import { TableNames } from "./default.controller";

require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

export class AuthController {
    
    constructor(
    ){
    }

    login(req: any, res: any) {
        // console.log(req.body)
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        // const sql = `SELECT * FROM usuario WHERE email = '${email}' && senha = '${pwd}'`;
        const user = {
            first_name: first_name,
            last_name: last_name,            
            // password: 'admin'
        }
        knex.select('*').from(TableNames.users).where(user).then(resQuery=>{        
                if(resQuery.length == 0){
                    res.status(401).json({
                        message: 'Login inválido!',
                        success: false,
                        
                    });
                }else{
                    const uuid = resQuery[0].uuid; //esse id viria do banco de dados
                    const empresaUuid = resQuery[0].empresa_uuid;
                    const authDate = new Date();
                    var token = jwt.sign({ uuid, empresaUuid, authDate }, process.env.SECRET, {
                    expiresIn: 99999999999 // expires in 5min
                    });
                    return res.json({ 
                        message: 'Login válido!',
                        success: true,
                        token: token,
                        userInfo: resQuery[0]
                    })
                }
        }).catch(err=>{
            if(err) throw err;
        })
    }

    
    verifyJWT(req: any, res: any, next: any){
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

            // token expira em 24 horas
            const dateIni = new Date(decoded.authDate).getTime() + 24 * 60 * 60 * 1000
            //   const dateFim = new Date().getTime() + 24 * 60 * 60 * 1000 // 24 horas
            const dateFim = new Date().getTime()  // 24 horas
            if(dateIni<dateFim){
                return res.status(500).json({ auth: false, message: 'Token expired.' });
            }
            //   new Date().getTime() + 24 * 60 * 60 * 1000
            // if(decoded.authDate)
            // se tudo estiver ok, salva no request para uso posterior
            req.decodedAuth = decoded
            //   req.empresaUuid = decoded.empresaUuid;
            //   req.usuarioUuid = deco
            next();
        });
    }
}

export default AuthController
