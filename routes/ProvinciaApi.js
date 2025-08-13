const express = require('express');
const Router = express.Router();
const obtenerDepartamentos = require("../helpers/obtenerDepartamentos");
const {
  Loreto, 
  Amazonas,
  Tumbes,
  Piura,
  Lambayeque,
  Cajamarca,
  LaLibertad,
  Ancash,
  SanMartin,
  Huanuco,
  Ucayali,
  Pasco,
  Lima,
  Junin,
  Huancavelica,
  Ica,
  Ayacucho,
  Apurimac,
  Cusco,
  MadreDeDios,
  Puno,
  Arequipa,
  Moquegua,
  Tacna,
  Callao} = require('../models/DepartamentoModel.js');
const departamentos = require('../helpers/departamentos.js');

Router.get("/provincias/random", async (req, res, next) => {
  try{
    const [amazonas, ancash, apurimac, arequipa, ayacucho, cajamarca, callao, cusco, huancavelica, huanuco, ica, junin, libertad, lambayeque, lima, loreto, madrededios, moquegua, pasco, piura, puno, sanmartin, tacna, tumbes, ucayali] = await obtenerDepartamentos(["provincias"]);

    const provincias = [...loreto.provincias, ...amazonas.provincias, ...tumbes.provincias, ...piura.provincias, ...lambayeque.provincias, ...cajamarca.provincias, ...libertad.provincias, ...ancash.provincias, ...sanmartin.provincias, ...huanuco.provincias, ...ucayali.provincias, ...pasco.provincias, ...lima.provincias, ...junin.provincias, ...huancavelica.provincias, ...ica.provincias, ...ayacucho.provincias, ...apurimac.provincias, ...cusco.provincias, ...madrededios.provincias, ...puno.provincias, ...arequipa.provincias, ...moquegua.provincias, ...tacna.provincias, ...callao.provincias]

    const numero_aleatorio = Math.floor(Math.random() * 196);

    const provincia = provincias[numero_aleatorio];
    return res.status(200).json(provincia);
  }catch(err){
    return next(err);
  }
})

Router.get("/provincias/:provincia", async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit.trim()) : 1;
  const prov = req.params.provincia.toLowerCase().trim();

  try{    
    if(isNaN(limit) || limit < 1 || limit > 100){
      const error = new Error('Ingrese un límite valido');
      error.status = 400;
      throw error
    }

    const departamentoObject = departamentos.find(depar => depar.provincias.includes(prov.toUpperCase()));
    if(!departamentoObject){
      const error = new Error('Provincia no encontrada');
      error.status = 400;
      throw error
    }
    let departamento;
    switch(departamentoObject.departamento.toLowerCase()){
      case "amazonas":
        if(limit > 1){
          departamento = await Amazonas.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Amazonas.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "ancash":
        if(limit > 1){
          departamento = await Ancash.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Ancash.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "apurimac":
        if(limit > 1){
          departamento = await Apurimac.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Apurimac.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "arequipa":
        if(limit > 1){
          departamento = await Arequipa.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Arequipa.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "ayacucho":
        if(limit > 1){
          departamento = await Ayacucho.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Ayacucho.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "cajamarca":
        if(limit > 1){
          departamento = await Cajamarca.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Cajamarca.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "callao":
        if(limit > 1){
          departamento = await Callao.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Callao.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "cusco":
        if(limit > 1){
          departamento = await Cusco.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Cusco.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "huancavelica":
        if(limit > 1){
          departamento = await Amazonas.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Amazonas.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "huanuco":
        if(limit > 1){
          departamento = await Huanuco.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Huanuco.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "ica":
        if(limit > 1){
          departamento = await Ica.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Ica.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "junin":
        if(limit > 1){
          departamento = await Junin.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Junin.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "la libertad":
        if(limit > 1){
          departamento = await LaLibertad.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await LaLibertad.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "lambayeque":
        if(limit > 1){
          departamento = await Lambayeque.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Lambayeque.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "lima":
        if(limit > 1){
          departamento = await Lima.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Lima.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "loreto":
        if(limit > 1){
          departamento = await Loreto.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Loreto.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "madre de dios":
        if(limit > 1){
          departamento = await MadreDeDios.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await MadreDeDios.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "moquegua":
        if(limit > 1){
          departamento = await Moquegua.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Moquegua.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "pasco":
        if(limit > 1){
          departamento = await Pasco.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Pasco.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "piura":
        if(limit > 1){
          departamento = await Piura.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Piura.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "puno":
        if(limit > 1){
          departamento = await Puno.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Puno.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "san martin":
        if(limit > 1){
          departamento = await SanMartin.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await SanMartin.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "tacna":
        if(limit > 1){
          departamento = await Tacna.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Tacna.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "tumbes":
        if(limit > 1){
          departamento = await Tumbes.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Tumbes.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      case "ucayali":
        if(limit > 1){
          departamento = await Ucayali.find({}).sort({fecha: -1}).limit(limit).select(["-url", "-__v", "-_id"])
        }else{
          departamento = await Ucayali.findOne({}).sort({fecha: -1}).select(["-url", "-__v", "-_id"])
        }
        break;
      default:
        const error = new Error('Provincia no encontrada');
        error.status = 404;
        throw error
        break;
    }
    console.log({
      departamento
    })
    let provincias
    //Con el length comprobamos que es un array 
    if(departamento.length){
      provincias = departamento.reduce((accumulator, depart) => {
        return accumulator.concat(depart.provincias);
      }, []);
    }else{
      provincias = departamento.provincias;
    }
    let provinciasFiltered
    if(limit > 1){
      provinciasFiltered = provincias.filter(provincia => provincia.name.toLowerCase() === prov);
    }else{
      provinciasFiltered = provincias.find(provincia => provincia.name.toLowerCase() === prov);
    }
    return res.status(200).json(provinciasFiltered);
  }catch(err){
    return next(err);
  }
})




module.exports = Router;
