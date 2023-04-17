//! Apis de las Vistas Inicio, Explorar y Mapa 
const express = require('express');
const Peru = require('../models/PeruModel');
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
  Callao} = require('../models/DepartamentoModel');

const Router = express.Router();

Router.get('/peru', async (req, res) => {
  const peru = await Peru.findOne({}).sort({fecha: -1});
  return res.status(200).json(peru);
})

Router.get('/departamento/loreto', async (req, res) => {
  const loreto = await Loreto.findOne({}).sort({fecha: -1});
  return res.status(200).json(loreto);
})

Router.get('/departamento/amazonas', async (req, res) => {
  const amazonas = await Amazonas.findOne({}).sort({fecha: -1});
  return res.status(200).json(amazonas);
})

Router.get('/departamento/tumbes', async (req, res) => {
  const tumbes = await Tumbes.findOne({}).sort({fecha: -1});
  return res.status(200).json(tumbes);
})

Router.get('/departamento/piura', async (req, res) => {
  const piura = await Piura.findOne({}).sort({fecha: -1});
  return res.status(200).json(piura);
})

Router.get('/departamento/lambayeque', async (req, res) => {
  const lambayeque = await Lambayeque.findOne({}).sort({fecha: -1});
  return res.status(200).json(lambayeque);
})

Router.get('/departamento/cajamarca', async (req, res) => {
  const cajamarca = await Cajamarca.findOne({}).sort({fecha: -1});
  return res.status(200).json(cajamarca);
})

Router.get('/departamento/la-libertad', async (req, res) => {
  const lalibertad = await LaLibertad.findOne({}).sort({fecha: -1});
  return res.status(200).json(lalibertad);
})

Router.get('/departamento/ancash', async (req, res) => {
  const ancash = await Ancash.findOne({}).sort({fecha: -1});
  return res.status(200).json(ancash);
})

Router.get('/departamento/san-martin', async (req, res) => {
  const sanmartin = await SanMartin.findOne({}).sort({fecha: -1});
  return res.status(200).json(sanmartin);
})

Router.get('/departamento/huanuco', async (req, res) => {
  const huanuco = await Huanuco.findOne({}).sort({fecha: -1});
  return res.status(200).json(huanuco);
})

Router.get('/departamento/ucayali', async (req, res) => {
  const ucayali = await Ucayali.findOne({}).sort({fecha: -1});
  return res.status(200).json(ucayali);
})

Router.get('/departamento/pasco', async (req, res) => {
  const pasco = await Pasco.findOne({}).sort({fecha: -1});
  return res.status(200).json(pasco);
})

Router.get('/departamento/lima', async (req, res) => {
  const lima = await Lima.findOne({}).sort({fecha: -1});
  return res.status(200).json(lima);
})

Router.get('/departamento/junin', async (req, res) => {
  const junin = await Junin.findOne({}).sort({fecha: -1});
  return res.status(200).json(junin);
})

Router.get('/departamento/huancavelica', async (req, res) => {
  const huancavelica = await Huancavelica.findOne({}).sort({fecha: -1});
  return res.status(200).json(huancavelica);
})

Router.get('/departamento/ica', async (req, res) => {
  const ica = await Ica.findOne({}).sort({fecha: -1});
  return res.status(200).json(ica);
})

Router.get('/departamento/ayacucho', async (req, res) => {
  const ayacucho = await Ayacucho.findOne({}).sort({fecha: -1});
  return res.status(200).json(ayacucho);
})

Router.get('/departamento/apurimac', async (req, res) => {
  const apurimac = await Apurimac.findOne({}).sort({fecha: -1});
  return res.status(200).json(apurimac);
})

Router.get('/departamento/cusco', async (req, res) => {
  const cusco = await Cusco.findOne({}).sort({fecha: -1});
  return res.status(200).json(cusco);
})

Router.get('/departamento/madre-de-dios', async (req, res) => {
  const madrededios = await MadreDeDios.findOne({}).sort({fecha: -1});
  return res.status(200).json(madrededios);
})

Router.get('/departamento/puno', async (req, res) => {
  const puno = await Puno.findOne({}).sort({fecha: -1});
  return res.status(200).json(puno);
})

Router.get('/departamento/arequipa', async (req, res) => {
  const arequipa = await Arequipa.findOne({}).sort({fecha: -1});
  return res.status(200).json(arequipa);
})

Router.get('/departamento/moquegua', async (req, res) => {
  const moquegua = await Moquegua.findOne({}).sort({fecha: -1});
  return res.status(200).json(moquegua);
})

Router.get('/departamento/tacna', async (req, res) => {
  const tacna = await Tacna.findOne({}).sort({fecha: -1});
  return res.status(200).json(tacna);
})

Router.get('/departamento/callao', async (req, res) => {
  const callao = await Callao.findOne({}).sort({fecha: -1});
  return res.status(200).json(callao);
})

module.exports = Router