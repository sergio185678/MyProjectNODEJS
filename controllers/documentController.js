const documentService = require('../services/documentService');

exports.guardar_archivos = async (req, res) => {
    try{
        if (req.file.size === 0) {
            res.status(400).json({ error: "Error al enviar archivo" });
        }
        await documentService.registrarDocumento(req.file,req.query.tipo,req.query.usuarioid);
        res.status(200).json({ mensaje: "Se guardo correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al guardar archivo" });
    }
};

exports.obtener_archivos = async (req, res) => {
    try{
        const archivos = await documentService.obtenerListaDocumentosUsuario(req.params.user_id)
        
        res.status(200).json({ mensaje: "lista de archivos" , archivos});
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener" });
    }
};

exports.obtener_ruta = async (req, res) => {
    try{
        const ruta = await documentService.obtenerDocumento(req.params.id)
        if(ruta==false){ res.status(400).json({ error: "Documento no econtrado" }); }
        else{
            res.status(200).json({ mensaje: "Ruta del archivo" , ruta});
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener" });
    }
};

exports.eliminar_Archivo = async (req, res) => {
    try{
        await documentService.eliminar_documento(req.params.id);
        res.status(200).json({ mensaje: "Se elimino correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};