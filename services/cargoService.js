const db = require('../dbconfig');

const registrar_cargo = (cargo) =>{
    return new Promise((resolve,reject)=>{
      db.query(`CALL registrar_cargo("${cargo}")`,(err,results)=>{
        if(err){ return reject(err) };
        return resolve(true);
      })
    })
}

const obtenercargos = () =>{
    return new Promise((resolve,reject)=>{
      db.query(`CALL obtenercargos()`,(err,results)=>{
        if(err){ return reject(err) };
        return resolve(results[0]);
      })
    })
}

const obtenerUsuariosPorCargo = (cargoid) =>{
    return new Promise((resolve,reject)=>{
      db.query(`CALL obtenerUsuariosPorCargo(${cargoid})`,(err,results)=>{
        if(err){ return reject(err) };
        return resolve(results[0]);
      })
    })
}

const obtener_cargo = (cargoid) =>{
    return new Promise((resolve,reject)=>{
      db.query(`CALL obtener_cargo(${cargoid})`,(err,results)=>{
        if(err){ return reject(err) };
        return resolve(results[0][0]);
      })
    })
}

module.exports = {
    registrar_cargo,
    obtenercargos,
    obtenerUsuariosPorCargo,
    obtener_cargo
  };