const userService = require('../services/userService');

exports.register = async (req, res) => {
    try{
        const exist_user = await userService.obtenerusuario_correo(req.body.correo);

        if(exist_user.length > 0){
            res.status(409).json({ error: "El usuario ya existe" })
        }
        else{
            await userService.registrar_usuario(req.body.nombreCompleto,req.body.correo,req.body.contraseña,req.body.cargoid)
        
            res.status(200).json({ mensaje: "Se registro correctamente" });
        }
        
    }
    catch (error) {
        res.status(500).json({ error: "Error al registrar" });
    }
};

exports.login = async (req, res) => {
    try{
        const token=await userService.logear(req.body.correo,req.body.contraseña);
        
        if(token!=false){
            res.status(200).json({ mensaje:"Se logueo correctamente", token});
        }
        else{
            res.status(401).json({ error: "Correo o contraseña incorrecta" });
        }
        
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validar_token = async (req, res) => {
    res.status(200).json(true);
};
