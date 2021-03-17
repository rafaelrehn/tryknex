require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';

export function verifyJWT(req: any, res: any, next: any){
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

export default verifyJWT

// module.exports = () =>{
//     return verifyJWT
// }

