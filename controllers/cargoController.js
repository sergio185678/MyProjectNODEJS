const cargoService = require('../services/cargoService');

exports.registrar_cargo = async (req, res) => {
    try{
        await cargoService.registrar_cargo(req.body.nombre)
        
        res.status(200).json({ mensaje: "Se registro correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al registrar" });
    }
};

exports.obtenercargos = async (req, res) => {
    try{
        const cargos = await cargoService.obtenercargos()
        
        res.status(200).json({ mensaje: "lista de cargos" , cargos});
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener" });
    }
};

exports.obtenerUsuariosPorCargo = async (req, res) => {
    try{
        const usuarios = await cargoService.obtenerUsuariosPorCargo(req.params.cargo_id)
        
        res.status(200).json({ mensaje: "lista de usuarios" , usuarios});
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener" });
    }
};

exports.obtener_cargo = async (req, res) => {
    try{
        const cargo = await cargoService.obtener_cargo(req.params.cargo_id)

        res.status(200).json({ cargo });
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener" });
    }
};