const express = require('express');
const Router = express.Router();
const obtenerDepartamentos  = require('../helpers/obtenerDepartamentos');
const Peru = require('../models/PeruModel');


Router.get("/", async (req, res) => {
  return res.status(200).json({
    "nacional": `${req.protocol}://${req.headers.host}/api/pais`,
    "departamentos": `${req.protocol}://${req.headers.host}/api/departamentos`,
    "provincias": `${req.protocol}://${req.headers.host}/api/provincias`
  })
})

Router.get('/pais', async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 1;
  const anio = req.query.anio;
  const mes = req.query.mes;
  const dia = req.query.dia;

  try{
    if(isNaN(limit) || limit < 1 || limit > 100){
      const error = new Error('Ingrese un límite válido');
      error.status = 400;
      throw error
    }
    let peru
    if(limit === 1){
      if(!anio && !mes && !dia){
        peru = await Peru.findOne({}).sort({fecha: -1}).select({"_id": 0, "createdAt": 0, "updatedAt": 0, "__v": 0});
      }else{
        if(!anio || !mes || !dia){
           const error = new Error('Por favor ingrese una fecha completa');
           error.status = 400;
           return next(error);
        }else{
          const diaFormat = Number(dia) < 10 ? `0${Number(dia)}` : dia;
          const mesFormat = Number(mes) < 10 ? `0${Number(mes)}`: mes;
          peru = await Peru.findOne({fecha: new Date(`${anio}-${mesFormat}-${diaFormat}`)}).select({"_id": 0, "createdAt": 0, "updatedAt": 0, "__v": 0});
        }
      }
    }else{
      peru = await Peru.find({}).limit(limit).sort({fecha: -1}).select({"_id": 0, "createdAt": 0, "updatedAt": 0, "__v": 0});
    }

    if(!peru){
      return next();
    }
    return res.status(200).json(peru);    

  }catch(err){
    return next(err);
  }
  
})

Router.get("/departamentos", async (req, res) => {
  try{
    const [amazonas, ancash, apurimac, arequipa, ayacucho, cajamarca, callao, cusco, huancavelica, huanuco, ica, junin, libertad, lambayeque, lima, loreto, madrededios, moquegua, pasco, piura, puno, sanmartin, tacna, tumbes, ucayali] = await obtenerDepartamentos(["-provincias", "-url", "-__v", "-_id"]);

    const departamentos = [amazonas, ancash, apurimac, arequipa, ayacucho, cajamarca, callao, cusco, huancavelica, huanuco, ica, junin, libertad, lambayeque, lima, loreto, madrededios, moquegua, pasco, piura, puno, sanmartin, tacna, tumbes, ucayali]
    return res.status(200).json(departamentos);
  }catch(err){
    return next(err);

  }
})

Router.get("/provincias", async (req, res) => {
  try{
    const [amazonas, ancash, apurimac, arequipa, ayacucho, cajamarca, callao, cusco, huancavelica, huanuco, ica, junin, libertad, lambayeque, lima, loreto, madrededios, moquegua, pasco, piura, puno, sanmartin, tacna, tumbes, ucayali] = await obtenerDepartamentos(["-url", "-__v", "-_id"]);

    const provincias = [...amazonas.provincias, ...ancash.provincias, ...apurimac.provincias, ...arequipa.provincias, ...ayacucho.provincias, ...cajamarca.provincias, ...callao.provincias, ...cusco.provincias, ...huancavelica.provincias, ...huanuco.provincias, ...ica.provincias, ...junin.provincias, ...libertad.provincias, ...lambayeque.provincias, ...lima.provincias, ...loreto.provincias, ...madrededios.provincias, ...moquegua.provincias, ...pasco.provincias, ...piura.provincias, ...puno.provincias, ...sanmartin.provincias, ...tacna.provincias, ...tumbes.provincias, ...ucayali.provincias];

    return res.status(200).json(provincias);
  }catch(err){
    return next(err);
  }
})



module.exports = Router;