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

const obtenerDepartamentos = async (campos, limit = 1) => {
  const promiseLoreto = Loreto.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseAmazonas = Amazonas.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseTumbes = Tumbes.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promisePiura = Piura.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseLambayeque = Lambayeque.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseCajamarca = Cajamarca.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseLaLibertad = LaLibertad.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseAncash = Ancash.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseSanMartin = SanMartin.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseHuanuco = Huanuco.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseUcayali = Ucayali.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promisePasco = Pasco.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseLima = Lima.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseJunin = Junin.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseHuancavelica = Huancavelica.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseIca = Ica.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseAyacucho = Ayacucho.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseApurimac = Apurimac.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseCusco = Cusco.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseMadreDeDios = MadreDeDios.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promisePuno = Puno.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseArequipa = Arequipa.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseMoquegua = Moquegua.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseTacna = Tacna.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);
  const promiseCallao = Callao.findOne({}).sort({fecha: -1}).limit(limit).select([...campos]);

  const departamentos = await Promise.all([promiseAmazonas, promiseAncash, promiseApurimac, promiseArequipa, promiseAyacucho, promiseCajamarca, promiseCallao, promiseCusco, promiseHuancavelica, promiseHuanuco, promiseIca, promiseJunin, promiseLaLibertad, promiseLambayeque, promiseLima, promiseLoreto, promiseMadreDeDios, promiseMoquegua, promisePasco, promisePiura, promisePuno, promiseSanMartin, promiseTacna, promiseTumbes, promiseUcayali]);

  return departamentos;
}
module.exports = obtenerDepartamentos;