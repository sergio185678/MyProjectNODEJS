var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async (token) =>{
    try{
        return jwt.verify(token,process.env.SECRETKEY)
    }
    catch (e){
        res.status(409)
        res.send({error:'Error al verificar el token'})
    }
}

const checkAuth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ').pop()
        const tokenData=await verifyToken(token)
        if(tokenData.userId){ //ojo editar con el nombre de la columna "id"
            next();
        }else{
            res.status(409)
            res.send({error:'No tienes permisos'})
        }
    }
    catch (e){
        res.status(409)
        res.send({error:'Error al verificar el token'})
    }
}

module.exports = checkAuth;