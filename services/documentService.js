const db = require('../dbconfig');
const fs = require('fs');
const path = require('path');

const registrarDocumento = (file,tipo,usuarioid) =>{
    return new Promise((resolve,reject)=>{
        db.query(`CALL registrar_documento("${tipo}","${file.filename}",${usuarioid})`,(err,results)=>{
            if(err){ return reject(err) };
            return resolve(true);
          })
    })
}

const obtenerListaDocumentosUsuario = (userid) =>{
    return new Promise((resolve,reject)=>{
        db.query(`CALL obtener_documentos_usuario(${userid})`,(err,results)=>{
            if(err){ return reject(err) };
            return resolve(results[0]);
          })
    })
}

const obtenerDocumento = (documetoid) =>{
    return new Promise((resolve,reject)=>{
        db.query(`CALL obtener_documento(${documetoid})`,(err,results)=>{
            if(results[0][0]==null){ return resolve(false)};
            if(err){ return reject(err) };
            return resolve("http://localhost:3562/uploads/"+results[0][0].ruta);
          })
    })
}

const eliminar_documento = (id) =>{
    const directorioActual = __dirname;
    const directorioAnterior = path.resolve(directorioActual, '..');
    return new Promise((resolve,reject)=>{
        let rutaArchivo="";
        db.query(`CALL obtener_documento(${id})`,(err,results)=>{
            if(results[0][0]==null){ return reject("no se encontro")};
            if(err){ return reject(err) };
            rutaArchivo=results[0][0].ruta;

            const rutaCompletaArchivo = path.join(directorioAnterior+"/uploads", rutaArchivo);
            fs.unlink(rutaCompletaArchivo, (err) => {
              if (err) { return reject(err) }
              db.query(`CALL eliminar_documento(${id})`,(err,results)=>{
                if(err){ return reject(err) };
                return resolve(true);
              })
            });
        })
    })
}

module.exports = {
    eliminar_documento,
    obtenerDocumento,
    obtenerListaDocumentosUsuario,
    registrarDocumento
  };