const userService = require('../services/userService');

exports.editar_usuario = async (req, res) => {
  try {
    const usuario=await userService.obtener_usuario(req.params.id);
    if(usuario[0]==null){
      res.status(400).json({ mensaje: "Usuario no encontrado" });
    }
    else{
      await userService.editar_usuario(req.params.id,req.body.nombreCompleto,req.body.idCargo)
        
      res.status(200).json({ mensaje: "Se edito correctamente" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al editar usuario" });
  }
};

exports.eliminar_usuario = async (req, res) => {
  try {
    await userService.eliminar_usuario(req.params.id);
    res.status(200).json({ mensaje: "Se elimino correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

exports.obtenerUsuariosPaginados = async (req, res) => {
  try {
    const page = req.query.page || 1; // Valor por defecto es 0 si no se proporciona
    const size = req.query.size || 10; // Valor por defecto es 10 si no se proporciona
    const searchTerm = req.query.searchTerm || '';

    const response= await userService.obtenerUsuariosPaginados(page,size,searchTerm);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

exports.obtener_usuario = async (req, res) => {
  try {
    const usuario=await userService.obtener_usuario(req.params.id);
    if(usuario[0]==null){
      res.status(400).json({ mensaje: "Usuario no encontrado" });
    }
    else{
      res.status(200).json({ usuario });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

exports.obtener_usuarios = async (req, res) => {
  try {
    const usuarios=await userService.obtener_usuarios();
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};