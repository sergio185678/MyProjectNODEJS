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

const get_user=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ').pop()
        const tokenData=await verifyToken(token)
        if(tokenData.userId){ // Ojo editar en caso que los parametros sean diferentes
            res.json({ userId: tokenData.userId,cargo:tokenData.cargo,nombreCompleto:tokenData.nombreCompleto,correo:tokenData.correo });
            res.end();
        }else{
            res.status(409)
            res.send({error:'Token invalido'})
        }
    }
    catch (e){
        res.status(409)
        res.send({error:'Error al verificar el token'})
    }
}

module.exports = get_user;