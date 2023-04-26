const express = require('express');
const Router = express.Router();
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


Router.get("/departamentos/random", async (req, res, next) => {
  try{
    const numero_aleatorio = Math.floor(Math.random() * 25) + 1;
    switch(numero_aleatorio){
      case 1:
        departamento = await Amazonas.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 2:
        departamento = await Ancash.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 3:
        departamento = await Apurimac.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 4:
        departamento = await Arequipa.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 5:
        departamento = await Ayacucho.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 6:
        departamento = await Cajamarca.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 7:
        departamento = await Callao.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 8:
        departamento = await Cusco.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 9:
        departamento = await Huancavelica.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 10:
        departamento = await Huanuco.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 11:
        departamento = await Ica.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 12:
        departamento = await Junin.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 13:
        departamento = await LaLibertad.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 14:
        departamento = await Lambayeque.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 15:
        departamento = await Lima.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 16:
        departamento = await Loreto.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 17:
        departamento = await MadreDeDios.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 18:
        departamento = await Moquegua.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 19:
        departamento = await Pasco.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 20:
        departamento = await Piura.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 21:
        departamento = await Puno.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 22:
        departamento = await SanMartin.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 23:
        departamento = await Tacna.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 24:
        departamento = await Tumbes.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      case 25:
        departamento = await Ucayali.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        break;
      default:
        const error = new Error('Departamento aleatorio no encontrado');
        error.status = 404;
        throw error
        break;
    }
    return res.status(200).json(departamento);
  }catch(err){
    return next(err)
  }
})

Router.get("/departamentos/:departamento", async (req, res, next) => {  
  const limit = req.query.limit ? parseInt(req.query.limit.trim()) : 1;
  const depart = req.params.departamento.toLowerCase().trim()
 
  try{
    if(isNaN(limit) || limit < 1 || limit > 100){
      const error = new Error('Ingrese un límite valido');
      error.status = 400;
      throw error
    }

    let departamento;
    switch(depart){
      case "amazonas":
        if(limit > 1){
          departamento = await Amazonas.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Amazonas.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "ancash":
        if(limit > 1){
          departamento = await Ancash.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Ancash.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "apurimac":
        if(limit > 1){
          departamento = await Apurimac.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Apurimac.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "arequipa":
        if(limit > 1){
          departamento = await Arequipa.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Arequipa.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "ayacucho":
        if(limit > 1){
          departamento = await Ayacucho.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Ayacucho.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "cajamarca":
        if(limit > 1){
          departamento = await Cajamarca.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Cajamarca.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "callao":
        if(limit > 1){
          departamento = await Callao.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Callao.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "cusco":
        if(limit > 1){
          departamento = await Cusco.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Cusco.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "huancavelica":
        if(limit > 1){
          departamento = await Amazonas.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Amazonas.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "huanuco":
        if(limit > 1){
          departamento = await Huanuco.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Huanuco.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "ica":
        if(limit > 1){
          departamento = await Ica.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Ica.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "junin":
        if(limit > 1){
          departamento = await Junin.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Junin.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "la libertad":
        if(limit > 1){
          departamento = await LaLibertad.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await LaLibertad.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "lambayeque":
        if(limit > 1){
          departamento = await Lambayeque.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Lambayeque.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "lima":
        if(limit > 1){
          departamento = await Lima.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Lima.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "loreto":
        if(limit > 1){
          departamento = await Loreto.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Loreto.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "madre de dios":
        if(limit > 1){
          departamento = await MadreDeDios.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await MadreDeDios.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "moquegua":
        if(limit > 1){
          departamento = await Moquegua.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Moquegua.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "pasco":
        if(limit > 1){
          departamento = await Pasco.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Pasco.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "piura":
        if(limit > 1){
          departamento = await Piura.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Piura.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "puno":
        if(limit > 1){
          departamento = await Puno.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Puno.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "san martin":
        if(limit > 1){
          departamento = await SanMartin.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await SanMartin.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "tacna":
        if(limit > 1){
          departamento = await Tacna.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Tacna.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "tumbes":
        if(limit > 1){
          departamento = await Tumbes.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Tumbes.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      case "ucayali":
        if(limit > 1){
          departamento = await Ucayali.find({}).sort({fecha: -1}).limit(limit).select(["-provincias", "-url", "-__v", "-_id"])
        }else{
          departamento = await Ucayali.findOne({}).sort({fecha: -1}).select(["-provincias", "-url", "-__v", "-_id"])
        }
        break;
      default:
        const error = new Error('Departamento no encontrado');
        error.status = 404;
        throw error
        break;
    }
    return res.status(200).json(departamento);
  }catch(err){
    return next(err)
  }
})

module.exports = Router;
