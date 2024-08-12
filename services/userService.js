const db = require('../dbconfig');
const crypto = require('crypto');
const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');

dotenv.config();

function hashPassword(password) {
  const sha256 = crypto.createHash('sha256');
  sha256.update(password);
  return sha256.digest('hex');
}

const obtenerusuario_correo = (correo) =>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL usuario_existente("${correo}")`,(err,results)=>{
      if(err){ return reject(err) };
      return resolve(results[0]);
    })
  })
}

const registrar_usuario = (nombre,correo,contraseña,cargoid)=>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL registrar_usuario("${nombre}","${correo}","${hashPassword(contraseña)}",${cargoid})`,(err,results)=>{
      if(err){ return reject(err) };
      resolve(true);
    })
  })
}

const logear = async (correo,contraseña) =>{
  const usuario_almacenado = await obtenerusuario_correo(correo);
  console.log(usuario_almacenado)
  if(usuario_almacenado[0].contraseña==hashPassword(contraseña)){
    const token=jwt.sign({userId:usuario_almacenado[0].user_id , cargo:usuario_almacenado[0].cargo, nombreCompleto:usuario_almacenado[0].nombre_completo, correo:usuario_almacenado[0].correo},process.env.SECRETKEY,{expiresIn:'7d'})
    return token;
  }
  return false;
}
////////////////////
const editar_usuario = async (id,nombre,cargoid) =>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL editar_usuario(${id},"${nombre}",${cargoid})`,(err,results)=>{
      if(err){ return reject(err) };
      resolve(true);
    })
  })
}

const obtener_usuario = async (id) =>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL obtener_usuario(${id})`,(err,results)=>{
      if(err){ return reject(err) };
      return resolve(results[0]);
    })
  })
}

const eliminar_usuario = async (id) =>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL eliminar_usuario(${id})`,(err,results)=>{
      if(err){ return reject(err) };
      resolve(true);
    })
  })
}

const obtener_usuarios = async () =>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL obtener_usuarios()`,(err,results)=>{
      if(err){ return reject(err) };
      return resolve(results[0]);
    })
  })
}

const obtenerUsuariosPaginados = async (page,size,searchTerm) =>{
  return new Promise((resolve,reject)=>{
    db.query(`CALL obtener_usuarios_filtrado("${searchTerm}")`,(err,results)=>{
      if(err){ return reject(err) };
      const listausuarios = results[0];
      const totalElementos = listausuarios.length;
      const totalPages = Math.ceil(totalElementos / size);

      // Calcular los índices para la paginación
      const startIndex = (page - 1) * size;
      const endIndex = Math.min(startIndex + size, totalElementos);

      // Obtener la data paginada
      const content = listausuarios.slice(startIndex, endIndex);
      const numberOfElements = content.length;
      const last = page == totalPages;

      // Resultado final
      resolve({
        content,
        totalElementos,
        totalPages,
        numberOfElements,
        last
      });
    })
  })
}

module.exports = {
  obtenerusuario_correo,
  registrar_usuario,
  logear,
  editar_usuario,
  obtener_usuario,
  eliminar_usuario,
  obtener_usuarios,
  obtenerUsuariosPaginados
};